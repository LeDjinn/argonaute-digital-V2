import {readdir,stat} from 'node:fs/promises';
import path from 'node:path';

export async function blogFilenames(directory) {
  const entries = await readdir(directory,{withFileTypes:true});
  const filenames = await Promise.all(entries.filter(entry=>entry.isDirectory() && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.name)).map(async entry=>{
    try {
      const file = await stat(path.join(directory,entry.name,'page.mdx'));
      return file.isFile() ? `${entry.name}/page.mdx` : null;
    } catch(error) {
      if(error.code==='ENOENT') return null;
      throw error;
    }
  }));
  const articles = [];
  for (const filename of filenames) {
    if (filename !== null) articles.push(filename);
  }
  return articles.sort();
}
