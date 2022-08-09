import Axios from 'axios';

export const FETCH_ALL_DEVELOPER_REQUEST ="FETCH_ALL_DEVELOPER_REQUEST";
export const FETCH_ALL_DEVELOPER_SUCCESS ="FETCH_ALL_DEVELOPER_SUCCESS";
export const FETCH_ALL_DEVELOPER_FAILURE ="FETCH_ALL_DEVELOPER_FAILURE";

export const FETCH_DEVELOPER_REQUEST ="FETCH_DEVELOPER_REQUEST";
export const FETCH_DEVELOPER_SUCCESS ="FETCH_DEVELOPER_SUCCESS";
export const FETCH_DEVELOPER_FAILURE ="FETCH_DEVELOPER_FAILURE";


export const fetchAllDeveloper =()=>{
    return async (dispatch)=>{
       try{
            dispatch({type : FETCH_ALL_DEVELOPER_REQUEST});
            let dataUrl ='/api/profiles/all';
            let response = await Axios.get(dataUrl);
            dispatch({type : FETCH_ALL_DEVELOPER_SUCCESS , payload : response.data});
       }
       catch(error){
        dispatch({type : FETCH_ALL_DEVELOPER_FAILURE , payload : error});
       }
    }
};

//fetch a single developer
export const fetchDeveloper=(developerId)=>{
    return async (dispatch)=>{
        try{
            dispatch({type : FETCH_DEVELOPER_REQUEST});
            let dataUrl = `/api/profiles/${developerId}` ;
            let response = await Axios.get(dataUrl);
            dispatch({type : FETCH_DEVELOPER_SUCCESS , payload :  response.data});
        }
        catch(error){
            console.log(error);
            dispatch({type :FETCH_DEVELOPER_FAILURE , payload : error});
        }
    }
};