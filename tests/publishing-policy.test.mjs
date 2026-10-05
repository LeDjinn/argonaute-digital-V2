import test from 'node:test';
import assert from 'node:assert/strict';
import { checkPublishingState } from '../lib/publishing-policy.mjs';

const safe = { remotes: ['https://LeDjinn@github.com/LeDjinn/argonaute-digital-V2.git'], account: 'LeDjinn', name: 'LeDjinn', email: 'timour.spiridonov@gmail.com', branch: 'main', dirty: false, localSha: 'abc', remoteSha: 'abc' };
test('publishing boundary rejects every nonpersonal remote and identity', () => {
  for (const remote of ['https://github.com/CommunityJameel/site.git','git@github.com:ThoughtIndustries/site.git','https://github.com/LeDjinn.evil/site.git','https://github.com.evil/LeDjinn/site.git']) assert.ok(checkPublishingState({...safe, remotes:[remote]}).length);
  assert.ok(checkPublishingState({...safe,account:'CJengineering'}).length);
  assert.ok(checkPublishingState({...safe,email:'communityjameeltechnology@gmail.com'}).length);
  assert.ok(checkPublishingState({...safe,remotes:[]}).length);
  assert.deepEqual(checkPublishingState(safe),[]);
  assert.deepEqual(checkPublishingState({...safe,remotes:['git@github.com:LeDjinn/argonaute-digital-V2.git']}),[]);
});
test('publishing preflight stops dirty work, wrong branch and divergence', () => {
  assert.ok(checkPublishingState({...safe,dirty:true}).length);
  assert.ok(checkPublishingState({...safe,branch:'other'}).length);
  assert.ok(checkPublishingState({...safe,remoteSha:'different'}).length);
});
