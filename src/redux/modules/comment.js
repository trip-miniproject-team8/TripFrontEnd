import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import "moment";
import moment from "moment";
import api from "../../shared/Request";
import { apis } from '../../shared/api';

import firebase from 'firebase/compat/app';
import { actionCreators as postActions } from './post';
import { push } from "connected-react-router";


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
    const user_info = getState().user;
    let comment = {
      username: user_info.username,
      userNickname: user_info.usernickname,
      user_profile: user_info.user_profile,
      comment: contents,
      };
      console.log(comment);
      apis.addComment(post_id,contents)
      .then((res)=>{
        
        console.log("코멘트 추가 요청 성공");
        const post = getState().post.list.find((l) => l.id == post_id);
        console.log(post);
        comment = {...comment};
        console.log(comment);
        dispatch(addComment(post_id,comment))

      })
      .catch((error)=>{
        console.log(error);
      });

      
      // post에도 comment_cnt를 하나 플러스
      // dispatch(addComment(post_id, comment));
      
        

    
  }

    
}

const getCommentFB = (post_id = null) => {
    return function(dispatch, getState, {history}){
      // post_id가 없으면 바로 리턴하기!
      const comment_list=[];
      let temp=[];
      if (!post_id) {
        return;
      }
      apis.GetComment(post_id)
      .then((res)=>{
        console.log('댓글불러오기 요청성공');
        const temp=res.data.comments;
        temp.forEach(element => {
          comment_list.push(element)
        });
        console.log('temps type',comment_list);
        dispatch(setComment(post_id,comment_list));

      })
      .catch((error)=>{
        console.log(error);

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
        console.log(draft.list[action.payload.post_id]);
      }),
      
      [ADD_COMMENT]: (state, action) => produce(state, (draft)=> {
        draft.list[action.payload.post_id].unshift(action.payload.comment);
        console.log(action.payload.comment)
        console.log('addtest');
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