import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';
import {validateBlog, wordCount, blogTags} from '../lib/blog-core.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const directory = path.join(root,'app/[locale]/(marketing)/blog');
function literal(node) {
  if (!node) throw new Error('blog must be an exported literal object');
  if (ts.isStringLiteral(node) || ts.isNumericLiteral(node)) return ts.isNumericLiteral(node) ? Number(node.text) : node.text;
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(literal);
  if (ts.isObjectLiteralExpression(node)) return Object.fromEntries(node.properties.map(property => {
    if (!ts.isPropertyAssignment(property)) throw new Error('blog metadata must contain literal properties');
    if (property.name.text === 'image' && ts.isIdentifier(property.initializer)) return ['image', undefined]; // Legacy static image imports are not executed by the gate.
    return [property.name.text, literal(property.initializer)];
  }));
  if (ts.isAsExpression(node) || ts.isSatisfiesExpression(node)) return literal(node.expression);
  throw new Error('blog metadata must use literal values; code is never evaluated');
}
export function parseBlogSource(source, slug) {
  // Only parse the ESM preamble. The Markdown body is not executable metadata.
  const boundary = source.search(/^export default[^\n]*[\n]/m);
  if (boundary < 0) throw new Error(`${slug}: a single-line BlogLayout default wrapper is required`);
  const end = source.indexOf('\n',boundary);
  const preamble = source.slice(0,end);
  const ast = ts.createSourceFile('content.tsx',preamble,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
  let blog;
  for (const statement of ast.statements) {
    if (!ts.isVariableStatement(statement) || !statement.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)) continue;
    for (const declaration of statement.declarationList.declarations) if (declaration.name.getText(ast) === 'blog') blog = literal(declaration.initializer);
  }
  if (!blog) throw new Error(`${slug}: exported literal blog object required`);
  if (blog.slug !== slug) throw new Error(`${slug}: slug must exactly match its directory`);
  return {blog, body:source.slice(end+1), slug};
}
export function readBlogContent() {
  return fs.readdirSync(directory,{withFileTypes:true}).filter(entry => entry.isDirectory() && fs.existsSync(path.join(directory,entry.name,'page.mdx'))).map(entry => parseBlogSource(fs.readFileSync(path.join(directory,entry.name,'page.mdx'),'utf8'),entry.name));
}
export function validateCollection(records) {
  const errors = [];
  const seen = new Set();
  const published = records.filter(record => record.blog.draft === false).map(record => record.blog);
  const caseStudies = JSON.parse(fs.readFileSync(path.join(root,'app/messages/en.json'),'utf8')).caseStudies;
  const paths = ['en','fr'].flatMap(locale => ['', '/contact','/case-studies','/blog','/our-workflow',...caseStudies.map(post => `/case-studies/${post.slug}`),...blogTags(published).map(tag => `/blog/tag/${tag}`)].map(route => `/${locale}${route}`));
  for (const record of records) {
    if (seen.has(record.blog.slug)) errors.push(`duplicate slug: ${record.blog.slug}`);
    seen.add(record.blog.slug);
    errors.push(...validateBlog(record.blog,record.body,{slugs:published.map(post=>post.slug),paths}).map(error=>`${record.slug}: ${error}`));
    if (!record.blog.draft) {
      for (const source of record.blog.sources ?? []) if (!record.body.includes(source)) errors.push(`${record.slug}: source must be linked in article: ${source}`);
      if (!/\]\(\/(en|fr)\//.test(record.body)) errors.push(`${record.slug}: at least one internal link is required`);
    }
  }
  return errors;
}
export function contentSummary(records) {return records.map(record=>({slug:record.slug,draft:record.blog.draft,words:wordCount(record.body)}));}
