import React from "react";
import {Grid, Image, Text, Button} from "../elements";

import {useDispatch, useSelector} from "react-redux";
import {actionCreators as commentActions} from "../redux/modules/comment";

const CommentList = (props) => {
  const dispatch = useDispatch();
  const comment_list = useSelector(state => state.comment.list);
  const {post_id} = props;

  React.useEffect(() => {
    if(!comment_list[post_id]){
      // 코멘트 정보가 없으면 불러오기
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
          return (
            <Grid is_flex>
              <CommentItem key={c.id} {...c}/>
              <Button width='auto' border='none' _onClick={()=>{
                commentDel(c.id);
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


  const commentDel = () => {
    const input = window.confirm("댓글을 삭제할까요?");
    if(input) {

    }
  };

  const {user_profile, user_name, user_id, post_id, contents, insert_dt} = props;
  return (
    <React.Fragment>
      <Grid is_flex>
        <Grid is_flex width="auto">
          <Image shape="circle"/>
          <Text bold>{user_name}</Text>
        </Grid>
        <Grid is_flex margin="0px 4px">
            <Text margin="0px">{contents}</Text>
            <Grid>
              <Text margin="0px">{insert_dt}</Text>
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
  user_profile: "",
  user_name: "mean0",
  user_id: "",
  post_id: 1,
  contents: "맛있어보이네요!",
  insert_dt: '2021-01-01 19:00:00'
}