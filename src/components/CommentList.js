import React from "react";
import {Grid, Image, Text} from "../elements";

const CommentList = () => {
  return (
    <React.Fragment>
      <Grid width='95%' padding='16px' margin='auto'>
        <CommentItem/>
        <CommentItem/>
        <CommentItem/>
        <CommentItem/>
        <CommentItem/>
        <CommentItem/>
      </Grid>
    </React.Fragment>
  );
};

export default CommentList;

const CommentItem = (props) => {

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
            <Text margin="0px">{insert_dt}</Text>
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