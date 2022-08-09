import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as profileActions from '../../../redux/profile/profile.action';



let AddExperience = ()=>{

    let dispatch=useDispatch();
    let navigate = useNavigate();

    let [experience , setExperience]  = useState({
        title:'',
        company:'',
        location :'',
        from :'',
        to:'',
        current :false,
        description:''
    });

    //update user inputs
    let updateInputs =(event)=>{
        if(event.target.type === 'checkbox'){
            setExperience({
                ...experience,
                current : event.target.checked
            })
        }
        else{
            setExperience({
                ...experience,
                [event.target.name] : event.target.value
            })
        }
    }
    //submit form data
    let submitAddExperience=(event)=>{
        event.preventDefault();
        dispatch(profileActions.addExperience(experience , navigate));
    }
    return(
        <React.Fragment>
            {/* <pre>{JSON.stringify(experience)}</pre> */}
             <section className="p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-teal font-weight-bold"><i className="fa fa-user-clock" />Add Experience</p>
                            <p className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry. when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="p-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <form onSubmit={submitAddExperience}>
                                <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-light-grey text-teal">Title</span>
                                        </div>
                                        <input 
                                        name="title"
                                        value={experience.title}
                                        onChange={updateInputs}
                                        required type="text" className="form-control" />
                                </div>
                                <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-light-grey text-teal">Company</span>
                                        </div>
                                        <input 
                                        name="company"
                                        value={experience.company}
                                        onChange={updateInputs}
                                        required type="text" className="form-control" />
                                </div>
                                <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-light-grey text-teal">Location</span>
                                        </div>
                                        <input 
                                        name="location"
                                        value={experience.location}
                                        onChange={updateInputs}
                                        required type="text" className="form-control" />
                                </div>
                                <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-light-grey text-teal">From Date</span>
                                        </div>
                                        <input 
                                        name="from"
                                        value={experience.from}
                                        onChange={updateInputs}
                                        
                                        required type="date" className="form-control" />
                                </div>

                                <div className="form-check mb-3">
                                    <input  
                                    
                                    value={experience.current}
                                    onChange={updateInputs}
                                    className="form-check-input" type="checkbox" id="defaultCheck1"/>
                                        <label className="form-check-label" htmlFor="defaultCheck1">
                                            Current
                                        </label>
                                </div>

                                <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-light-grey text-teal">To Date</span>
                                        </div>
                                        <input 
                                        name="to"
                                        value={experience.to}
                                        onChange={updateInputs}
                                        disabled={experience.current}
                                        required type="date" className="form-control" />
                                </div>

                                <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-light-grey text-teal">Description</span>
                                        </div>
                                        <textarea
                                        name="description"
                                        value={experience.description}
                                        onChange={updateInputs}
                                        rows="3" required className="form-control" />
                                </div>
                                <div className="input-group mb-3">
                                        <input type="submit" className="btn btn-teal btn-sm" value="submit" />
                                        <Link to="/dashboard" className="btn btn-light-grey btn-sm">Back</Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <div style={{marginBottom : '150px'}}></div>
        </React.Fragment>
    )
};

export default AddExperience;