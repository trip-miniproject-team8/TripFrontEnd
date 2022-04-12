import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import {useDispatch} from "react-redux";
import {actionCreators as userActions} from "../redux/modules/user";

import {apiKey} from "./firebase";

import PostList from '../pages/PostList';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Header from '../components/Header';
import { Grid, Button } from '../elements';
import Permit from './Permit';
import PostWrite from '../pages/PostWrite';
import PostDetail from '../pages/PostDetail';
// import Notification from '../pages/Notification';
import { resp } from './Request';

function App() {
  const dispatch = useDispatch();
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  React.useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
    console.log(resp);
    console.log(resp.result[0]);
  }, []);
  
  return (
    <React.Fragment>
      <Grid>
        <Header></Header>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/posting" exact component={PostWrite}/>
          <Route path="/posting/:id" exact component={PostWrite}/>
          <Route path="/post/:id" exact component={PostDetail} />
          {/* <Route path="/noti" exact component={Notification}/> */}
        </ConnectedRouter>
      </Grid> 
      <Permit>
        <Button is_float text='+' _onClick={() => {history.push('/posting');}}></Button>
      </Permit>
    </React.Fragment>
    );
}

export default App;
