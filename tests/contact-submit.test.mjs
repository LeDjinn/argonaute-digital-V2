import test from 'node:test';
import assert from 'node:assert/strict';
import { submitContact } from '../lib/contact-submit.mjs';

test('contact submission reports server failure instead of false success', async () => {
  assert.equal(await submitContact(new FormData(),async()=>({ok:false})),false);
});
test('contact submission reports network failure and confirms genuine success', async () => {
  assert.equal(await submitContact(new FormData(),async()=>{throw new Error('offline');}),false);
  assert.equal(await submitContact(new FormData(),async(url,options)=>{assert.equal(url,'https://formspree.io/f/mgveanvn'); assert.equal(options.method,'POST'); assert.equal(options.headers.Accept,'application/json');return {ok:true};}),true);
});
