import { BrowserRouter as Router } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from  'react-redux';
import {fetchUser} from './actions/authActions'
import { fetchProjectCodes, fetchUserList, fetchProjects} from './actions/dashboardActions'
import MobileNav from './components/MobileNav';
import Navbar from './components/Navbar';
import Login from './components/Login';
import LoadingScreen from './components/LoadingScreen';
import MainRoute from './routes';
import './config/firebaseconfig';
import './css/base.css';
import './css/dashboard.css';


function App() {
  let auth = useSelector(({ auth }) => auth);
  var dispatch = useDispatch();
  useEffect(() => {
    fetchUser(dispatch)
  }, []);
  useEffect(() => {
    fetchProjectCodes(dispatch);
  }, []);
  useEffect(() => {
    fetchUserList(dispatch);
  }, []);
  useEffect(() => {
    fetchProjects(dispatch);
  }, []);
  

  if (auth) {
    return (
      <Router>
        <div className="container h-100 my-5">
        <div className="row">
          <Navbar user = {auth} />
          <div className="col-lg-9 pt-lg-1 right-col">
            <MainRoute user = {auth}/>
          </div>
          <MobileNav />
        </div>
      </div>
      </Router>
      
    )
  }
  if (auth == false) {
    return (
      <Login />
    )
  }


  return (
    <LoadingScreen />
  );
}

export default App;
