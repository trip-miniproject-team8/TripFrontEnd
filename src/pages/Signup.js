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
      window.alert('아이디, 비밀번호, 닉네임을 모두 입력해주세요!');
      return;
    };

    // if (!idCheck(id)) {
    //   window.alert('아이디 형식이 맞지 않습니다!');
    //   return;
    // }

    if (pwd !== pwd_check) {
      window.alert('비밀번호와 비밀번호 확인이 일치하지 않습니다!');
      return;
    };
    dispatch(userActions.signupFB(id, user_name, pwd,pwd_check));
  };

  return (
    <React.Fragment>
      <Grid width='95%' padding='16px' margin='auto'>
        <Text bold size="32px">join</Text>
        <Grid padding='16px 0 0'>
          <Input label='아이디' placeholder='아이디는 3~9자의 영소문자, 숫자만 사용가능합니다' _onChange={(e) => {
            setId(e.target.value);
          }}/>
        </Grid>
        <Grid padding='16px 0 0'>
          <Input label='닉네임' placeholder='닉네임은 특수문자를 제외한 2~10자로 입력해주세요' _onChange={(e) => {
            setUserName(e.target.value);
          }}/>
        </Grid>
        <Grid padding='16px 0 0'>
          <Input label='비밀번호' type='password' placeholder='비밀번호는 8~12자의 영소문자, 숫자만 사용가능합니다' _onChange={(e) => {
            setPwd(e.target.value);
          }}/>
        </Grid>
        <Grid padding='16px 0 25px'>
          <Input label='비밀번호 확인' type='password' placeholder='비밀번호를 한번더 입력해주세요' _onChange={(e) => {
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