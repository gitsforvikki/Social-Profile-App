import React, { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import * as userActions from '../../../redux/user/user.action';
import * as alertAction from '../../../redux/alert/alert.action';



let UserRegister = ()=>{

    let dispatch = useDispatch();
    let navigate=useNavigate();

    let [user , setUser] = useState({
        name :'',
        email:'',
        password:''
    });
    let [userError , setUserError] = useState({
        nameError :'',
        emailError:'',
        passwordError:''
    });
    

    let validateUsername=(event)=>{
        setUser({...user , name : event.target.value});
        let regExp = /^[a-zA-Z0-9 ]{4,15}$/;
        !regExp.test(event.target.value) ?
        setUserError({...userError , nameError:'Enter a proper name'}) : 
        setUserError({...userError , nameError : ''});
    };

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

    let submitRegister=(e)=>{
        e.preventDefault();
        if(user.name !=='' && user.email !=='' &&  user.password !==''){
            dispatch(userActions.userRegister(user , navigate));
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
                           <p className="h3 text-teal"><i className="fa fa-user-shield" />Registration</p>
                           <p className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                       </div>
                   </div>
                   <div className="row">
                       <div className="col-md-8">
                           <form onSubmit={submitRegister}>
                               <div className="form-group">
                                   <input
                                   name='name'
                                   value={user.name}
                                   onChange={validateUsername}
                                   type="text"  className={`form-control ${userError.nameError.length > 0 ? 'is-invalid' : ''}`}  placeholder="Enter Name" />
                               </div>
                               <div className="form-group">
                                   <input 
                                   name='email'
                                   value={user.email}
                                   onChange={validateEmail}
                                   type="email"  className={`form-control ${userError.emailError.length > 0 ? 'is-invalid' : ''}`} placeholder="Enter Email" />
                               </div>
                               <div className="form-group">
                                   <input 
                                   name='password'
                                   value={user.password}
                                   onChange={validatePassword}
                                   type="password"  className={`form-control ${userError.passwordError.length > 0 ? 'is-invalid' : ''}`} placeholder="Enter Password" />
                               </div>
                               <input  type="submit"  className="btn btn-teal text-white btn-sm" value="Register"/><br/>
                               <small>Already have a account? <Link to='/users/login' className="text-teal ">Login</Link> </small>
                           </form>
                       </div>
                   </div>
               </div>
           </section>
          
        </React.Fragment>
    )
};

export default UserRegister;