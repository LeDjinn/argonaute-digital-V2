export async function submitContact(data,request=globalThis.fetch) {
  try {
    const response = await request('https://formspree.io/f/mgveanvn',{method:'POST',body:data,headers:{Accept:'application/json'}});
    return response.ok === true;
  } catch {
    return false;
  }
}
