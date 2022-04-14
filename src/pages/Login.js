import React from 'react';
import { useDispatch } from "react-redux";
import {actionCreators as userActions} from "../redux/modules/user";

import { Grid, Text, Input, Button } from '../elements';
import { getCookie, setCookie, deleteCookie } from '../shared/Cookie';
import { idCheck } from '../shared/common';

const Login = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = React.useState('');
  const [pwd, setPwd] = React.useState('');

  const login = () => {
    if (id === '' || pwd === '') {
      window.alert('아이디와 비밀번호를 모두 입력해주세요!');
      return;
    }

    if (!idCheck(id)) {
      window.alert('아이디 형식이 맞지 않습니다!');
      return;
    }
    console.log('로그인!')
    dispatch(userActions.loginFB(id, pwd));
  };
  return (
    <React.Fragment>
      <Grid width='95%' padding='16px' margin='auto'>
        <Text bold size="32px">login</Text>
        <Grid padding='16px 0 0'>
          <Input label='아이디' placeholder='아이디를 입력해주세요.' _onChange={(e) => {
            setId(e.target.value);
          }}/>
        </Grid>
        <Grid padding='16px 0 25px'>
          <Input label='비밀번호' type='password' placeholder='비밀번호를 입력해주세요.' _onChange={(e) => {
            setPwd(e.target.value);
          }}/>
        </Grid>
        <Button text='log_in' border='none' bg='#212121' color='#fff'_onClick={() => {
          console.log('로그인했어!');
          login();
        }}></Button>
      </Grid>
    </React.Fragment>
  );
}

Login.defaultProps = {};

export default Login;