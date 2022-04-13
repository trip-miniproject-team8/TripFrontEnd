import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from '../redux/configureStore';
import { apiKey } from "../shared/firebase";
import styled from 'styled-components';

import { Grid, Text} from '../elements';
import { getCookie, deleteCookie } from '../shared/Cookie';
import Permit from '../shared/Permit';

// material-ui
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

const Header = (props) => {

  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const token =localStorage.getItem('token');
  const user_info = useSelector((state) => state.user.user);
  console.log("로그인한 유저정보 :: ",user_info);

  // 여기부터 material-ui code!!
  // login, signup btn code
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const startHandleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);
  const loginBtn = (e) => {
    history.push('/login');
    startHandleClose(e);
  }
  const signupBtn = (e) => {
    history.push('/signup');
    startHandleClose(e);
  }
  // profile code
  const [anchorEl, setAnchorEl] = React.useState(null);
  const profileOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if(is_login && token){
    return (
      <React.Fragment>
        <Grid margin='auto' is_flex>
          <Grid>
            <div></div>
          </Grid>
          <Grid>            
            <Logo href='/' onClick={() => {history.push("/");}}>
              <div></div>
              {/* <img src={"https://user-images.githubusercontent.com/91959791/163001319-d6e449d7-8443-4106-8128-902e93a889f4.png"}/> */}
              {/* <Text bold size='24px' margin='0' onClick={() => {history.push("/");}}>EyeTravel</Text> */}
            </Logo>
          </Grid>
          <Grid is_flex width='auto' padding='50px 30px 0px 0px' margin='0 0 0 100px'>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={profileOpen ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={profileOpen ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={profileOpen}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> {user_info.user_name}
        </MenuItem>
        <Divider />
        <MenuItem onClick={()=>{
            alert("업데이트 준비중입니다!\n조금만 기다려주세요 :)");
          }}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={()=>{
            dispatch(userActions.logoutFB());
          }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {/* <Text size='16px' margin='0'>logout</Text> */}
          Logout
        </MenuItem>
      </Menu>
          </Grid>
          {/* <Button width='auto' margin='10px 20px;' border='none' _onClick={()=>{
            dispatch(userActions.logoutFB());
          }}><Text bold>logout</Text></Button> */}
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid margin='auto' is_flex>
        <Grid>
        </Grid>
        <Grid>
          <Logo href='/' onClick={() => {history.push("/");}}>
          <div></div>
              {/* <img src={"https://user-images.githubusercontent.com/91959791/163001319-d6e449d7-8443-4106-8128-902e93a889f4.png"}/> */}
              {/* <Text bold size='24px' margin='0' onClick={() => {history.push("/");}}>EyeTravel</Text> */}
          </Logo>
        </Grid>
        <Grid is_flex width='auto' padding='50px 30px 0px 0px' margin='0 0 0 100px'>

          <Button
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}>
            START
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}>
                <Paper>
                  <ClickAwayListener onClickAway={startHandleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}>
                      <MenuItem onClick={loginBtn}>Login</MenuItem>
                      <MenuItem onClick={signupBtn}>Signup</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          {/* <Button border='none' _onClick={()=>{
            history.push('/login');
          }}><Text bold>login</Text></Button>
          <Button border='none' margin='10px 20px 10px 10px' _onClick={()=>{
            history.push('/signup');
          }}><Text bold>join</Text></Button> */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Header.defaultProps = {};

const Logo = styled.a`
  text-decoration: none;
  img {
    width: 15%;
  }
  div {
    background-image: url("https://user-images.githubusercontent.com/91959791/163001319-d6e449d7-8443-4106-8128-902e93a889f4.png");
    background-size: cover;
    background-position: center;
    width: 150px;
    height: 150px;
    padding: 0 30px 0px 30px;
    margin: -20px 0 0 0;
  }
`;

export default Header;