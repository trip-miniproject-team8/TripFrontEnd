import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import "moment";
import moment from "moment";
import api from "../../shared/Request";
import { apis } from '../../shared/api';

import firebase from 'firebase/compat/app';
import { actionCreators as postActions } from './post';


const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
const LOADING = "LOADING";

const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({post_id, comment_list}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({post_id, comment}));
const deleteComment = createAction(DELETE_COMMENT, (comment_id) => ({comment_id}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: {},
  is_loading: false,
};

const addCommentFB = (post_id, contents) => {
  return function (dispatch, getState, { history }) {
    const commentDB = firestore.collection("comment");
    const user_info = getState().user.user;

    let comment = {
      post_id: post_id,
      user_id: user_info.uid,
      user_name: user_info.user_name,
      user_profile: user_info.user_profile,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };

    // firestore에 코멘트 정보를 넣기
    commentDB.add(comment).then((doc) => {
      const postDB = firestore.collection("post");
      const post = getState().post.list.find((l) => l.id === post_id);

      // firestore에 저장된 값을 +1해줍니다!
      const increment = firebase.firestore.FieldValue.increment(1);
      comment = { ...comment, id: doc.id };
      // post에도 comment_cnt를 하나 플러스
      postDB.doc(post_id).update({ comment_cnt: increment }).then((_post) => {
        dispatch(addComment(post_id, comment));
        if (post) {
          dispatch(postActions.editPost(post_id, {
              comment_cnt: parseInt(post.comment_cnt) + 1,
            }));
        }

      });
    });
  }
}

const getCommentFB = (post_id = null) => {
    return function(dispatch, getState, {history}){
      // post_id가 없으면 바로 리턴하기!
      if (!post_id) {
        return;
      }
      const commentDB = firestore.collection("comment");

      commentDB
        .where("post_id", "==", post_id)
        .orderBy("insert_dt", "desc")
        .get()
        .then((docs) => {
          let list = [];
          docs.forEach((doc) => {
            list.push({ ...doc.data(), id: doc.id });
          });

        // 가져온 데이터를 넣어주기
        dispatch(setComment(post_id, list));
      }).catch(err => {
        console.log("댓글 가져오기 실패!", post_id, err);
      });
    }
}

const deleteCommentFB = (comment_id = null) => {
  return function (dispatch, getState, { history }) {
    if(!comment_id) {
      window.alert("댓글 정보가 없어요!");
      return;
    }
    apis.delComment(comment_id)
      .then((res)=>{
        console.log('댓글 삭제 후 전달된 데이터! :', res);
        window.alert("삭제가 완료되었습니다!");
        dispatch(deleteComment(comment_id));
        history.replace("/");
      })
      .catch((error)=>{
        console.log('댓글 삭제중 오류!', error);
      })

};
};


export default handleActions(
  {
      [SET_COMMENT]: (state, action) => produce(state, (draft) => {
        draft.list[action.payload.post_id] = action.payload.comment_list;
      }),
      
      [ADD_COMMENT]: (state, action) => produce(state, (draft)=> {
        draft.list[action.payload.post_id].unshift(action.payload.comment);
      }),
      [DELETE_COMMENT]: (state, action) => produce(state, (draft) => {
        draft.list = draft.list.filter((p) => p.id !== action.payload.comment_id);
      }),
      [LOADING]: (state, action) => 
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      })
  },
  initialState
);

const actionCreators = {
  getCommentFB,
  addCommentFB, 
  deleteCommentFB,
  setComment,
  addComment,
  deleteComment,

};

export { actionCreators };