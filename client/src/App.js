import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import './App.css';
import {Provider} from 'react-redux';
import { BrowserRouter, Route, Link, withRouter, Switch } from "react-router-dom";


import store from './redux/store';
import Navbar from './components/navbar';
import ClippedDrawer from './components/navbar_2';

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

import Navbar_3 from './components/navbar_3';
import Profile from './components/profile';
import Interest from './components/interests';
import Experience from './components/experience';
import Skills from './components/skills';
import Education from './components/education';
import Projects from './components/projects';
import Certificates from './components/certificates';
import Languages from './components/languages';
import Interests from './components/interests';
import Home from './components/home';
import Auth from './components/Auth/auth';




const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
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

function App() {
  const classes = useStyles();

  return (
    <>
    
    <Provider store={store}>
    <BrowserRouter>
    <div class="App">
      <div className={classes.root}>
        <CssBaseline />
        <Navbar_3></Navbar_3>
        <main className={classes.content}>
          <Toolbar />
          <Switch>
            <Route exact path="/" render={()=> <Home></Home>} />
            <Route exact path="/auth" render={()=> <Auth></Auth>} />
          </Switch>

          <Route exact path="/profile" render={()=> <Profile></Profile>} />
          <Route path="/education" render={()=>  <Education></Education>} />
          <Route path="/skills" render={()=>  <Skills></Skills>} />
          <Route path="/experiences" render={()=>  <Experience></Experience>} />
          <Route path="/projects" render={()=>  <Projects></Projects>} />
          <Route path="/certificates" render={()=>  <Certificates></Certificates>} />
          <Route path="/languages" render={()=>  <Languages></Languages>} />
          <Route path="/interests" render={()=>  <Interest></Interest>} />
          
        </main>
      </div>
    </div>
    </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;
