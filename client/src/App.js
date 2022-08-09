import React, { useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import {BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Navbar from './layouts/navbar/Navbar';
import Home from './layouts/home/Home';
import DeveloperList from './modules/developers/developer-list/DeveloperList';
import DeveloperDetails from './modules/developers/developer-details/DeveloperDetails';
import UserRegister from './modules/user/user-register/UserRegister';
import UserLogin from './modules/user/user-login/UserLogin';
import Alert from './layouts/misc/alert/Alert';
import Dashboard from './modules/profile/dashboard/Dashboard';
import CreateProfile from './modules/profile/create-profile/CreateProfile';
import EditProfile from './modules/profile/edit-profile/EditProfile';
import AddEducation from './modules/profile/add-education/AddEducation';
import AddExperience from './modules/profile/add-experience/AddExperience'
import PostList from './modules/post/post-list/PostList';
import PostDetails from './modules/post/post-details/PostDetails';
import * as userActions from './redux/user/user.action';
import  PrivateRoute  from './util/PrivateRoute';


let  App = ()=> {
  let dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(userActions.getUser());
  },[]);

  
  
  return (
   <React.Fragment>
    <Router>
      <Navbar/>
      <Alert/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/developers"  element={<DeveloperList/>} />
        <Route path="/developers/:developerId"  element={<PrivateRoute> <DeveloperDetails/></PrivateRoute>} />
        <Route path='/users/register' element={<UserRegister/>} />
        <Route path='/users/login' element={<UserLogin/>} />
        <Route path='/dashboard' element={<PrivateRoute> <Dashboard/></PrivateRoute>} />
        <Route path='/profiles/edit-profiles' element={<PrivateRoute> <EditProfile/></PrivateRoute>} />
        <Route path='/profiles/create-profile' element={<PrivateRoute> <CreateProfile/></PrivateRoute>} />
        <Route path='/profiles/add-experience' element={<PrivateRoute> <AddExperience/></PrivateRoute>} />
        <Route path='/profiles/add-education' element={<PrivateRoute> <AddEducation/></PrivateRoute>} />
        <Route path='/post/list' element={<PrivateRoute> <PostList/></PrivateRoute>} />
        <Route path='/post/:postId' element={<PrivateRoute> <PostDetails/></PrivateRoute>} />
       
      </Routes>
    </Router>
   </React.Fragment>
  );
}

export default App;
