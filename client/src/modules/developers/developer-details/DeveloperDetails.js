import React , {useEffect} from 'react';
import {useParams } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import * as developerActions from '../../../redux/developer/developer.action';
import * as developerReducer from '../../../redux/developer/developer.reducer';
import Spinner from '../../../layouts/misc/spinner/Spinner';

let DeveloperDetails = () => {
    let dispatch = useDispatch();

    let developerInfo = useSelector((state) => {
        return state[developerReducer.developerFeaturesKey];
    });

    let {loading , selectedProfile} = developerInfo;

    let developerId = useParams().developerId;

    useEffect(() => {
        dispatch(developerActions.fetchDeveloper(developerId));
    }, [developerId]);

    return (
        <React.Fragment>
                        {
                            Object.keys(selectedProfile).length > 0 &&
                            <React.Fragment>
                                <section className="p-3">
                                    <div className="container">
                                        <div className="row animated zoomIn">
                                            <div className="col">
                                                <p className="h3 text-teal">
                                                    <i className="fa fa-user-tie"/> {selectedProfile.user.name}'s Profile </p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium animi fugiat iusto laudantium rerum. Adipisci animi blanditiis, culpa expedita explicabo, fugiat incidunt labore nostrum omnis, praesentium sit temporibus tenetur velit!</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {
                                    loading ? <Spinner/> :

                                    <section>
                                    <div className="container bg-teal text-white text-center p-3">
                                        <div className="row">
                                            <div className="col">
                                                <img src={selectedProfile.user.avatar} alt="" width="200" height="200" className="rounded-circle profile-img"/>
                                                <p className="h2">{selectedProfile.user.name}</p>
                                                <p className="h6">{selectedProfile.designation}</p>
                                                <p className="h6">{selectedProfile.company}</p>
                                                <p>{selectedProfile.location}</p>
                                                <div className="d-flex flex-row justify-content-center">
                                                    <div className="p-2">
                                                        <i className="fab fa-facebook"/>
                                                    </div>
                                                    <div className="p-2">
                                                        <i className="fab fa-twitter"/>
                                                    </div>
                                                    <div className="p-2">
                                                        <i className="fab fa-linkedin"/>
                                                    </div>
                                                    <div className="p-2">
                                                        <i className="fab fa-youtube"/>
                                                    </div>
                                                    <div className="p-2">
                                                        <i className="fab fa-instagram"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col text-center">
                                                <div className="card my-2">
                                                    <div className="card-body bg-light-grey text-teal">
                                                        <p className="h3">{selectedProfile.user.name}'s Biography</p>
                                                        <p>{selectedProfile.bio}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col text-center">
                                                <div className="card my-2">
                                                    <div className="card-body bg-light-grey text-teal">
                                                        <p className="h3">{selectedProfile.user.name}'s Skills</p>
                                                        {
                                                            selectedProfile.skills.map(skill => {
                                                                return (
                                                                    <span className="badge badge-dark p-2 m-2">{skill}</span>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-6">
                                                {
                                                    selectedProfile.experience.length > 0 ?
                                                        <React.Fragment>
                                                            <div className="card">
                                                                <div className="card-body bg-light-grey">
                                                                    <p className="h3">Experience</p>
                                                                    <ul className="list-group">
                                                                        {
                                                                            selectedProfile.experience.map(exp => {
                                                                                return (
                                                                                    <li className="list-group-item my-2" key={exp._id}>
                                                                                        <span>Title : {exp.title}</span><br/>
                                                                                        <span>Company : {exp.company}</span><br/>
                                                                                        <span>Location : {exp.location}</span><br/>
                                                                                        <span>From : {exp.from}</span><br/>
                                                                                        <span>To : {exp.to}</span><br/>
                                                                                        <span>Description : {exp.description}</span><br/>
                                                                                    </li>
                                                                                )
                                                                            })
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </React.Fragment> : null
                                                }
                                            </div>
                                            <div className="col-md-6">
                                                {
                                                    selectedProfile.experience.length > 0 ?
                                                        <React.Fragment>
                                                            <div className="card">
                                                                <div className="card-body bg-light-grey">
                                                                    <p className="h3">Education</p>
                                                                    <ul className="list-group">
                                                                        {
                                                                            selectedProfile.education.map(edu => {
                                                                                return (
                                                                                    <li className="list-group-item my-2" key={edu._id}>
                                                                                        <span>School : {edu.school}</span><br/>
                                                                                        <span>Degree : {edu.degree}</span><br/>
                                                                                        <span>Field of Study : {edu.fieldOfStudy}</span><br/>
                                                                                        <span>From : {edu.from}</span><br/>
                                                                                        <span>To : {edu.to}</span><br/>
                                                                                        <span>Description : {edu.description}</span><br/>
                                                                                    </li>
                                                                                )
                                                                            })
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </React.Fragment> : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                }
                                
                            </React.Fragment>
                        }
                          <div style={{marginBottom : '150px'}}/>
                    </React.Fragment>
    )
};
export default DeveloperDetails;