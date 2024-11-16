export function setCookie(name: string, value: string, seconds: number) {
    const date = new Date();
    date.setTime(date.getTime()  + seconds * 1000);
    const expires = date.toUTCString();
    document.cookie = `${name}=${value};expires=${expires};path=/`;
  }
  
  export function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  }
  