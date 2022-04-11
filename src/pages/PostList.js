//Magazine.js
import React from 'react';
import Post from '../components/Post';

import { useSelector, useDispatch } from "react-redux";
import {actionCreators as postActions} from '../redux/modules/post';
import InfinityScroll from '../shared/InfinityScroll';
import {Grid} from "../elements";

const PostList = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.user.is_loading);
  const paging = useSelector((state) => state.post.paging);

  const {history} = props;

  React.useEffect(() => {
    if(post_list.length < 2) {
      dispatch(postActions.getPostFB());
    }
  }, []);

  // console.log(post_list)
  return (
    <React.Fragment>
      {/* <InfinityScroll callNext={() => {  무한스크롤
          console.log("next!");
          dispatch(postActions.getPostFB(paging.next));
        }}
        is_next={paging.next? true : false}
        loading={is_loading}> */}
        {post_list.map((p, idx) => {
          if(user_info && p.user_info.user_id === user_info.uid){
            return (
              <Grid  border='1px solid #ccc' margin='20px auto' key={p.id} _onClick={() => {history.push(`/post/${p.id}`);}}>
                <Post {...p} is_me/>
              </Grid>
            );
          }
          return (
            <Grid border='1px solid #ccc' margin='20px auto' key={p.id} _onClick={() => {history.push(`/post/${p.id}`);}}>
              <Post {...p}/>
            </Grid>
          );
        })}
      {/* </InfinityScroll> */}
    </React.Fragment>
  );

}

export default PostList;