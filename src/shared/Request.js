<<<<<<< HEAD
import axios from "axios";
// console.log("test1");
// document.cookie = "MY_COOKIE=here;"
const api = axios.create({
	baseURL: "http://localhost:3000/" // 요청을 www.aa.com/user로 보낸다면, www.aa.com까지 기록
});
// console.log(instance);
// // 가지고 있는 토큰 넣어주기!
// // 로그인 전이면 토큰이 없으니 못 넣어요.
// // 그럴 땐 로그인 하고 토큰을 받아왔을 때 넣어줍시다.
// instance.defaults.headers.common["Authorization"] = sessionStorage.getItem("MY_SESSION");; 

export default api;
=======
import RESP from "./Response";

// const resp = await axios.get('EC2IP:8000/api/hotdeals')
export const resp = RESP.HOTDEALS;
for (let i=0; i<resp.length; i++) {
   
    console.log(resp);
}
//회원가입 //로그인 요청안함

>>>>>>> apitest
