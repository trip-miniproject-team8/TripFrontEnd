import React from 'react';

import { Grid, Text, Input, Button } from '../elements';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { idCheck } from '../shared/common';

const Signup = (props) => {

  const dispatch = useDispatch();

  const [id, setId] = React.useState('');
  const [user_name, setUserName] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [pwd_check, setPwdCheck] = React.useState('');

  const signup = () => {
    if (id === '' | user_name === '' | pwd === '' | pwd_check === '') {
      window.alert('아이디, 패스워드, 닉네임을 모두 입력해주세요!');
      return;
    };

    if (!idCheck(id)) {
      window.alert('아이디 형식이 맞지 않습니다!');
      return;
    }

    if (pwd !== pwd_check) {
      window.alert('패스워드와 패스워드 확인이 일치하지 않습니다!');
      return;
    };
    dispatch(userActions.signupFB(id, pwd, user_name));
  };

  return (
    <React.Fragment>
      <Grid width='95%' padding='16px' margin='auto'>
        <Text bold size="32px">join</Text>
        <Grid padding='16px 0 0'>
          <Input label='ID' placeholder='Enter your ID.' _onChange={(e) => {
            setId(e.target.value);
          }}/>
        </Grid>
        <Grid padding='16px 0 0'>
          <Input label='Nickname' placeholder='Enter your nickname.' _onChange={(e) => {
            setUserName(e.target.value);
          }}/>
        </Grid>
        <Grid padding='16px 0 0'>
          <Input label='Password' type='password' placeholder='Enter your password.' _onChange={(e) => {
            setPwd(e.target.value);
          }}/>
        </Grid>
        <Grid padding='16px 0 25px'>
          <Input label='Password check' type='password' placeholder='Enter your password again.' _onChange={(e) => {
            setPwdCheck(e.target.value);
          }}/>
        </Grid>
        <Button text='sign_up' border='none' bg='#212121' color='#fff'_onClick={() => {
          signup();
        }}></Button>
      </Grid>
    </React.Fragment>
  );
};

Signup.defaultProps = {};

export default Signup;