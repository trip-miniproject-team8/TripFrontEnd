import React from "react";
import {Grid, Image, Text, Button} from "../elements";

import {useDispatch, useSelector} from "react-redux";
import comment, {actionCreators as commentActions} from "../redux/modules/comment";

const CommentList = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const comment_list = useSelector(state => state.comment.list);
  const {post_id} = props;
  console.log("aklsdfklzkl");
  console.log(comment_list[props.post_id]);

  React.useEffect(() => {
    if(!comment_list[post_id]){
      // 코멘트 정보가 없으면 불러오기
      console.log("코멘트정보없음");
      dispatch(commentActions.getCommentFB(post_id));
    }
  }, []);

  // comment가 없거나, post_id가 없으면 아무것도 안넘겨준다!
  if(!comment_list[post_id] || !post_id){
    return null;
  }


  const commentDel = (comment_id) => {
    const input = window.confirm("댓글을 삭제할까요?");
    if(input) {
      dispatch(commentActions.deleteCommentFB(comment_id));
    }
  };

  return (
    <React.Fragment>
      <Grid width='95%' padding='16px' margin='auto'>
        {comment_list[post_id].map(c => {
          console.log(c);
          return (
            <Grid is_flex>
              <CommentItem key={c.commentId} {...c}/>
              <Button width='auto' border='none' _onClick={()=>{
                commentDel(c.commentId);
                }}>
                <Text size='24px' margin='0'>X</Text>
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

CommentList.defaultProps = {
  post_id: null
};

export default CommentList;

const CommentItem = (props) => {
  // console.log(props);


  const commentDel = () => {
    const input = window.confirm("댓글을 삭제할까요?");
    if(input) {

    }
  };

  console.log(props);
  return (
    <React.Fragment>
      <Grid is_flex>
        <Grid is_flex width="auto">
          <Image shape="circle"/>
          <Text bold>{props.usernickname}</Text>
        </Grid>
        <Grid is_flex margin="0px 4px">
            <Text margin="0px">{props.comment}</Text>
            <Grid>
              <Text margin="0px">{props.createdAt}</Text>
              {/* <Button width='auto' border='none' _onClick={commentDel}>
                <Text size='24px' margin='0'>X</Text>
              </Button> */}
            </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

CommentItem.defaultProps = {
  user_profile: "https://user-images.githubusercontent.com/91959791/162985545-26ce4013-8004-4211-9948-c616aab0182a.png",
  userNickname: "mean0",
  username: "",
  post_id: 1,
  contents: "맛있어보이네요!",
  createdAt: '2021-01-01 19:00:00'
}