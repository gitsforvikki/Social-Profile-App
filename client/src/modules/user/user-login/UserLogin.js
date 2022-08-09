import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as userActions from '../../../redux/user/user.action';
import * as alertAction from '../../../redux/alert/alert.action';

let UserLogin = ()=>{

    let navigate = useNavigate();
    let dispatch = useDispatch();

    let [user , setUser] = useState({
        email:'',
        password:''
    });
    let [userError , setUserError] = useState({
        emailError:'',
        passwordError:''
    });
    

    let validateEmail=(event)=>{
        setUser({...user , email : event.target.value});
        let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        !regExp.test(event.target.value) ?
        setUserError({...userError , emailError:'Enter a proper email'}) : 
        setUserError({...userError , emailError : ''});
    };

    let validatePassword=(event)=>{
        setUser({...user , password :event.target.value });
        let regExp = /^[A-Za-z]\w{7,14}$/;
        !regExp.test(event.target.value)?
        setUserError({...userError , passwordError:'Enter a proper Password'}) : 
        setUserError({...userError , passwordError : ''});

    };

    let submitLogin =(e)=>{
        e.preventDefault();
        if(user.email !=='' &&  user.password !==''){
            dispatch(userActions.userLogin(user , navigate));
        }
        else{
            dispatch(alertAction.setAlert('Please fillout the fields','danger'));
        }
    }
     
    
    
    return(
        <React.Fragment>
        <section className="p-3">
            <div className="container animated zoomIn">
                <div className="row">
                    <div className="col">
                        <p className="h3 text-teal"><i className="fa fa-sign-in-alt" />Login</p>
                        <p className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <form onSubmit={submitLogin}>
                            <div className="form-group">
                                <input 
                                name='email'
                                value={user.email}
                                onChange={validateEmail}
                                type="email" className={`form-control ${userError.emailError.length > 0 ? 'is-invalid' : ''}`} placeholder="Enter Email" />
                            </div>
                            <div className="form-group">
                                <input
                                name='password'
                                value={user.password}
                                onChange={validatePassword}
                                type="password" className={`form-control ${userError.passwordError.length > 0 ? 'is-invalid' : ''}`} placeholder="Enter Password" />
                            </div>
                            <input type="submit"  className="btn btn-teal text-white btn-sm" value="Login"/><br/>
                            <small>Don't have an account? <Link to='/users/register' className="text-teal ">Register</Link> </small>
                        </form>
                    </div>
                </div>
            </div>
        </section>
     </React.Fragment>
    )
};

export default UserLogin;