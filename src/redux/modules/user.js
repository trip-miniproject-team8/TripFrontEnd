import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import { auth } from '../../shared/firebase';

// 서버와 연결
import axios from "axios";
import { apis } from '../../shared/api';
import api from "../../shared/Request";

import {
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut
} from "firebase/auth";

// actions
const SET_USER = 'SET_USER';
const LOG_OUT = 'LOG_OUT';
const GET_USER = 'GET_USER';

// action creators
const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
// const logOut = createAction(LOG_OUT, (uid) => ({ uid }));
const getUser = createAction(GET_USER, (user) => ({ user }));

// initialState
const initialState = {
  user: null,
  is_login: false,
};

// middleware actions

const loginFB = (id, pwd) => {
  return function (dispatch, getState, {history}) {
    console.log("username : " + id, "password : " + pwd, '전송, sessionID 요청');

    apis.login(id,pwd)
      .then((res) => {
        const token = res.headers.authorization.split(" ")[1]; 
        // 토큰 복호화
        // const accessToken = JSON.parse(atob(token.split(".")[1]));
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const user_info = JSON.parse(jsonPayload);
        console.log('token 복호화 ::', user_info);
        console.log("id :",user_info.USER_NAME, "user_name :",user_info.NICK_NAME);
        // const user_info = res.config.data;
        
        dispatch(setUser({
          id: user_info.USER_NAME,  // 형식은 모르지만 일단..
          user_name: user_info.NICK_NAME,  // 형식은 모르지만 일단..
          user_profile: "https://user-images.githubusercontent.com/91959791/162985545-26ce4013-8004-4211-9948-c616aab0182a.png"
          // uid: user.uid, // 임의아이디(유저고유아이디) 있어야하는지 체크
        }))
        setCookie("is_login", token); // 토큰 여기 들어가야함
        localStorage.setItem("token", token); // 쿠키랑 로컬스토리지 둘중 하나만해도되면 토큰 여기에 저장
        history.push('/');
        window.location.reload();
        }).catch((err)=>{
          console.log("로그인 오류", err);
          window.alert("로그인 오류");
          window.location.reload();
        
      });
    

    }
};

const signupFB = (id, usernickname, pwd, pwcheck) => {
  return function (dispatch, getState, {history}) {
    console.log("username : " + id, "password : " + pwd, '전송, sessionID 요청');

    apis.signup(id,usernickname,pwd,pwcheck)
      .then((res)=>{
        console.log(res); // 회원가입 성공 유무를 서버에서 알려줘야할거같음... 
        console.log("회원가입 성공");
        window.alert("환영합니다!\n회원가입이 완료되셨습니다");
        history.replace('/'); // 로그인창으로 이동
      })
      .catch((err)=>{
        console.log("회원가입 오류", err);
        window.alert("회원가입 오류");
      })

  }
};

const loginCheckFB = () => {
  return function (dispatch, getState, {history}) {

    apis.islogin().then((res) => {
        console.log("res 확인", res.data);
        if (res.data) { // data 값이 있다면
          const token = localStorage.getItem('token');
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          const user_info = JSON.parse(jsonPayload);
          console.log('로그인정보 :', user_info);
          const _user = getState().user;
          console.log('유저정보11111 :', _user);
          dispatch(setUser({
            id: user_info.USER_NAME,  
            user_name: user_info.NICK_NAME,  
            user_profile: "https://user-images.githubusercontent.com/91959791/162985545-26ce4013-8004-4211-9948-c616aab0182a.png"
            // uid: user.uid, // 임의아이디(유저고유아이디) 있어야하는지 체크
          }))
        } else {
          console.log("유저데이터 없음");
          dispatch.logOut();
        }
      }).catch((error) => {
        console.log("토큰 전달 오류", error);
      });
  }  
};

const logoutFB = () => {
  return function (dispatch, getState, {history}) {
    dispatch(logOut());
    history.replace('/');
  }
  
};


// reducer 
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        console.log('set user!!! ', action.payload.user);
        draft.user = action.payload.user;
				draft.is_login = true;
        console.log('set user22!!! ', draft.user);
      }),
		[LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        localStorage.removeItem('token');
        deleteCookie("is_login"); 
        draft.user = null;
				draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// action creator export
const actionCreators = {
  setUser,
  logOut,
  getUser,
  loginFB,
  signupFB,
  loginCheckFB,
  logoutFB,
};

export { actionCreators };