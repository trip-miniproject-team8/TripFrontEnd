export const idCheck = (id) => {
  let _reg = /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
  // let _reg = /^[-_0-9a-zA-Z]{3,10}$/;  // 서버연결시

  return _reg.test(id);
}