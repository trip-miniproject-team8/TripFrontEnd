import React from 'react';
import { Grid, Text, Image, Button } from '../elements';

import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';

const Post = (props) => {
  
  console.log("In Post is_me",props.is_me);
  const dispatch = useDispatch();
  // console.log(props.src);

  const deletePost = () => {
      console.log(props.id);
    dispatch(postActions.deletePostFB(props.id));
  }

  const editPost = () => {
    history.push(`/posting/${props.id}`);

  }
  console.log(props);

  return (
    <React.Fragment>
      {/* <Grid width='95%' padding='16px' margin='auto'> */}
      <Grid>
        <Grid padding='16px 16px 0'>
          <Grid is_flex>
            <Grid is_flex width='auto'>
              <Image shape='circle' src={props.src} />
              <Text bold>{props.userNickname}</Text>
            </Grid>
            <Grid is_flex width='auto'>
              <Text>{props.createdAt}</Text>
              {props.is_me && <Grid width='auto'><Button width='auto' margin='0 0 0 10px' _onClick={editPost}>
                수정
                </Button>
                <Button width='auto' margin='0 0 0 10px' _onClick={deletePost}>
                삭제
                </Button>
                </Grid>}
            </Grid> 
          </Grid>
          <Grid>  
            <Text>{props.content}</Text>
          </Grid> 
        </Grid>
        <Grid _onClick={() => {history.push(`/post/${props.id}`);}}>
          <Image shape='rectangle' src={props.imageUrl} />
        </Grid>
        <Grid width='95%' padding='16px' margin='auto'>
          <Text margin='0' bold>댓글 {props.commentCtn}개</Text>        
        </Grid>
      </Grid>
    </React.Fragment>
  );

};

Post.defaultProps = {
  user_info: {
    user_name: 'yesleee',
    user_profile: 'https://user-images.githubusercontent.com/91959791/162985545-26ce4013-8004-4211-9948-c616aab0182a.png',
  },
  image_url: 'https://user-images.githubusercontent.com/91959791/162628908-e8f33c7a-1e40-4646-89ee-6228f76c815b.png',
  contents: '베리베리냠냠',
  comment_cnt: 10,
  insert_dt: '2021-02-27 10:00:00',
  is_me: false,
};

export default Post;