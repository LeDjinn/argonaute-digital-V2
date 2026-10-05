import {readBlogContent,validateCollection,contentSummary} from './blog-content.mjs';
try {
  const records=readBlogContent();
  const errors=validateCollection(records);
  if (errors.length) {console.error(errors.join('\n')); process.exitCode=1;}
  else console.log(`Blog validation passed: ${records.filter(record=>!record.blog.draft).length} published, ${records.filter(record=>record.blog.draft).length} drafts.`,contentSummary(records));
} catch(error) {console.error(error.message);process.exitCode=1;}
