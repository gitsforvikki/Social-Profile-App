import * as userActions from './user.action';


export const userFeatresKey = 'userInfo';


let initialState={
  loading :false,
  token:'',
  user:{},
  isAuhenticated:false,
  errorMessage:''
};



export const reducer =(state = initialState , actions)=>{
  let {type ,  payload} = actions;
  switch (type) {

    //user register
    case userActions.USER_REGISTER_REQUEST:
      return {
        ...state,
        loading : true
      };
    case userActions.USER_REGISTER_SUCCESS:
      return{
        ...state,
        loading : false,
      };
    case userActions.USER_REGISTER_FAILURE:
      return{
        ...state,
        loading :false,
        errorMessage:payload.error
      };
      //user login
    case userActions.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading : true
      };
    case userActions.USER_LOGIN_SUCCESS:
      localStorage.setItem('social-profile-token' , payload.token)
      return{
        ...state,
        loading : false,
        token : payload.token,
        isAuhenticated : true
      };
    case userActions.USER_LOGIN_FAILURE:
      localStorage.removeItem('social-profile-token');
      return{
        ...state,
        loading :false,
        user:{},
        token:'',
        errorMessage:payload.errors,
        isAuhenticated : false
      };

      //get user
      case userActions.GET_USER_REQUEST:
      return {
        ...state,
        loading : true
      };
    case userActions.GET_USER_SUCCESS:
      return{
        ...state,
        loading : false,
        user : payload.user
      };
    case userActions.GET_USER_FAILURE:
      return{
        ...state,
        loading :false,
        errorMessage:payload.errors
      };

      //logout user
      case userActions.LOGOUT_USER_SUCCESS:
        localStorage.removeItem('social-profile-token');
        return{
          ...state,
          loading :false,
          isAuhenticated : false,
          user:{},
          token : ''
        };
        case userActions.LOGOUT_USER_FAILURE:
          return{
            ...state
          };
    default: return state;
      
  }
}
