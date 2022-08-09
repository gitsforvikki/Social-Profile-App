import  Axios from 'axios';
import * as userUtil from '../../util/UserUtil';
import * as authUtil from '../../util/AuthUtil';
import * as alertAction from '../../redux/alert/alert.action';



export const GET_ALL_POST_REQUEST = 'GET_ALL_POST_REQUEST'
export const GET_ALL_POST_SUCCESS = 'GET_ALL_POST_SUCCESS'
export const GET_ALL_POST_FAILURE = 'GET_ALL_POST_FAILURE'



export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST'
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS'
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE'



export const GET_SINGLE_POST_REQUEST = 'GET_SINGLE_POST_REQUEST'
export const GET_SINGLE_POST_SUCCESS = 'GET_SINGLE_POST_SUCCESS'
export const GET_SINGLE_POST_FAILURE = 'GET_SINGLE_POST_FAILURE'



export const CREATE_COMMENT_REQUEST = 'CREATE_COMMENT_REQUEST'
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS'
export const CREATE_COMMENT_FAILURE = 'CREATE_COMMENT_FAILURE'


export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST'
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS'
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE'



export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST'
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS'
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE'


export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST'
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE'


export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST'
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS'
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE'


//get all posts
export const getAllPosts=()=>{
  return async (dispatch)=>{
    try{
        if(userUtil.isLoggedIn()){
          authUtil.setAuthToken(userUtil.getToken());
          dispatch({type : GET_ALL_POST_REQUEST});
          let dataUrl = '/api/posts/';
          let response = await Axios.get(dataUrl);
          dispatch({type : GET_ALL_POST_SUCCESS , payload : response.data});

        }
    }
    catch(error){
      console.log(error);
      dispatch({type : GET_ALL_POST_FAILURE , payload :{error :error}});
    }
  }
};

//create post
export const createPost=(post)=>{
  return async (dispatch)=>{
    try{
        if(userUtil.isLoggedIn()){
          authUtil.setAuthToken(userUtil.getToken());
          dispatch({type : CREATE_POST_REQUEST});
          let dataUrl = '/api/posts/';
          let response = await Axios.post(dataUrl , post);
          dispatch({type : CREATE_POST_SUCCESS , payload : response.data});
          dispatch(alertAction.setAlert(response.data.msg, 'success'));
        }
    }
    catch(error){
      console.log(error);
      dispatch({type : CREATE_POST_FAILURE , payload:{error : error}});
    }
  }
};

//get a post with postId

export const getSinglePost = (postId)=>{
  return async (dispatch)=>{
    try{
        if(userUtil.isLoggedIn()){
          authUtil.setAuthToken(userUtil.getToken());
          dispatch({type : GET_SINGLE_POST_REQUEST});
          let dataUrl =`/api/posts/${postId}`;
          let response = await Axios.get(dataUrl);
          dispatch({type : GET_SINGLE_POST_SUCCESS , payload : response.data});
        }
    }
    catch(error){
      console.log(error);
      dispatch({type : GET_SINGLE_POST_FAILURE , payload : {error : error}});
    }

  }
};


//create comment
export const createComment=(postId , comment)=>{
  return async (dispatch)=>{
    try{
      if(userUtil.isLoggedIn()){
        authUtil.setAuthToken(userUtil.getToken());

        dispatch({type : CREATE_COMMENT_REQUEST});
        let dataUrl = `/api/posts/comment/${postId}`;
        let response = await Axios.post(dataUrl ,comment );
        dispatch({type : CREATE_COMMENT_SUCCESS , payload :  response.data});
        dispatch(alertAction.setAlert('Comment make successful.' , 'success'));
      }

    }
    catch(error){
      console.log(error);
      dispatch({type : CREATE_COMMENT_FAILURE , payload:{error : error}});
    }
  }
};

//like a post
export const likePost =(postId)=>{
  return async (dispatch)=>{
    try{
          if(userUtil.isLoggedIn()){
            authUtil.setAuthToken(userUtil.getToken());
            dispatch({type :LIKE_POST_REQUEST });
            let dataUrl= `/api/posts/likes/${postId}`;
            let response = await Axios.put(dataUrl);
            dispatch({type : LIKE_POST_SUCCESS , payload : response.data});
          }
    }
    catch(error){
      console.log(error);
      dispatch({type : LIKE_POST_FAILURE , payload : {error : error}});
    }
  }
};


//unlike a post
export const unLikePost =(postId)=>{
  return async (dispatch)=>{
    try{
          if(userUtil.isLoggedIn()){
            authUtil.setAuthToken(userUtil.getToken());
            dispatch({type :UNLIKE_POST_REQUEST });
            let dataUrl= `/api/posts/unlike/${postId}`;
            let response = await Axios.put(dataUrl);
            dispatch({type : UNLIKE_POST_SUCCESS , payload : response.data});
          }
    }
    catch(error){
      console.log(error);
      dispatch({type : UNLIKE_POST_FAILURE , payload : {error : error}});
    }
  }
};



//delete post
export const deletePost=(postId)=>{
  return async (dispatch)=>{
    try{
        if(userUtil.isLoggedIn()){
          authUtil.setAuthToken(userUtil.getToken());
          dispatch({type : DELETE_POST_REQUEST});
          let dataUrl = `/api/posts/${postId}`;
          let response =  await Axios.delete(dataUrl);
          dispatch({type : DELETE_POST_SUCCESS , payload : response.data});
          dispatch(alertAction.setAlert(response.data.msg , 'success'));
        }
    }
    catch(error){
      console.log(error);
      dispatch({type  :DELETE_POST_FAILURE , payload:{error : error} });
    }
  }
};

//delete comments
export const deleteComment=( commentId , postId )=>{
  return async (dispatch)=>{
    try{
      if(userUtil.isLoggedIn()){
        authUtil.setAuthToken(userUtil.getToken());
        dispatch({type : DELETE_COMMENT_REQUEST});
        let dataUrl = `/api/posts/comment/${postId}/${commentId}`;
        let response =  await Axios.delete(dataUrl);
        dispatch({type : DELETE_COMMENT_SUCCESS , payload : response.data});
        dispatch(alertAction.setAlert(response.data.msg , 'success'));
      }
  }
    catch(error){
      console.log(error);
      dispatch({type : DELETE_COMMENT_FAILURE , payload : {error : error}});
    }
  }
}