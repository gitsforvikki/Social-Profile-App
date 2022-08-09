import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as profileActions from '../../../redux/profile/profile.action';

let AddEducation = ()=>{

    let dispatch = useDispatch();
    let navigate = useNavigate();
    
    let [education , setEducation] = useState({
        school :'',
        degree:'',
        fieldOfEducation:'',
        from:'',
        current:false,
        to:'',
        description:''
    })

    let updateInputs=(event)=>{
        if(event.target.type  === 'checkbox' ){
           setEducation({
               ...education,
            current : event.target.checked
           })
        }
        else{
            setEducation({
                ...education,
                [event.target.name]:event.target.value
            })
        }
    };

    let submitEducation=(e)=>{
        e.preventDefault();
        dispatch(profileActions.addEducation(education , navigate))

    }



    return(
        <React.Fragment>
             <section className="p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-teal font-weight-bold"><i className="fa fa-graduation-cap" />Add Education</p>
                            <p className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry. when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="p-3">
                <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <form onSubmit={submitEducation}>
                                    <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-light-grey text-teal">School</span>
                                            </div>
                                            <input 
                                            required 
                                            name="school"
                                            value={education.school}
                                            onChange={updateInputs}
                                            type="text" className="form-control" />
                                    </div>
                                    <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-light-grey text-teal">Degree</span>
                                            </div>
                                            <input 
                                            
                                            required
                                            name="degree"
                                            value={education.degree}
                                            onChange={updateInputs}
                                            type="text" className="form-control" />
                                    </div>
                                    <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-light-grey text-teal">Field of study</span>
                                            </div>
                                            <input 
                                            required
                                            name="fieldOfEducation"
                                            value={education.fieldOfEducation}
                                            onChange={updateInputs}
                                            type="text" className="form-control" />
                                    </div>
                                    <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-light-grey text-teal">From Date</span>
                                            </div>
                                            <input 
                                            required 
                                            name="from"
                                            value={education.from}
                                            onChange={updateInputs}
                                            type="date" className="form-control" />
                                    </div>

                                    <div className="form-check mb-3">
                                        <input 
                                        name="current"
                                        value={education.current}
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
                                            required 
                                            name="to"
                                        value={education.to}
                                        onChange={updateInputs}
                                            type="date" className="form-control" />
                                    </div>

                                    <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-light-grey text-teal">Description</span>
                                            </div>
                                            <textarea 
                                            name="description"
                                            value={education.description}
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
            <div style={{marginBottom:'150px'}}></div>
        </React.Fragment>
    )
};

export default AddEducation;