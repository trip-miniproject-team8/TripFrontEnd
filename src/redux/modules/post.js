import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase";
import moment from 'moment';

// 서버와 연결
import axios from "axios";
import api from "../../shared/Request";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

import {actionCreators as imageActions} from "./image";
import { doc, deleteDoc } from "firebase/firestore";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const LOADING = "LOADING"

// const setPost = createAction(SET_POST, (post_list, paging) => ({post_list, paging})); // 무한스크롤 test
const setPost = createAction(SET_POST, (post_list) => ({post_list}));
const addPost = createAction(ADD_POST, (post) => ({post}));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const deletePost = createAction(DELETE_POST, (post_id) => ({post_id}));
const loading = createAction(LOADING, (is_loading) => ({is_loading}));

const initialState = {
  // is_loaded: false,
  list: [],
  // paging: { start: null, next: null, size: 3 },
  // is_loading: false,
}

const initialPost = {
  // user_info: {
  //   id: 0,
  //   user_name: 'yesleee',
  //   user_profile: 'https://user-images.githubusercontent.com/91959791/161682922-347edc18-3711-4108-b9d1-26b51a41447c.jpg',
  // },
  image_url: '',
  contents: '',
  comment_cnt: 0,
  // insert_dt: moment().format('YYYY-MM-DD hh:mm:ss'),
};

// middleware
// const getPostFB = (start = null, size=3) => {  // 무한스크롤 test
//   return function (dispatch, getState, { history }) { 
//     console.log(start);
//     let _paging = getState().post.paging;

//     if (_paging.start && !_paging.next) {
//       return;
//     }

//     dispatch(loading(true));
//     const postDB = firestore.collection("post");

//     let query = postDB.orderBy("insert_dt", "desc");
 
//     if (start) {
//       query = query.startAt(start);
//     }

//     query.limit(size + 1).get().then(docs => {
//       console.log(docs);
//       let post_list = [];

//       let paging = {
//         start: docs.docs[0],
//         next: docs.docs.length === size+1? docs.docs[docs.docs.length - 1] : null,
//         size: size,
//       };

//       docs.forEach((doc) => {
//         let _post = doc.data();
//         let post = Object.keys(_post).reduce((acc, cur) => {
//             if (cur.indexOf("user_") !== -1) {
//               return {
//                 ...acc,
//                 user_info: { ...acc.user_info, [cur]: _post[cur] },
//               };
//             }
//             return { ...acc, [cur]: _post[cur] };
//           },
//           { id: doc.id, user_info: {} }
//         );
        
//         post_list.push(post);
//       });

//       post_list.pop();
//       console.log(paging.start, paging.next);
//       console.log(post_list, paging);
//       dispatch(setPost(post_list, paging));

//     });
//   } 
// }
const getPostFB = () => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");

    let query = postDB.orderBy("insert_dt", "desc");

    // api
    //   .get("/api/post").then((res) => {
    //     console.log("전체 Post list ", res.data);
    //     let post = {
    //       user_info, ..._post, id: res.data.id, image_url: _image};

    //     console.log('post작성완료! post : ',post);
    //     dispatch(addPost(post));
    //     dispatch(imageActions.setPreview(null));
    
    //     window.alert("작성이 완료됐습니다!");
    //     history.replace('/');

    //   }).catch((error) => {
    //     console.log("post 추가 오류", error);
    //   });

    query.get().then(docs => {
      let post_list = [];
      docs.forEach((doc) => {
        let _post = doc.data();

        // ['commenct_cnt', 'contents', ..]
        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf("user_") !== -1) {
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: _post[cur] },
              };
            }
            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, user_info: {} }
        );

        post_list.push(post);
      });

      console.log(post_list);

      dispatch(setPost(post_list));
    });
  };
};

const addPostFB = (contents = '') => {
  return function (dispatch, getState, { history }) { 
    
    // const postDB = firestore.collection('post');

    const _user = getState().user.user;
    const _image = getState().image.preview; // 파일객체내용을 string으로 가지고 있음

    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };

    const _post = {
    };
  };

};

const editPostFB = (post_id = null, post = {}) => {
  return function (dispatch, getState, { history }) {

    if (!post_id) {
      console.log("게시물 정보가 없어요!");
      return;
    }
    const _image = getState().image.preview;
  
    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[_post_idx];
    console.log(_post);

    const postDB = firestore.collection("post");
    if (_image === _post.image_url) {
      postDB.doc(post_id).update(post).then(doc => {
        dispatch(editPost(post_id, { ...post }));
        history.replace("/");
      });
      return;
    }else {
      const user_id = getState().user.user.uid;
      const _upload = storage
        .ref(`images/${user_id}_${new Date().getTime()}`)
        .putString(_image, "data_url");

      _upload.then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            console.log(url);

            return url;
          })
          .then((url) => {
            postDB
              .doc(post_id)
              .update({ ...post, image_url: url })
              .then((doc) => {
                dispatch(editPost(post_id, { ...post, image_url: url }));
                history.replace("/");
              });
          })
          .catch((err) => {
            window.alert("앗! 이미지 업로드에 문제가 있어요!");
            console.log("앗! 이미지 업로드에 문제가 있어요!", err);
          });
      });
    }

};
}


const getOnePostFB = (id) => {
  return function(dispatch, getState, {history}){
    const postDB = firestore.collection("post");
    postDB
      .doc(id)
      .get()
      .then((doc) => {
        let _post = doc.data();

        if (!_post) {
          return;
        }

        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf("user_") !== -1) {
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: _post[cur] },
              };
            }
            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, user_info: {} }
        );
        dispatch(setPost([post], { start: null, next: null, size: 3 }));
        // dispatch(setPost([post]));
      });
  }
}

 
const deletePostFB = (post_id = null) => {
  return function (dispatch, getState, { history }) {
    // const _image = getState().image.preview;
    // console.log(post_id);

    // const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    // const _post = getState().post.list[_post_idx];
    // console.log(_post);
    const postDB = firestore.collection("post");
    postDB.doc(post_id).delete().then(() => {
      console.log('삭제 성공!');
      dispatch(deletePost(post_id));
      history.replace("/");
    }).catch((error) => {
      console.log('error!', error);
    });

};
};


// reducer
export default handleActions(
  {
      // [SET_POST]: (state, action) => produce(state, (draft) => { // 무한스크롤 test
      //   console.log("test", action.payload.post_list);
      //   draft.list.push(...action.payload.post_list);


      //   draft.list = draft.list.reduce((acc, cur) => {
      //     if (acc.findIndex((a) => a.id === cur.id) === -1){
      //       return [...acc, cur];
      //     } else {
      //       acc[acc.findIndex((a) => a.id === cur.id)] = cur;
      //       return acc;
      //     }
      //   }, []);
      //   if (action.payload.paging) {
      //     draft.paging = action.payload.paging;
      //   }

      //   // draft.paging.next += 1;
      //   draft.is_loading = false;
      // }),
      [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);
        draft.paging = action.payload.paging;
        draft.is_loading = false;
      }),
      [ADD_POST]: (state, action) => produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
      [EDIT_POST]: (state, action) => produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),
      [DELETE_POST]: (state, action) => produce(state, (draft) => {
        draft.list = draft.list.filter((p) => p.id !== action.payload.post_id);
      }),
      [LOADING]: (state, action) => produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),

  },
  initialState
);

// action creator export
const actionCreators = {
  setPost,
  addPost,
  editPost,
  deletePost,
  getPostFB,
  addPostFB,
  editPostFB,
  deletePostFB,
  getOnePostFB,
};

export { actionCreators };