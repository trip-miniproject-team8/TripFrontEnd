import React from 'react';
import {Grid, Text, Button, Image, Input} from '../elements';
import Upload from '../shared/Upload';

import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import { actionCreators as imageActions } from "../redux/modules/image";

import { apis } from '../shared/api';
import axios from 'axios';
import api from '../shared/Request';
const PostWrite = (props) => {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);

  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;
  
  const {history} = props;

  const _post = is_edit ? post_list.find((p) => p.id == post_id) : null;
  // console.log(post_id);
  const [contents, setContents] = React.useState(_post ? _post.content : '');

  const [newPostId, setNewPostId]= React.useState('');
  React.useEffect(() => {
    if (is_edit && !_post) {
      console.log("포스트 정보가 없어요!");
      // alert("포스트 정보가 없어요!");
      history.goBack();

      return;
    } 
    if (is_edit) {
      dispatch(imageActions.setPreview(_post.imageUrl));
    }

  },[]);

  const changeContents = (e) => {
    setContents(e.target.value);
  }

  const addPost = () => {

    console.log(contents);
    api.put(`/api/post/${newPostId}`,{content:contents},{
      headers:{  
        'Content-Type' : 'application/json',  
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }})
    .then((res)=>{
      console.log(contents);
      console.log(res);
    })
    .catch((error)=>{
      console.log(error.response.data.errorMessage);
        console.log(error.response.status);
        console.log(error.response.headers);
        console.log(error.response.data);
        window.alert(error.response.data.errorMessage);
    })
    dispatch(postActions.addPostFB(contents));
    alert("작성되었습니다!")
    history.replace('/');
    window.location.reload();
  }

  const editPost = () => {

    dispatch(postActions.editPostFB(post_id, {contents: contents}));
  }

  if (!token) {
    return (
      <React.Fragment>
        <Grid width='95%' padding='16px' margin='100px auto' center>
          <Text size='32px' bold>앗! 잠깐!</Text>
          <Text size='16px'>로그인 후에만 글을 쓸 수 있어요!</Text>
          <Button bg='#212121' color='white' _onClick={() => {
            history.replace('/login');
          }}>로그인 하러가기</Button>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid maxWidth='500px' padding='16px' margin='auto'>
      <Grid padding='16px'>
        {is_edit ?(<Upload post_id={post_id} is_edit setNewPostId={setNewPostId}/>):(<Upload setNewPostId={setNewPostId}/>)}
      </Grid>
      <Grid>
        <Grid>
          <Image shape='rectangle' src={preview ? preview : "https://user-images.githubusercontent.com/91959791/162676899-be6a11b1-d103-4d57-89b8-34db876fad6f.png"}/>
        </Grid>
        <Grid padding='16px 0 13px'>
          <Input value={contents} _onChange={changeContents} placeholder='게시글 작성' multiLine/>
        </Grid>
        <Grid padding='0 0 15px'>
          {is_edit ? (
          <Button text="게시글 수정" border='none' bg='#212121' color='#fff' _onClick={addPost}></Button>
          ) : (
          <Button text="게시글 작성" border='none' bg='#212121' color='#fff' _onClick={addPost}></Button>
          )}
        </Grid>
	    </Grid>	
      </Grid>
    </React.Fragment>
  );
}

export default PostWrite;