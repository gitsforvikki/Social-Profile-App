import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import * as postActions from '../../../redux/post/post.action';
import * as postReducer from '../../../redux/post/post.reducer';
import Spinner from '../../../layouts/misc/spinner/Spinner';
import * as userReducer from '../../../redux/user/user.reducer';

let PostDetails = ()=>{

    let dispatch = useDispatch();
    let postId = useParams().postId;

    let [comment , setComment] = useState({
        text : ''
    });


    let userInfo = useSelector((state) => {
        return state[userReducer.userFeatresKey];
    });

    let {user} = userInfo;

    useEffect(()=>{
        dispatch(postActions.getSinglePost(postId));
    }, []);

    let postInfo = useSelector((state)=>{
            return  state[postReducer.postFeaturesKey];
    });

    let {loading , post} = postInfo;


    let submitCreateComent=(e)=>{
        e.preventDefault();
        dispatch(postActions.createComment(postId , comment));
        setComment({
            text :''
        });
    };

    //delete comment
    let clickDeleteComment=(commentId)=>{
        dispatch(postActions.deleteComment(commentId , postId));
    }

    return(
        <React.Fragment>
            {/* <pro>{JSON.stringify(post)}</pro> */}
            <section className="p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-teal">Happy Discussion</p>
                            <p className="lead">One of the most important areas on which discussion topics are placed in the final selection round in IIMs,IITs, IMI and other top MBA and IITs colleges is the Abstract discussion topic which requires your opinion based writing and what positives and negatives you could find in the discussion topics.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                {
                    loading ? <Spinner/> : 

                    <React.Fragment>
                        <section>
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <Link to='/post/list' className="btn rgba-green-light btn-sm">Back</Link>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        {
                                            Object.keys(post).length > 0 && 
                                            <div className="card bg-light-grey">
                                               <div className="card-body">
                                                   <div className="row">
                                                       <div className="col-md-2">
                                                            <img src={post.avatar} alt="" width="60" height="60" className="rounded-circle"   /><br/>
                                                            <small>{post.name}</small>
                                                       </div>
                                                       <div className="col-md-8">
                                                       <div className="row">
                                                                <div className="col-md-6">
                                                                    <img src={post.image} alt="" className="img-fluid d-block m-auto"/>
                                                                </div>
                                                            </div>
                                                            <p>{post.text}</p>
                                                            <small>{post.createdAt}</small>
                                                       </div>
                                                   </div>

                                                   <div className="row my-2">
                                                       <div className="col">
                                                       <form onSubmit={submitCreateComent}>
                                                                <div className="input-group mb-1">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text" id="basic-addon1">
                                                                            <img src={user.avatar} alt="" width="50" height="50" className="rounded-circle"/>
                                                                        </span>
                                                                    </div>
                                                                    <textarea
                                                                        required
                                                                        name="text"
                                                                        value={comment.text}
                                                                        onChange={e => setComment({text : e.target.value})}
                                                                        rows="3" className="form-control" placeholder="Whats on your mind.."/>
                                                                </div>
                                                                <div>
                                                                    <input type="submit" className="btn btn-teal btn-sm" value="Comment"/>
                                                                </div>
                                                            </form>
                                                       </div>
                                                   </div>
                                               </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section>
                            {
                                Object.keys(post).length > 0 &&
                                post.comments.length > 0 &&
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            {
                                                post.comments.map(comment =>{
                                                    return(
                                                        <div className="card mt-3" key={comment._id}>
                                                        <div className="card-body bg-light">
                                                            <div className="row">
                                                                <div className="col-md-2 ">
                                                                    <img src={comment.avatar} alt="" className="rounded-circle" width="50" height="50"/>
                                                                    <br/>
                                                                    <small>{comment.name}</small>
                                                                </div>
                                                                <div className="col-md-8">
                                                                    <p>{comment.text}</p>
                                                                    {
                                                                        comment.user === user._id ?
                                                                            <button  onClick={clickDeleteComment.bind(this ,comment._id )} className="btn rgba-amber-light btn-sm" >
                                                                                delete
                                                                            </button> : null
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
                            }
                        </section>
                    </React.Fragment>
                }
            </section>
            <div style={{marginBottom:'150px'}}></div>
        </React.Fragment>
    )
};

export default PostDetails;