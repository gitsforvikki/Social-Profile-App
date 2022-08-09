import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as profileActions from '../../../redux/profile/profile.action';

let CreateProfile = ()=>{

    let dispatch = useDispatch();

    let [localProfile , setLocalProfile] = useState({
        company : '',
        website:'',
        location:'',
        designation:'',
        skills:'',
        bio:'',
        githubUserName:'',
        youtube:'',
        facebook:'',
        linkedin:'',
        twitter :'',
        instagram:''

});


    let updateInput =(event)=>{
        setLocalProfile({
            ...localProfile,
            [event.target.name] : event.target.value
        })
    };

    let submitCreateProfile=(e)=>{
        e.preventDefault();
        dispatch(profileActions.CreateProfile(localProfile ));
    }

    return(
        <React.Fragment>
            <pre>{JSON.stringify(localProfile)}</pre>
             <section className="p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-teal font-weight-bold"><i className="fa fa-user-circle" />Create Profile</p>
                            <p className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry.  scrambled it to make a type specimen book. It has survived not only five centuries,</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="p-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <form onSubmit={submitCreateProfile}>
                                <div className="form-group">
                                    <input 
                                    name="company"
                                    value={localProfile.company}
                                    onChange={updateInput}
                                    required
                                    type ="text"  className="form-control" placeholder="company"/>
                                </div>
                                <div className="form-group">
                                    <input 
                                    name="website"
                                    value={localProfile.website}
                                    onChange={updateInput}
                                    required
                                    type ="text"  className="form-control" placeholder="website"/>
                                </div>
                                <div className="form-group">
                                    <input 
                                    name="location"
                                    value={localProfile.location}
                                    onChange={updateInput}
                                    required
                                    type ="text"  className="form-control" placeholder="location"/>
                                </div>
                                <div className="form-group">
                                   <select 
                                   name="designation"
                                   value={localProfile.designation}
                                   onChange={updateInput}
                                   required
                                   className="form-control">
                                            <option value="">Select Designation</option>
                                            <option value="Junior Developer">Junior Developer</option>
                                            <option value="Senior Developer">Senior Developer</option>
                                            <option value="Tech Lead">Tech Lead</option>
                                            <option value="Junior Manager">Junior Manager</option>
                                            <option value="Senior Manager">Senior Manager</option>
                                            <option value="Director">Director</option>
                                   </select>
                                </div>
                                <div className="form-group">
                                    <input 
                                    name="skills"
                                    value={localProfile.skills}
                                    onChange={updateInput}
                                    required
                                    type ="text"  className="form-control" placeholder="skill"/>
                                </div>
                                <div className="form-group">
                                    <textarea 
                                    name="bio"
                                    value={localProfile.bio}
                                    onChange={updateInput}
                                    required
                                    rows="3" className="form-control" placeholder="Job Description"/>
                                </div>
                                <div className="form-group">
                                    <input 
                                    name="githubUserName"
                                    value={localProfile.githubUserName}
                                    onChange={updateInput}
                                    required
                                    type ="text"  className="form-control" placeholder="github Username"/>
                                </div>
                                <hr/>
                                            <small>Social Links</small>
                                <div className="form-group">
                                    <input
                                    name="youtube"
                                    value={localProfile.youtube}
                                    onChange={updateInput}
                                    required
                                    type ="text"  className="form-control" placeholder="Youtube"/>
                                </div>

                                <div className="form-group">
                                    <input 
                                    name="facebook"
                                    value={localProfile.facebook}
                                    onChange={updateInput}
                                    required
                                    type ="text"  className="form-control" placeholder="facebook"/>
                                </div>
                                <div className="form-group">
                                    <input 
                                    name="linkedin"
                                    value={localProfile.linkedin}
                                    onChange={updateInput}
                                    required
                                    type ="text"  className="form-control" placeholder="linkedIn"/>
                                </div>
                                <div className="form-group">
                                    <input 
                                    name="instagram"
                                    value={localProfile.instagram}
                                    onChange={updateInput}
                                    required
                                    type ="text"  className="form-control" placeholder="Instagram"/>
                                </div>

                                <div className="form-group">
                                    <input
                                    name="twitter"
                                    value={localProfile.twitter}
                                    onChange={updateInput}
                                    required
                                    type ="text"  className="form-control" placeholder="Twitter"/>
                                </div>
                                <div>
                                    <input type="submit" className="btn btn-teal btn-sm" value="Update"/>
                                    <Link to="/dashboard" className="btn bg-light-grey btn-sm">Back</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <div style={{marginBottom:'150px'}}></div>
        </React.Fragment>
    )
};

export default CreateProfile;