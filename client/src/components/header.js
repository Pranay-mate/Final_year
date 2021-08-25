import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";

import decode from 'jwt-decode';
import * as actionType from '../redux/auth/authTypes.js';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      background : 'black',
      color: 'white',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0px 10px',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth
    },
    drawerContainer: {
      overflow: "auto"
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    profile: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'fixed',
        right: '1em',
        marginLeft: 'auto',
        height: '2.5em'
      },
      image: {
        marginLeft: '15px',
      },
  }));

const Header = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
         <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
            <Typography variant="h6" noWrap>
              <Link to='/' className="brand-Logo">
                  AI Resume
              </Link>
            </Typography>
            {user?.result ? (
              <div className={classes.profile} style={{width: '300px'}}>
                <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                <Typography variant="h6" className="UserName_header" >{user?.result.name}</Typography>
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
              </div>
            ) : (
              <div className={classes.profile}>
                <Link to="/auth" >
                  <Button  variant="contained" color="primary">Sign In</Button>
                </Link>
              </div>

            )}
            </Toolbar>
        </AppBar>
  );
};

export default Header;