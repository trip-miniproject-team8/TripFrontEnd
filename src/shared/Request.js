import RESP from "./Response";

// const resp = await axios.get('EC2IP:8000/api/hotdeals')
export const resp = RESP.HOTDEALS;
for (let i=0; i<resp.length; i++) {
   
    console.log(resp);
}
//회원가입 //로그인 요청안함

