import React from "react";
import {Grid, Image, Text, Input, Button} from "../elements";
import styled from 'styled-components';

import {actionCreators as commentActions} from '../redux/modules/comment';
import {useDispatch, useSelector} from 'react-redux';

const CommentWrite = (props) => {
  const dispatch = useDispatch();
  const [comment_text, setCommentText] = React.useState("");
  const {post_id} = props;
  const onChange = (e) => {
    setCommentText(e.target.value);
  }

  const write = () => {
    // if(contents === ""){
    //     window.alert("댓글을 입력해주세요!");
    //   return;
    // }
    dispatch(commentActions.addCommentFB(post_id, comment_text));
    setCommentText('');
  }

  return (
    <React.Fragment>
      <Grid width='92%' padding='16px' margin='auto' border='1px solid #ccc' is_flex>
        <Input border='none' placeholder='댓글을 입력해주세요' _onChange={onChange} value={comment_text} onSubmit={write} is_submit/>       
        <Button border='none' width='50px' margin='0 2px 0 2px' _onClick={write}>
          <Text margin='0' color='#0089ff' bold>작성</Text>
        </Button>
      </Grid>
    </React.Fragment>
  );
};


export default CommentWrite;