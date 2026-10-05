import {execFileSync} from 'node:child_process';
import {readBlogContent} from './blog-content.mjs';
import {checkPublishingState} from '../lib/publishing-policy.mjs';

const run = (command,args) => execFileSync(command,args,{encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
try {
  run('gh',['auth','switch','--user','LeDjinn']);
  const auth = run('gh',['auth','status']);
  if (!/account LeDjinn[^\n]*\n\s*- Active account: true/.test(auth)) throw new Error('LeDjinn was not verified active.');
  const account = run('gh',['api','user','--jq','.login']);
  const remoteOutput = run('git',['remote','-v']);
  const remotes = [...new Set(remoteOutput.split('\n').map(line=>line.split(/\s+/)[1]).filter(Boolean))];
  const boundary = checkPublishingState({remotes,account,name:'LeDjinn',email:'timour.spiridonov@gmail.com',branch:'main',dirty:false,localSha:'boundary',remoteSha:'boundary'});
  if (boundary.length) throw new Error(boundary.join('\n'));
  run('git',['config','--local','user.name','LeDjinn']);
  run('git',['config','--local','user.email','timour.spiridonov@gmail.com']);
  const localSha = run('git',['rev-parse','HEAD']);
  const remoteSha = run('git',['ls-remote','origin','refs/heads/main']).split(/\s+/)[0];
  const errors = checkPublishingState({remotes,account,name:run('git',['config','--local','--get','user.name']),email:run('git',['config','--local','--get','user.email']),branch:run('git',['branch','--show-current']),dirty:!!run('git',['status','--porcelain']),localSha,remoteSha});
  if (errors.length) throw new Error(errors.join('\n'));
  const today = new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Tunis',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  const published = readBlogContent().filter(record=>record.blog.draft===false);
  const existing = published.filter(record=>record.blog.date===today).map(record=>record.slug);
  console.log(JSON.stringify({account,remote:remotes[0],branch:'main',head:localSha,today,timeZone:'Africa/Tunis',action:existing.length?'SKIP_ALREADY_PUBLISHED':'RESEARCH_ONE_ARTICLE',existing,published:published.map(record=>({slug:record.slug,title:record.blog.title,date:record.blog.date,tags:record.blog.tags}))},null,2));
} catch (error) {
  console.error(`Publishing preflight blocked: ${error.message}`);
  process.exitCode=1;
}
