import axios from 'axios';
import comment from '../redux/modules/comment';

const api = axios.create({
    baseURL: '',
    headers: {

    },
});

api.interceptors.request.use(function (config) {
	const accessToken = document.cookie.split('=')[1];
	config.headers.common['X-AUTH-TOKEN'] = `${accessToken}`;
	return config;
});

export const apis={
    //user

    login: (id,pw)=> api.post('/user/login', {username:id, password:pw}),
    signup: (id,nickname, pw, pwcheck)=> api.post('/api/signup', {
        username:id,
        usernickname:nickname, 
        password:pw,
        passwordCheck:pwcheck }),
    islogin: ()=> api.get('/api/islogin'),
    // lgout: 
    
    //post
    Getallpost : () => api.get('api/post'),
    // addPost: (content,imageURl)=>api.post('/api/post',) //이미지 보내는법 확인
    // editPost: (id, contents)=>api.post('api/post/{postid}', contents) //이미지 보내는법 확인
    delPost: (postid)=> api.delete('api.post/{postid'),
    detailGet: (id) =>api.get('api/post/{postid}'),

    //comment
    addComment: (postId, contents)=> api.post('api/comment/{postId}'),
    delComment: (commentId) => api.delete('api/comment/{commentId}'),
    
    //
}