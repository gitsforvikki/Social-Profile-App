import * as profileActions from './profile.action';


export const profileFeaturesKey = 'profile-info';

let initialState ={
  loading : false,
  profile : {},
  errorMessage :''
} ;

export const reducer =(state = initialState , action)=>{
  let {type  , payload} = action;
  switch (type) {

    //clear profile
    case profileActions.CLEAR_PROFILE :
      return{
        ...state,
        profile :{}
      };
      //get profile
    case profileActions.GET_PROFILE_REQUEST :
      return{
        ...state,
        loading :true
      };
    case profileActions.GET_PROFILE_SUCCESS :
      return{
        ...state,
        loading : false,
        profile : payload.profile
      };
    case profileActions.GET_PROFILE_FAILURE :
      return{
        ...state,
        loading : false,
        errorMessage : payload.error
      };
      
      //delete experience
      case profileActions.DELETE_EXPERIENCE_REQUEST :
        return{
          ...state,
          loading:true
        };
      case profileActions.DELETE_EXPERIENCE_SUCCESS :
        return{
          ...state,
          loading:false,
          profile : payload.profile
        };
        case profileActions.DELETE_EXPERIENCE_FAILURE :
          return {
            ...state,
            loading:false,
            errorMessage :payload
          }
      //delete education

      case profileActions.DELETE_EDUCATION_REQUEST :
        return{
          ...state,
          loading:true
        };
      case profileActions.DELETE_EDUCATION_SUCCESS :
        return{
          ...state,
          loading:false,
          profile : payload.profile
        };
        case profileActions.DELETE_EDUCATION_FAILURE :
          return {
            ...state,
            loading:false,
            errorMessage :payload
          }

           // Add Education
      case profileActions.ADD_EDUCATION_REQUEST:
          return {
              ...state,
              loading: true
          };
      case profileActions.ADD_EDUCATION_SUCCESS:
          return {
              ...state,
              loading: false,
              profile: payload.profile
          };
      case profileActions.ADD_EDUCATION_FAILURE:
          return {
              ...state,
              loading: false,
              errorMessage: payload.error
          };

           //add experience
      case profileActions.ADD_EXPERIENCE_REQUEST:
          return {
              ...state,
              loading: true
          };

      case profileActions.ADD_EXPERIENCE_SUCCESS:
          return {
              ...state,
              loading: false,
              profile: payload.profile
          };
      case profileActions.ADD_EXPERIENCE_FAILURE:
          return {
              ...state,
              loading: false,
              errorMessage: payload.error
          };

          //update profile
          case profileActions.UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            };
  
        case profileActions.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                profile: payload.profile
            };
        case profileActions.UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload.error
            };
            //create profile

        case profileActions.CREATE_PROFILE_REQUEST :
          return{
            ...state,
            loading : true
          };

        case profileActions.CREATE_PROFILE_SUCCESS :
          return{
            ...state,
            loading : false,
            profile : payload.profile
          };
        case profileActions.CREATE_PROFILE_FAILURE :
          return{
            ...state,
            loading : false,
            errorMessage : payload.error
          };



    default : return state;
  }
};


