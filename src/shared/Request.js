import axios from "axios";
console.log("test1");
document.cookie = "MY_COOKIE=here;"
const instance = axios.create({
	baseURL: "http://localhost:3000/" // 요청을 www.aa.com/user로 보낸다면, www.aa.com까지 기록
});

console.log(instance);
// 가지고 있는 토큰 넣어주기!
// 로그인 전이면 토큰이 없으니 못 넣어요.
// 그럴 땐 로그인 하고 토큰을 받아왔을 때 넣어줍시다.
instance.defaults.headers.common["Authorization"] = sessionStorage.getItem("MY_SESSION");; 

export const authApi = {
    // e.g) 회원 가입
    signup: someData =>
        instance.post("api/user", {
					someData: someData,
					someOtherData: someOtherData
        }),

    // e.g) 유저 프로필 변경
    editUserProfile: (someData) =>
        instance.put(`api/user/${userId}`, { 
					someData: someData,
					someOtherData: someOtherData
 }),

export const postApi = {
    // e.g) 회원 가입
    getPost: () =>
        instance.get("api/posts"),

    // e.g) 유저 프로필 변경
    editPosts: (someData) =>
        instance.put(`api/post/${postId}`, { 
					someData: someData,
					someOtherData: someOtherData
 }),

export default instance;