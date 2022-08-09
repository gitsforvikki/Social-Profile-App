import  Axios from 'axios';
import * as userUtil from '../../util/UserUtil';
import * as authUtil from '../../util/AuthUtil';
import * as alertActions from '../../redux/alert/alert.action';


export const CLEAR_PROFILE = 'CLEAR_PROFILE';

export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';

export const DELETE_EXPERIENCE_REQUEST = 'DELETE_EXPERIENCE_REQUEST';
export const DELETE_EXPERIENCE_SUCCESS = 'DELETE_EXPERIENCE_SUCCESS';
export const DELETE_EXPERIENCE_FAILURE = 'DELETE_EXPERIENCE_FAILURE';

export const DELETE_EDUCATION_REQUEST = 'DELETE_EDUCATION_REQUEST';
export const DELETE_EDUCATION_SUCCESS = 'DELETE_EDUCATION_SUCCESS';
export const DELETE_EDUCATION_FAILURE = 'DELETE_EDUCATION_FAILURE';


export const ADD_EDUCATION_REQUEST = 'ADD_EDUCATION_REQUEST';
export const ADD_EDUCATION_SUCCESS = 'ADD_EDUCATION_SUCCESS';
export const ADD_EDUCATION_FAILURE = 'ADD_EDUCATION_FAILURE';

export const ADD_EXPERIENCE_REQUEST = 'ADD_EXPERIENCE_REQUEST';
export const ADD_EXPERIENCE_SUCCESS = 'ADD_EXPERIENCE_SUCCESS';
export const ADD_EXPERIENCE_FAILURE = 'ADD_EXPERIENCE_FAILURE';

//edit profile
export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';

//create profile
export const CREATE_PROFILE_REQUEST = 'CREATE_PROFILE_REQUEST';
export const CREATE_PROFILE_SUCCESS = 'CREATE_PROFILE_SUCCESS';
export const CREATE_PROFILE_FAILURE = 'CREATE_PROFILE_FAILURE';


//get my profile(private request)
export const getProfile=()=>{
  return async (dispatch)=>{
    try{
        if(userUtil.isLoggedIn()){
          authUtil.setAuthToken(userUtil.getToken());
          dispatch({type : GET_PROFILE_REQUEST});
          let dataUrl ='/api/profiles/me';
          let response = await Axios.get(dataUrl);
          dispatch({type : GET_PROFILE_SUCCESS , payload : response.data});
        }
    }
    catch(error){
        dispatch({type : GET_PROFILE_FAILURE , payload :  {error : error}});
    }
  }

};



//clear profile
export const clearProfile =()=>{
  return async (dispatch)=>{
      try{
        dispatch({type : CLEAR_PROFILE});
      }
      catch(error){
        console.log(error);
      }
  }
}


//delete experience
export const deleteExperience =(experienceId)=>{
  return async (dispatch)=>{
    try{
      if(userUtil.isLoggedIn()){
        authUtil.setAuthToken(userUtil.getToken());
        dispatch({type :DELETE_EXPERIENCE_REQUEST });
        let dataUrl=` /api/profiles/experience/${experienceId}`;
        let response  = await Axios.delete(dataUrl);
        dispatch({type : DELETE_EXPERIENCE_SUCCESS , payload : response.data});
        dispatch(alertActions.setAlert(response.data.msg  , 'success'));
      }
    }
    catch(error){
      console.log(error);
      dispatch({type : DELETE_EXPERIENCE_FAILURE , payload :  error});
    }
  }
};

//delete education
export const deleteEducation =(educationId)=>{
  return async (dispatch)=>{
    try{
      if(userUtil.isLoggedIn()){
        authUtil.setAuthToken(userUtil.getToken());
        dispatch({type :DELETE_EDUCATION_REQUEST });
        let dataUrl=` /api/profiles/education/${educationId}`;
        let response  = await Axios.delete(dataUrl);
        dispatch({type : DELETE_EDUCATION_SUCCESS , payload : response.data});
        dispatch(alertActions.setAlert(response.data.msg  , 'success'));
      }
    }
    catch(error){
      console.log(error);
      dispatch({type : DELETE_EDUCATION_FAILURE , payload :  error});
    }
  }
};
//Add education
export const addEducation = (education , navigate) => {
  return async (dispatch) => {
      try{
          if(userUtil.isLoggedIn()) {
              let token = userUtil.getToken();
              authUtil.setAuthToken(token);
              dispatch({type : ADD_EDUCATION_REQUEST});
              let dataUrl = '/api/profiles/education/';
              let response = await Axios.put(dataUrl, education);
              dispatch({type : ADD_EDUCATION_SUCCESS , payload : response.data});
              dispatch(alertActions.setAlert('Education is Added' , 'success'));
              navigate('/dashboard');
          }
      }
      catch (error) {
          console.error(error);
          dispatch({type : ADD_EDUCATION_FAILURE , payload : {error : error}});
      }
  };
};


//add experience
export const addExperience =(experience , navigate)=>{
  return async (dispatch)=>{
    try{
        if(userUtil.isLoggedIn()){
          authUtil.setAuthToken(userUtil.getToken());
          dispatch({type : ADD_EXPERIENCE_REQUEST});
          let dataUrl = '/api/profiles/experience';
          let response =  await Axios.put(dataUrl ,  experience);
          dispatch({type : ADD_EXPERIENCE_SUCCESS , payload :  response.data});
          dispatch(alertActions.setAlert( response.data.msg, 'success'));
          navigate('/dashboard');
        }
    }
    catch(error){
      console.log(error);
      dispatch({type : ADD_EXPERIENCE_FAILURE , payload:{error : error}});
    }
  }
};


//edit or update profile

export const updateProfile=(profile , navigate)=>{
  return  async (dispatch)=>{
    try{
        if(userUtil.isLoggedIn()){
          authUtil.setAuthToken(userUtil.getToken());
          dispatch({type : UPDATE_PROFILE_REQUEST});
          let dataUrl = '/api/profiles/';
          let response =  await Axios.put(dataUrl ,  profile );
          dispatch({type : UPDATE_PROFILE_SUCCESS , payload  : response.data});
          dispatch(alertActions.setAlert(response.data.msg , 'success'));
          navigate('/dashboard');
        }
    }
    catch(error){
      console.log(error);
      dispatch({type : UPDATE_PROFILE_FAILURE , payload : {error : error}});
    }
  }
};

//create profile
 export const CreateProfile =(profile)=>{
   return async (dispatch)=>{
      try{
        if(userUtil.isLoggedIn()){
          authUtil.setAuthToken(userUtil.getToken());
          dispatch({type : CREATE_PROFILE_REQUEST});
          let dataUrl = '/api/profiles/';
          let response = await Axios.post(dataUrl , profile);
          dispatch({type : CREATE_PROFILE_SUCCESS , payload : response.data});
          dispatch(alertActions.setAlert(response.data.msg , 'success'));
        }
      }
      catch(error){
        console.log(error);
        dispatch({type : CREATE_PROFILE_FAILURE , payload  : {error :  error}});
      }
   }
 }