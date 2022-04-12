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
    // // 서버연결버전
    console.log("username : " + id, "password : " + pwd, '전송, sessionID 요청');

    apis.login(id,pwd)
.then((res)=>{
  
      console.log("로그인 성공, 데이터 : ", res.config.data);
      const token = res.headers.authorization.split(" ")[1]; // 형식은 모르지만 일단..
      console.log("sessionID(토큰) : ", token.payload);

      dispatch(setUser({
        id: res.username,  // 형식은 모르지만 일단..
        user_name: res.userNickname,  // 형식은 모르지만 일단..
        user_profile: "https://user-images.githubusercontent.com/91959791/162735074-353e821d-64a3-4336-b60c-0a9ffadb7137.png"
        // uid: user.uid, // 임의아이디(유저고유아이디) 있어야하는지 체크
      }))
      setCookie("is_login", true); // 토큰 여기 들어가야함
      localStorage.setItem("token", token); // 쿠키랑 로컬스토리지 둘중 하나만해도되면 토큰 여기에 저장
      history.replace('/');
      })
    .catch((err)=>{
        console.log("로그인 오류", err);
        window.alert("로그인 오류");
        window.location.reload();
        
    })

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
    // 서버연결버전
    api
      .get("/api/islogin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      }).then((res) => {
        console.log(res.request);
        if (res.username) { // username 이 있다면 or (result 값이 true 로 전달된다면)
          dispatch(setUser({
            id: res.username,  // 형식은 모르지만 일단..
            user_name: res.userNickname,  // 형식은 모르지만 일단..
            user_profile: "https://user-images.githubusercontent.com/91959791/162735074-353e821d-64a3-4336-b60c-0a9ffadb7137.png",
            // uid: user.uid, // 임의아이디(유저고유아이디) 있어야하는지 체크
          }))
        } else {
          dispatch.logOut();
        }
      }).catch((error) => {
        console.log("오류", error);
      });
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     dispatch(setUser({
    //       user_name: user.displayName,
    //       id: user.email,
    //       user_profile: '',
    //       uid: user.uid,
    //     }));
    //     // ...
    //   } else {
    //     dispatch.logOut();
    //     // ...
    //   }
    // });
  }  
};

const logoutFB = () => {
  return function (dispatch, getState, {history}) {
    // 서버 연결 ?? 연결해봐야 원리를 알거같음...
    const uid = getState().user.user.uid;
    dispatch(logOut(uid));
    history.replace('/');

    // signOut(auth).then(() => {
    //   // Sign-out successful.
    //   dispatch(logOut());
    //   history.replace('/');
    // }).catch((error) => {
    //   // An error happened.
    //   console.log(error);
    // });
  }
  
};


// reducer 
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        // setCookie("is_login", "success"); // 서버연결시 삭제
        draft.user = action.payload.user;
				draft.is_login = true;
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