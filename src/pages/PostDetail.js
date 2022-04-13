import React from "react";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";

import Permit from '../shared/Permit';
import { Grid } from '../elements';

import { useSelector, useDispatch } from "react-redux";
import post, {actionCreators as postActions} from "../redux/modules/post";

const PostDetail = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  
  console.log("디테일에서 확인",props);

  // console.log('게시물 아이디', id);
  
  // const user_info = useSelector((state) => state.user);
  const post_list = useSelector((store) => store.post.list);
  const token = localStorage.getItem('token');

  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  const user_info = JSON.parse(jsonPayload);

  
  // console.log(post_list[0].id);
  const post_idx = post_list.findIndex(p => p.postId == id);
  // console.log(post_idx);
  const post = post_list[post_idx];

  console.log('게시물 정보', post_list);
  console.log('유저 정보', user_info);
  // console.log(post);
  // console.log(post.username);
  // console.log(post);

  React.useEffect(() => {

    console.log('게시물 아이디', id);
      if(post){
         return; 
      }
      dispatch(postActions.getOnePostFB(id));
    }, []);


    return (
        <React.Fragment>
          <Grid  border='1px solid #ccc' margin='20px auto'>
            {post && (
              <Post {...post} is_me={post.userNickname === user_info.NICK_NAME} />
            )}
            <Permit>
              <CommentWrite post_id={id}/>
            </Permit>
            <CommentList post_id={id}/>
          </Grid>
        </React.Fragment>
    )
}

export default PostDetail;