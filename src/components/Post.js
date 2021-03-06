import React from 'react';
import { Grid, Text, Image, Button } from '../elements';

import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';

// Material ui
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
const options = [
  '수정하기',
  '삭제하기',
];

const ITEM_HEIGHT = 48;

const Post = (props) => {
  const dispatch = useDispatch();
  
  const postSTimeList = props.createdAt.split('T');
  const postSDay = postSTimeList[0].split('-').join('/');
  const postSTime = postSTimeList[1].split(':');
  const time = `${postSDay}\n${postSTime[0]}:${postSTime[1]}`;

  const token = localStorage.getItem('token');

  // material ui
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (option) => {
    console.log('아이콘 확인!!',option);
    if (option==='수정하기'){
      if (props.id) {
        history.push(`/posting/${props.id}`);
      }else {
        history.push(`/posting/${props.postId}`);
      }
    }else if(option==='삭제하기'){
      if (props.id) {
        dispatch(postActions.deletePostFB(props.id));
      }else {
        dispatch(postActions.deletePostFB(props.postId));
      }
    }
    setAnchorEl(null);
  };

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
              <Text>{time}</Text>
              {props.is_me && 
                (<div>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? 'long-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: '20ch',
                    },
                  }}
                >
                  {options.map((option) => (
                    <MenuItem key={option} selected={option === 'Pyxis'} onClick={()=>{handleClose(option)}}>
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>)
                }
            </Grid> 
          </Grid>
          <Grid margin='0 0 0 5px'>  
            <Text>{props.content}</Text>
          </Grid> 
        </Grid>
        <Grid _onClick={() => {
          if (!token) {
            alert("게시물을 확인하려면 로그인이 필요합니다!")
            history.push('/login');
          } else if (!props.postId){
            history.push(`/post/${props.id}`);
            }}}>
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