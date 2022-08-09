import React, { useEffect, useState } from 'react';
import  {useDispatch, useSelector}from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as profileActions from '../../../redux/profile/profile.action';
import * as profileReducer from '../../../redux/profile/profile.reducer';

let EditProfile = ()=>{

    let dispatch = useDispatch();
    let navigate = useNavigate();

    let profileInfo = useSelector((state)=>{
        return state[profileReducer.profileFeaturesKey];
    });
    let { profile} = profileInfo;

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
    useEffect(()=>{
        dispatch(profileActions.getProfile());
        setLocalProfile({
            company : profile.company ? profile.company : '',
            website: profile.website ? profile.website :  '',
            location: profile.location  ? profile.location : '',
            designation: profile.designation ? profile.designation :  '',
            skills: profile.skills ? profile.skills :  '',
            bio: profile.bio ? profile.bio : '',
            githubUserName: profile.githubUserName ? profile.githubUserName : '',
            youtube: profile.social?.youtube ? profile.social?.youtube :  '',
            facebook: profile.social?.facebook ? profile.social?.facebook : '',
            linkedin: profile.social?.linkedin ? profile.social?.linkedin : '',
            twitter : profile.social?.twitter ? profile.social?.twitter :  '',
            instagram: profile.social?.instagram ? profile.social?.instagram : ''
        })

    },[]);

    let updateInput=(event)=>{
        setLocalProfile({
            ...localProfile,
            [event.target.name]:event.target.value
        })
    };

    let submitUpdateProfile=(event)=>{
        event.preventDefault();
        dispatch(profileActions.updateProfile(localProfile , navigate));
    }
    return(
        <React.Fragment>
            <section className="p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-teal font-weight-bold"><i className="fa fa-user-circle" />Edit the profile</p>
                            <p className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="p-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <form onSubmit={submitUpdateProfile}>
                                <div className="form-group">
                                    <input 
                                    required
                                    name="company"
                                    value={localProfile.company}
                                    onChange={updateInput}
                                    type ="text"  className="form-control" placeholder="company"/>
                                </div>
                                <div className="form-group">
                                    <input
                                    required
                                     name="website"
                                     value={localProfile.website}
                                     onChange={updateInput}
                                    type ="text"  className="form-control" placeholder="website"/>
                                </div>
                                <div className="form-group">
                                    <input
                                    required
                                     name="location"
                                     value={localProfile.location}
                                     onChange={updateInput}
                                    type ="text"  className="form-control" placeholder="location"/>
                                </div>
                                <div className="form-group">
                                   <select 
                                   required
                                    name="designation"
                                    value={localProfile.designation}
                                    onChange={updateInput}
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
                                    required
                                     name="skills"
                                     value={localProfile.skills}
                                     onChange={updateInput}
                                    type ="text"  className="form-control" placeholder="skill"/>
                                </div>
                                <div className="form-group">
                                    <textarea 
                                    required
                                     name="bio"
                                     value={localProfile.bio}
                                     onChange={updateInput}
                                    rows="3" className="form-control" placeholder="Job Description"/>
                                </div>
                                <div className="form-group">
                                    <input 
                                    required
                                     name="githubUserName"
                                     value={localProfile.githubUserName}
                                     onChange={updateInput}
                                    type ="text"  className="form-control" placeholder="github Username"/>
                                </div>
                                <hr/>
                                            <small>Social Links</small>
                                <div className="form-group">
                                    <input
                                    required
                                    name="youtube"
                                    value={localProfile.youtube}
                                    onChange={updateInput}
                                    type ="text"  className="form-control" placeholder="Youtube"/>
                                </div>

                                <div className="form-group">
                                    <input
                                    required
                                    name="facebook"
                                    value={localProfile.facebook}
                                    onChange={updateInput}
                                    type ="text"  className="form-control" placeholder="facebook"/>
                                </div>
                                <div className="form-group">
                                    <input 
                                    required
                                    name="linkedin"
                                    value={localProfile.linkedin}
                                    onChange={updateInput}
                                    type ="text"  className="form-control" placeholder="linkedIn"/>
                                </div>
                                <div className="form-group">
                                    <input 
                                    required
                                    name="instagram"
                                    value={localProfile.instagram}
                                    onChange={updateInput}
                                    type ="text"  className="form-control" placeholder="Instagram"/>
                                </div>

                                <div className="form-group">
                                    <input 
                                    required
                                    name="twitter"
                                    value={localProfile.twitter}
                                    onChange={updateInput}
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
            <div style={{marginBottom:"100px"}}></div>
        </React.Fragment>
    )
};

export default EditProfile;