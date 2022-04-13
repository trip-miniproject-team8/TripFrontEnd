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

  // console.log('게시물 아이디', id);
  
  const user_info = useSelector((state) => state.user);
  const post_list = useSelector((state) => state.post.list);
  console.log('게시물 정보', post_list);
  
  // console.log(post_list[0].id);
  const post_idx = post_list.findIndex(p => p.id == id);
  // console.log(post_idx);
  const post = post_list[post_idx];
  console.log(post);
  console.log(post.username);
  console.log(user_info.username);
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
              <Post {...post} is_me={post.username === user_info.username} />
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