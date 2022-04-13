//Magazine.js
import React from 'react';
import Post from '../components/Post';

import { useSelector, useDispatch } from "react-redux";
import {actionCreators as postActions} from '../redux/modules/post';
import InfinityScroll from '../shared/InfinityScroll';
import {Grid} from "../elements";
import  api  from '../shared/Request';
import { apis } from '../shared/api';
import axios from 'axios';
const PostList = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  console.log('test!@#@@', user_info);;
  const is_loading = useSelector((state) => state.user.is_loading);
  const paging = useSelector((state) => state.post.paging);

  const {history} = props;
  const temp_post_list=[];
  React.useEffect(() => {
    

    if(post_list.length < 2) {
      console.log("test1");
      dispatch(postActions.getPostFB());
    }
  }, []);
  api.get('/api/post').then((res)=>{
    console.log(res);
    console.log(res.data);
    // temp_post_list=res.data;
  })
  .catch((error)=>{
    console.log(error);
    
  })

  console.log(post_list);
  console.log(temp_post_list);
  return (
    <React.Fragment>
      {/* <InfinityScroll callNext={() => {  //무한스크롤
          // console.log(paging.);
          dispatch(postActions.getPostFB(paging.next));
        }}
        is_next={paging.next? true : false}
        loading={is_loading}> */}
        {post_list.map((p, idx) => {
          if(user_info&&p.username===user_info.id){
            console.log(p);
            console.log(p.username);
            console.log(user_info);
            return (
              <Grid  border='1px solid #ccc' margin='20px auto' key={p.id}>
                <Post {...p} is_me/>
              </Grid>
            );
          }
          return (
            <Grid border='1px solid #ccc' margin='20px auto' key={p.id}>
              <Post {...p}/>
            </Grid>
          );
        })}
      {/* </InfinityScroll> */}
    </React.Fragment>
  );

}

export default PostList;