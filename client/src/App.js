import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import './App.css';
import {Provider} from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";


import store from './redux/store';
import Navbar from './components/navbar';

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";

import Profile from './components/profile';
import Interest from './components/interests';
import Experience from './components/experience';
import Skills from './components/skills';
import Education from './components/education';
import Projects from './components/projects';
import Certificates from './components/certificates';
import Languages from './components/languages';
import Dashboard from './components/dashboard';
import Auth from './components/Auth/auth';
import Footer from './components/footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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
    <BrowserRouter basename="/Final_year">
    <div class="App">
      <div className={classes.root}>
        <CssBaseline />
        <Navbar></Navbar>
        <main className={classes.content}>
          <Toolbar />
          <Switch>
            <Route exact path="/auth" render={()=> <Auth></Auth>} />
          </Switch>

          <Route exact path="/" render={()=> <Dashboard></Dashboard>} />
          <Route exact path="/profile" render={()=> <Profile></Profile>} />
          <Route path="/education" render={()=>  <Education></Education>} />
          <Route path="/skills" render={()=>  <Skills></Skills>} />
          <Route path="/experiences" render={()=>  <Experience></Experience>} />
          <Route path="/projects" render={()=>  <Projects></Projects>} />
          <Route path="/certificates" render={()=>  <Certificates></Certificates>} />
          <Route path="/languages" render={()=>  <Languages></Languages>} />
          <Route path="/interests" render={()=>  <Interest></Interest>} />
          <ToastContainer   />
          
        </main>
      </div>
    </div>
    </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;
