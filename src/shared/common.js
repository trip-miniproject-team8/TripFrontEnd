export const idCheck = (id) => {
  let _reg = /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
  // let _reg = /^[a-z]+[a-z0-9]{3,9}$/g;

  return _reg.test(id);
}
