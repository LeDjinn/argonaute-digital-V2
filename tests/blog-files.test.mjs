import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,rm} from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {blogFilenames} from '../lib/blog-files.mjs';
test('blog discovery reads only immediate owned article directories without glob parsing',async()=>{
  const root=await mkdtemp(path.join(process.env.TMPDIR || path.join(os.homedir(),'.hermes/cache/scratch'),'blog-discovery-'));
  try {
    for(const name of ['second-post','first-post','tag','invalid{pattern}']) await mkdir(path.join(root,name));
    for(const name of ['second-post','first-post','invalid{pattern}']) await writeFile(path.join(root,name,'page.mdx'),'test fixture');
    await mkdir(path.join(root,'tag','nested')); await writeFile(path.join(root,'tag','nested','page.mdx'),'not an article route');
    assert.deepEqual(await blogFilenames(root),['first-post/page.mdx','second-post/page.mdx']);
  } finally {await rm(root,{recursive:true,force:true});}
});
