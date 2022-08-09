import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import * as userReducer from '../../redux/user/user.reducer';
import * as userActions from '../../redux/user/user.action';




let Navbar = ()=>{
    let dispatch = useDispatch();
    let navigate = useNavigate();

    let userInfo =  useSelector((state)=>{
        return state[userReducer.userFeatresKey];
    });
    let {user} = userInfo;
    let token = localStorage.getItem('social-profile-token');
    
    
    let clickLogout=()=>{
        dispatch(userActions.logoutUSer(navigate));
    }

    let beforeLogin= <React.Fragment>
        <li className="nav-item">
            <Link to='/users/register' className="nav-link">
                <i className="fa fa-sign-out-alt" /> Register</Link>
        </li>
        <li className="nav-item">
            <Link to='/users/login' className="nav-link">
                <i className="fa fa-sign-in-alt" /> Login</Link>
        </li>
    </React.Fragment>


    let AfterLogin= <React.Fragment>
       
        {
            Object.keys(user).length>0 &&
            <React.Fragment>
                <li className="nav-item">
                    <Link to='/post/list'  className="nav-link">
                    <i className="fa fa-list"/> Post</Link>
                </li>
                 <li className="nav-item">
                    <Link to='/dashboard'  className="nav-link">
                    <i className="fa fa-sitemap"/> Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link to='/' className="nav-link"> 
                        {
                            Object.keys(user).length > 0 &&
                            <React.Fragment>
                                    <img src={user.avatar} alt="" width="25px" height="25" className="rounded-circle mx-1"/>
                                    {  user.name}
                            </React.Fragment>
                        }
                    </Link>
                </li>
            </React.Fragment>
        }
         <li className="nav-item">
            <Link to='/' onClick={clickLogout} className="nav-link">
                <i className="fa fa-sign-out-alt" /> Logout</Link>
        </li>
</React.Fragment>




    return(
        <React.Fragment>
           <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <i className="fa fa-code" />Social Profile</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                        <li className="nav-item">
                                <Link to='/developers' className="nav-link">
                                    <i className="fa fa-user-tie" /> Developer</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            
                            {
                                token ? AfterLogin : beforeLogin
                            }
                        </ul>
                    </div>
                    
                </div>
           </nav>
        </React.Fragment>
    )
}
export default Navbar;