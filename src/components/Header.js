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
        <Grid width='95%' padding='16px' margin='auto' is_flex>
          <Grid>
            <Logo href='/' onClick={() => {history.push("/");}}>
              <Text bold size='24px' margin='0' onClick={() => {history.push("/");}}>EyeTravel</Text>
            </Logo>
          </Grid>
          <Button width='40%' margin='10px 0;' text='logout' _onClick={()=>{
            dispatch(userActions.logoutFB());
          }}></Button>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid width='95%' padding='16px' margin='auto' is_flex>
        <Grid>
          <Logo href='/' onClick={() => {history.push("/");}}>
            <Text bold size='24px' margin='0' onClick={() => {history.push("/");}}>EyeTravel</Text>
          </Logo>
        </Grid>
        <Grid is_flex>
          <Button text='login' margin='10px' _onClick={()=>{
            history.push('/login');
          }}></Button>
          <Button text='join' _onClick={()=>{
            history.push('/signup');
          }}></Button>
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