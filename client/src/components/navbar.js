import React, { useState, useEffect } from 'react';

import { withRouter} from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { FaUniversity, FaLanguage } from 'react-icons/fa';
import { BsGraphUp, BsFillBriefcaseFill } from 'react-icons/bs';
import { AiOutlineSafetyCertificate, AiTwotoneThunderbolt } from 'react-icons/ai';
import { RiLightbulbFlashLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';

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

function Navbar() {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('Final_year/auth');

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
                <Link to="Final_year/profile" className="navlink">
                <ListItem button primary="Profile">
                    <ListItemIcon>
                        <CgProfile />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItem>
                </Link>
                <Link to="Final_year/education" className="navlink">
                <ListItem button primary="Education">
                    <ListItemIcon>
                        <FaUniversity />
                    </ListItemIcon>
                    <ListItemText primary="Education" />
                </ListItem>
                </Link>
                <Link to="Final_year/skills" className="navlink">
                <ListItem button primary="Skills">
                    <ListItemIcon>
                         <RiLightbulbFlashLine />
                    </ListItemIcon>
                    <ListItemText primary="Skills" />
                </ListItem>
                </Link>
                <Link to="Final_year/experiences" className="navlink">
                <ListItem button primary="Experience">
                    <ListItemIcon>
                         <BsFillBriefcaseFill />
                    </ListItemIcon>
                    <ListItemText primary="Experience" />
                </ListItem>
                </Link>
                <Link to="Final_year/projects" className="navlink">
                <ListItem button primary="Projects">
                    <ListItemIcon>
                         <BsGraphUp />
                    </ListItemIcon>
                    <ListItemText primary="Projects" />
                </ListItem>
                </Link>
                <Link to="Final_year/certificates" className="navlink">
                <ListItem button primary="Certificates">
                    <ListItemIcon>
                         <AiOutlineSafetyCertificate />
                    </ListItemIcon>
                    <ListItemText primary="Certificates" />
                </ListItem>
                </Link>
                <Link to="Final_year/languages" className="navlink">
                <ListItem button primary="Language">
                    <ListItemIcon>
                         <FaLanguage />
                    </ListItemIcon>
                    <ListItemText primary="Language" />
                </ListItem>
                </Link>
                <Link to="Final_year/interests" className="navlink">
                <ListItem button primary="Interest">
                    <ListItemIcon>
                         <BsGraphUp />
                    </ListItemIcon>
                    <ListItemText primary="Interest" />
                </ListItem>
                </Link>
                <Link to="Final_year/more" className="navlink">
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

export default withRouter(Navbar)