import React, {  useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../../../layouts/misc/spinner/Spinner';
import * as developerActions from '../../../redux/developer/developer.action';
import * as developerReducer from '../../../redux/developer/developer.reducer';


let DeveloperList =()=>{
       let dispatch = useDispatch();

       useEffect(()=>{
              dispatch(developerActions.fetchAllDeveloper());
       },[]);

       let developerInfo = useSelector((state)=>{
              return state[developerReducer.developerFeaturesKey];
       });
       let { loading , profiles} = developerInfo;

       return(
        <React.Fragment>
              
              <section className="p-3">
                   <div className="container">
                          <div className="row">
                                 <div className="col">
                                          <p className="h4 text-teal">
                                               <i className="fa fa-user-tie" />Developers</p>
                                          <p className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.</p>
                                 </div>
                          </div>
                   </div>
            </section>
           
            <section className="p-3">
              {
                     loading ? <Spinner/> : 
                     <React.Fragment>
                            {
                                   profiles.length > 0 ? 
                                   
                                   <React.Fragment>
                                          <div className="container">
                                          <div className="row">
                                                 <div className="col">
                                                 {
                                                    profiles.map(profile => {
                                                           return(
                                                               <div className="card my-4" key={profile._id}>
                                                               <div className="card-body bg-light-grey">
                                                                      <div className="row">
                                                                             <div className="col-md-2">
                                                                                    <img src={profile.user.avatar} className="imf-fluid img-thumbnail animated jello" alt="" />
                                                                             </div>
                                                                             <div className="col-md-6">
                                                                                    <h2>{profile.user.name}</h2>
                                                                                    <small className="h5">{profile.designation}</small><br/>
                                                                                    <small className="h6">{profile.company}</small><br/>
                                                                                    <small>{profile.location}</small><br/>
                                                                                    <Link to={`/developers/${profile._id}`} className="btn btn-teal btn-sm text-white">View Profile</Link>
                                                                             </div>
                                                                             <div className="col-md-4">
                                                                                    {
                                                                                           profile.skills.length > 0 ? 

                                                                                           <React.Fragment>
                                                                                                {
                                                                                                       profile.skills.map((skill , index) =>{
                                                                                                              return(
                                                                                                                     <div key={index}>
                                                                                                                            <span className="badge badge-success p-1 m-1"><i className="fa fa-check-circle" />{skill}</span><br/>
                                                                                                                     </div>
                                                                                                              )
                                                                                                       })
                                                                                                }
                                                                                           </React.Fragment> : null
                                                                                    }
                                                                             </div>
                                                                      </div>
                                                               </div>
                                                        </div>
                                                           )
                                                    })    
                                                 }
                                                 </div>
                                          </div>
              </div>
                                   </React.Fragment> : null
                            }
                     </React.Fragment>
              }
            </section>
        </React.Fragment>
    )
}
export default DeveloperList;