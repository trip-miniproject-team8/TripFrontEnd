import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from '../redux/configureStore';
import { apiKey } from "../shared/firebase";
import styled from 'styled-components';

import { Grid, Text, Button } from '../elements';
import { getCookie, deleteCookie } from '../shared/Cookie';
// import Permit from '../shared/Permit';

const Header = (props) => {
  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user.is_login);
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;
  console.log(is_session);

  if(is_login && is_session){
    return (
      <React.Fragment>
        <Grid margin='auto' is_flex>
          <Grid padding='24px'>
            <Logo href='/' onClick={() => {history.push("/");}}>
              <Text bold size='24px' margin='0' onClick={() => {history.push("/");}}>EyeTravel</Text>
            </Logo>
          </Grid>
          <Button width='auto' margin='10px 20px;' border='none' _onClick={()=>{
            dispatch(userActions.logoutFB());
          }}><Text bold>logout</Text></Button>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid margin='auto' is_flex>
        <Grid padding='24px'>
          <Logo href='/' onClick={() => {history.push("/");}}>
            <Text bold size='24px' margin='0' onClick={() => {history.push("/");}}>EyeTravel</Text>
          </Logo>
        </Grid>
        <Grid is_flex width='auto'>
          <Button border='none' _onClick={()=>{
            history.push('/login');
          }}><Text bold>login</Text></Button>
          <Button border='none' margin='10px 20px 10px 10px' _onClick={()=>{
            history.push('/signup');
          }}><Text bold>join</Text></Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Header.defaultProps = {};

const Logo = styled.a`
  text-decoration: none;
`;

export default Header;