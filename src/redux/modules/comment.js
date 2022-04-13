import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import "moment";
import moment from "moment";
import { apis } from "../../shared/api";
import firebase from 'firebase/compat/app';
import { actionCreators as postActions } from './post';
import { push } from "connected-react-router";


const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";

const LOADING = "LOADING";

const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({post_id, comment_list}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({post_id, comment}));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: {},
  is_loading: false,
};

const addCommentFB = (post_id, contents) => {
  return function (dispatch, getState, { history }) {
    const user_info = getState().user;
    let comment = {
      post_id: post_id,
      user_id: user_info.username,
      user_name: user_info.usernickname,
      user_profile: user_info.user_profile,
      contents: contents,
      };
      apis.addComment(post_id,contents)
      .then((res)=>{
        console.log("코멘트 추가 요청 성공");
      })
      .catch((error)=>{
        console.log(error);
      });

      const post = getState().post.list.find((l) => l.id == post_id);
      console.log(post);
      comment = {...comment};
      console.log(comment);
      dispatch(addComment(post_id,comment))
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
        // console.log(res);
        // console.log(res.data);
        // console.log(typeof(res.data.comments));
        // console.log(res.data.comments);
        // console.log(res.data.comments[0]);
        // console.log(comment_list);
        const temp=res.data.comments;
        // console.log(temp.length);
        temp.forEach(element => {
          // console.log(element);
          comment_list.push(element)
          // temp.push({element});
          
        });
        console.log('temps type',comment_list);
        dispatch(setComment(post_id,comment_list));

      })
      .catch((error)=>{
        console.log(error);

      });
  
      // dispatch(setComment(post_id,comment_list));
    



      // commentDB
      //   .where("post_id", "==", post_id)
      //   .orderBy("insert_dt", "desc")
      //   .get()
      //   .then((docs) => {
      //     let list = [];
      //     docs.forEach((doc) => {
      //       list.push({ ...doc.data(), id: doc.id });
      //     });

      //   // 가져온 데이터를 넣어주기
        
      // }).catch(err => {
      //   console.log("댓글 가져오기 실패!", post_id, err);
      // });
    }
}


export default handleActions(
  {
      [SET_COMMENT]: (state, action) => produce(state, (draft) => {
        draft.list[action.payload.post_id] = action.payload.comment_list;
        console.log(draft.list[action.payload.post_id]);
      }),
      
      [ADD_COMMENT]: (state, action) => produce(state, (draft)=> {
        draft.list[action.payload.post_id].unshift(action.payload.comment);
        console.log('addtest');
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
  setComment,
  addComment,
};

export { actionCreators };