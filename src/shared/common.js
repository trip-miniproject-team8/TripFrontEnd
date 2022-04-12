export const emailCheck = (email) => {
  let _reg = /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;

  // ^[A-Za-z0-9-_]{3-9}
  return _reg.test(email);
}
export const idCheck =(id)=>
{
  let _reg = /^[-_0-9a-zA-Z]{3,10}$/;

  return _reg.test(id);
}