import React, { useState, useEffect } from 'react';

import { BrowserRouter, Route,  withRouter, Switch } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import Icon from "awesome-react-icons";
import { FiAirplay } from "react-icons/fi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, language, lightbulb } from '@fortawesome/free-solid-svg-icons';
import { FaUniversity, FaLanguage } from 'react-icons/fa';
import { BsGraphUp, BsFillBriefcaseFill } from 'react-icons/bs';
import { BiCertification} from 'react-icons/bi';
import { AiOutlineSafetyCertificate, AiTwotoneThunderbolt } from 'react-icons/ai';
import { RiLightbulbFlashLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { FcIdea } from 'react-icons/fc';
import { compose } from "redux";
import { withStyles } from "@material-ui/styles";
import { Avatar, Button } from '@material-ui/core';

import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import decode from 'jwt-decode';

import * as actionType from '../redux/auth/authTypes.js';
import Header from './header'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background : 'black',
    color: 'white'
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
  }
}));

function Navbar_3() {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

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
    <div className="navigation">
        {/* <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
            <Typography variant="h6" noWrap>
              <Link to='/'>
                  AI Resume
              </Link>
            </Typography>
            {user?.result ? (
              <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="contained" color="primary">Sign In</Button>
              </Link>
            )}
           
            </Toolbar>
        </AppBar> */}
        <Header></Header>
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
            paper: classes.drawerPaper
            }}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
            <List>
                <Link to="/profile">
                <ListItem button primary="Profile">
                    <ListItemIcon>
                        <CgProfile />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItem>
                </Link>
                <Link to="/education">
                <ListItem button primary="Education">
                    <ListItemIcon>
                        <FaUniversity />
                    </ListItemIcon>
                    <ListItemText primary="Education" />
                </ListItem>
                </Link>
                <Link to="/skills">
                <ListItem button primary="Skills">
                    <ListItemIcon>
                         <RiLightbulbFlashLine />
                    </ListItemIcon>
                    <ListItemText primary="Skills" />
                </ListItem>
                </Link>
                <Link to="/experince">
                <ListItem button primary="Experience">
                    <ListItemIcon>
                         <BsFillBriefcaseFill />
                    </ListItemIcon>
                    <ListItemText primary="Experience" />
                </ListItem>
                </Link>
                <Link to="/projects">
                <ListItem button primary="Projects">
                    <ListItemIcon>
                         <BsGraphUp />
                    </ListItemIcon>
                    <ListItemText primary="Projects" />
                </ListItem>
                </Link>
                <Link to="/certificates">
                <ListItem button primary="Certificates">
                    <ListItemIcon>
                         <AiOutlineSafetyCertificate />
                    </ListItemIcon>
                    <ListItemText primary="Certificates" />
                </ListItem>
                </Link>
                <Link to="/languages">
                <ListItem button primary="Language">
                    <ListItemIcon>
                         <FaLanguage />
                    </ListItemIcon>
                    <ListItemText primary="Language" />
                </ListItem>
                </Link>
                <Link to="/interests">
                <ListItem button primary="Interest">
                    <ListItemIcon>
                         <BsGraphUp />
                    </ListItemIcon>
                    <ListItemText primary="Interest" />
                </ListItem>
                </Link>
                <Link to="/more">
                <ListItem button primary="More">
                    <ListItemIcon>
                         <AiTwotoneThunderbolt />
                    </ListItemIcon>
                    <ListItemText primary="More" />
                </ListItem>
                </Link>
            </List>
            <Divider />
            </div>
        </Drawer>
      </div>
  );
}

export default withRouter(Navbar_3)