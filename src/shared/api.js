import axios from 'axios';
import comment from '../redux/modules/comment';
axios.defaults.withCredentials = true;

const token = sessionStorage.getItem('token');
const api = axios.create({
    baseURL: 'http://3.35.52.88',
    // headers: {
    //     'content-type': 'application/json;charset=UTF-8',
	// 	accept: 'application/json,',

    // },
});
const apiset = axios.create({
    baseURL: 'http://3.35.52.88',
    // headers: {
    //     'content-type': 'application/json;charset=UTF-8',
	// 	accept: 'application/json,',

    // },
});

// api.interceptors.request.use(function (config) {
// 	const accessToken = document.cookie.split('=')[1];
// 	config.headers.common['X-AUTH-TOKEN'] = `${accessToken}`;
// 	return config;
// });

export const apis={
    //user

    login: (id,pw)=> api.post('/user/login', {username:id, password:pw}),
    signup: (id,nickname, pw, pwcheck)=> api.post('/api/signup', {
        username:id,
        userNickname:nickname, 
        password:pw,
        passwordCheck:pwcheck }),
    islogin: ()=> api.get("/api/islogin", {
        headers: { 
          "content-type": "applicaton/json;charset=UTF-8", 
          "accept": "application/json", 
          "Authorization": `Bearer ${localStorage.getItem('token')}`, 
        },
        // {
        //   // Authorization: `Bearer ${localStorage.getItem('token')}`
        // },
      }),
    // lgout: 
    
    //post
    Getallpost : () => api.get('/api/post'),
    addPost: (file)=>api.post('/api/image',file,{
        headers:{  
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }),
    // editPost: (id, contents)=>api.post('api/post/{postid}', contents) //이미지 보내는법 확인
    delPost: (postid)=> api.delete(`api/post/${postid}`,{
        headers:{  
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }),
    detailGet: (id) =>api.get('api/post/{postid}'),

    //comment
    addComment: (postId, contents)=> api.post('api/comment/{postId}'),
    delComment: (commentId) => api.delete('api/comment/{commentId}'),
    
    //
}