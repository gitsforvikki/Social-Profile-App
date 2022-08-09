import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import * as userReducer from '../../../redux/user/user.reducer';
import * as profileActions from '../../../redux/profile/profile.action';
import * as profileReducer from '../../../redux/profile/profile.reducer';
import Spinner from '../../../layouts/misc/spinner/Spinner';


let Dashboard = ()=>{

    let dispatch = useDispatch();

    let userInfo = useSelector((state)=>{
        return state[userReducer.userFeatresKey]
    });

    let {user} = userInfo;

    useEffect(()=>{
        dispatch(profileActions.getProfile());
    },[]);
    let profileInfo = useSelector((state)=>{
        return state[profileReducer.profileFeaturesKey]
    });

    let { loading , profile} = profileInfo;

    // click to delete experience

    let ClickDeleteExperience=(experienceId)=>{
        dispatch(profileActions.deleteExperience(experienceId));
    }
     // click to delete education
    let clickDeleteEducation=(educationId)=>{
        dispatch(profileActions.deleteEducation(educationId));
    }
   
    return(
        <React.Fragment>
           <section className="p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h2 text-teal font-weight-bold"> <i className="fa fa-sitemap"/>Dashboard</p>
                            <p  className="h3">{`Welcome ${user ? user.name : ''}`}</p>
                        </div>
                    </div>
                </div>
           </section>
           {
               loading ? <Spinner/> : 
               <section className="p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                           {
                               Object.keys(profile).length >0 ?

                               <React.Fragment>
                                    <section >
                                        <Link to ='/profiles/edit-profiles' className="btn bg-light-grey text-teal btn-sm">
                                            <i className="fa fa-user-shield"/> Edit Profile</Link>
                                        <Link to ='/profiles/add-experience' className="btn bg-light-grey text-teal btn-sm">
                                        <i className="fa fa-user-tie"/>Add Experience</Link>
                                        <Link to ='/profiles/add-education' className="btn bg-light-grey text-teal btn-sm">
                                        <i className="fa fa-graduation-cap"/>Add Education</Link>
                                    </section>

                                     {/* ............experience details............ */}
                                    <section className="mt-4">
                                        {
                                            profile.experience.length > 0 &&

                                            <div className="container">
                                            <div className="row">
                                                <div className="col">
                                                    <p className="h4">Experience Details</p>
                                                    <table className="table text-center table-hover table-striped  table-light ">
                                                        <thead className="bg-teal text-white">
                                                            <tr>
                                                                <th>Title</th>
                                                                <th>Company</th>
                                                                <th>Location</th>
                                                                <th>From</th>
                                                                <th>TO</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                profile.experience.map(exp =>{
                                                                    return(
                                                                        <React.Fragment key={exp._id}>
                                                                            <tr >
                                                                                <td>{exp.title}</td>
                                                                                <td>{exp.company}</td>
                                                                                <td>{exp.location}</td>
                                                                                <td>{exp.from}</td>
                                                                                <td>{exp.to}</td>
                                                                                <td>
                                                                                    <button  onClick={ClickDeleteExperience.bind(this , exp._id)} className="btn btn-danger btn-sm">Delete</button>
                                                                                </td>
                                                                            </tr>
                                                                        </React.Fragment>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        }
                                    </section>


                                    {/* ...............education details ................. */}
                                    <section className="mt-4">
                                    {
                                            profile.education.length > 0 &&

                                            <div className="container">
                                            <div className="row">
                                                <div className="col">
                                                    <p className="h4">Education Details</p>
                                                    <table className="table text-center table-hover table-striped  table-light ">
                                                        <thead className="bg-teal text-white">
                                                            <tr>
                                                                <th>School</th>
                                                                <th>Degree</th>
                                                                <th>Fiels of study</th>
                                                                <th>From</th>
                                                                <th>TO</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                profile.education.map(edu =>{
                                                                    return(
                                                                        <React.Fragment key={edu._id}>
                                                                            <tr >
                                                                                <td>{edu.school}</td>
                                                                                <td>{edu.degree}</td>
                                                                                <td>{edu.fieldOfEducation}</td>
                                                                                <td>{edu.from}</td>
                                                                                <td>{edu.to}</td>
                                                                                <td>
                                                                                    <button onClick={clickDeleteEducation.bind(this , edu._id)} className="btn btn-danger btn-sm">Delete</button>
                                                                                </td>
                                                                            </tr>
                                                                        </React.Fragment>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        }
                                    </section>
                                </React.Fragment> : 
                               <React.Fragment>
                                   <Link to ='/profiles/create-profile' className="btn btn-light text-teal btn-sm">
                                   <i className="fa fa-user-cog"/>Create Profile</Link>
                               </React.Fragment>
                           }

                                       
                        </div>
                    </div>
                </div>
           </section>
           }
           <div style={{marginBottom:'150px'}}/>
        </React.Fragment>
    )
};

export default Dashboard;