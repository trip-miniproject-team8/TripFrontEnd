import React, { useState } from "react";
import { Text, Input, Grid, Button } from "../elements";
import {getCookie,setCookie,deleteCookie} from "../shared/Cookie";
import {useDispatch} from "react-redux";
import {actionCreators as userActions} from "../redux/modules/user";
 
import { emailCheck } from "../shared/common";
const Login = (props) => {

    const [id,setId]=useState('');
    const [pwd,setPwd]=useState('');

    const dispatch=useDispatch();
    // const disable=true;
    const login = () =>{
      console.log(id);
      
     
      if(id===""||pwd==="")
        {
            
            window.alert("아이디 혹은 비밀번호가 없슴");
            return;
        }
      if (!emailCheck(id))
      {
        window.alert("이메일형식이 아님");
        return;

      }

        dispatch(userActions.LoginFB(id,pwd));
    };
    
    
  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          로그인
        </Text>

        <Grid padding="16px 0px">
          <Input
            label="아이디"
            placeholder="아이디를 입력해주세요."
            _onChange={(e) => {
                setId(e.target.value);
              }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            type="password"
            label="패스워드"
            placeholder="패스워드 입력해주세요."
            _onChange={(e) => {
                setPwd(e.target.value);
              }}
          />
        </Grid>

        <Button
        //   disabled={(id===""||pwd==="")}
          text="로그인하기"
          _onClick={() => {
            login();
            console.log("로그인 했어!");
            return false;
          }}
        ></Button>
      </Grid>
    </React.Fragment>
  );
};

export default Login;