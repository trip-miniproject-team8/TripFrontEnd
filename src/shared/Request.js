import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:3000/" // 요청을 www.aa.com/user로 보낸다면, www.aa.com까지 기록
});

export default api;

// --- 혹시몰라서 삭제 안함
// import RESP from "./Response";

// // const resp = await axios.get('EC2IP:8000/api/hotdeals')
// export const resp = RESP.HOTDEALS;
// for (let i=0; i<resp.length; i++) {
   
//     console.log(resp);
// }
// //회원가입 //로그인 요청안함

