import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as userReducer from '../../../redux/user/user.reducer';
import * as postActions from '../../../redux/post/post.action';
import * as postReducer from '../../../redux/post/post.reducer';
import Spinner from '../../../layouts/misc/spinner/Spinner';
import { Link } from 'react-router-dom';



let PostList = ()=>{

    let dispatch = useDispatch();

    let [localPost , setLocalPost] = useState({
        text : '',
        image:''
    });

    let updateInput=(e)=>{
        setLocalPost({
            ...localPost,
            [e.target.name] : e.target.value
        })
    };

    let postInfo = useSelector((state)=>{
            return state[postReducer.postFeaturesKey]
    });

    let {loading , posts} = postInfo;


    let userInfo = useSelector((state)=>{
            return state[userReducer.userFeatresKey]
    });

    let { user} = userInfo;

    useEffect(()=>{
        dispatch(postActions.getAllPosts());
    },[]);

    //like post
    let clickLikePost=(postId)=>{
        dispatch(postActions.likePost(postId));
    };

    //unlike post
    let clickUnLikePost=(postId)=>{
        dispatch(postActions.unLikePost(postId));
    };

    //delete post
    let clickDeletePost=(postId)=>{
        dispatch(postActions.deletePost(postId));
    }

    let submitPostData=(e)=>{
        e.preventDefault();
        dispatch(postActions.createPost(localPost));
        setLocalPost({
           text:'',
           image :''
           
        })
    }


    return(
        <React.Fragment>
            {/* <pre>{JSON.stringify(localPost)}</pre> */}
            <section className="p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-teal font-weight-bold">Welcome to React post community</p>
                            <p className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        </div>
                    </div>
                    {
                        Object.keys(user).length > 0 &&
                        <div className="row">
                        <div className="col-md-8">
                            <form onSubmit={submitPostData}>
                                <div className="input-group mb-1">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <img src={user.avatar} alt="" width="60px" height="60px" className="rounded-circle" /><br/>
                    
                                        </span>
                                    </div>
                                    <textarea 
                                        name="text"
                                        value={localPost.text}
                                        onChange={updateInput}
                                        required
                                    row="3" className="form-control" aria-label="With textarea" placeholder="Whats in your mind....."/>
                                </div>
                                <div className="input-group mt-1">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> Image Url</span>
                                    </div>
                                    <input 
                                    name="image"
                                    value={localPost.image}
                                    onChange={updateInput}
                                    type="text" className="form-control" placeholder="Type url here.."/>
                                </div>
                                <div className="mt-3">
                                    <input type="submit" className="btn btn-teal btn-sm" value="Post" />
                                </div>
                                
                            </form>
                        </div>
                    </div>
                    }
                    <hr/>
                </div>
            </section>

            {/* all posts */}

            <section>
                    {
                        loading ? <Spinner/> : 
                        
                        <React.Fragment>
                            {
                                posts.length > 0 && 
                                <React.Fragment>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col">
                                                {
                                                    posts.map(post=>{
                                                        return(

                                                                <div key={post._id} className="card bg-light-grey my-2">
                                                                    <div className="card-body">
                                                                        <div className="row">
                                                                            <div className="col-md-2 text-center">
                                                                                <img src={post.avatar} alt="" width="100" height="100" className="rounded-circle" /><br/>
                                                                                <small>{post.name}</small>
                                                                            </div>
                                                                            <div className="col-md-10">
                                                                                <div className="row">
                                                                                    <div className="col-md-6 text-center">
                                                                                        <img src={post.image} alt="" width="150" height="150" />
                                                                                    </div>
                                                                                </div>
                                                                                <p>{post.text}</p>
                                                                                {/* like post */}
                                                                                <button 
                                                                                    onClick={clickLikePost.bind(this , post._id)}
                                                                                className="btn rgba-green-light btn-sm" >
                                                                                    <i className= "fa fa-thumbs-up " /> {post.likes.length}
                                                                                </button>
                                                                                {/* unlike post */}
                                                                                <button 
                                                                                    onClick={clickUnLikePost.bind(this , post._id)}
                                                                                className="btn rgba-red-light btn-sm" >
                                                                                    <i className="fa fa-thumbs-down"/> 
                                                                                </button>
                                                                                {/* discussion on post */}
                                                                                <Link to={`/post/${post._id}`} className="btn rgba-blue-light btn-sm" >
                                                                                <i className="fab fa-facebook-messenger"/> Discussion {post.comments.length}
                                                                                </Link>
                                                                                {/* delete post */}
                                                                                {
                                                                                    post.user === user._id ?
                                                                                    <button onClick={clickDeletePost.bind(this , post._id)} className="btn rgba-amber-light btn-sm" >
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
                                </React.Fragment> 
                            }
                        </React.Fragment>
                    }
            </section>
           <div style={{marginBottom:'150px'}}></div>
        </React.Fragment>
    )
};

export default PostList;