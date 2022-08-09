import * as postAction from './post.action';


export const postFeaturesKey = 'post-info';

let initialState ={
  loading : false,
  posts:[],
  post:{},
  errorMessage:''
};

export const reducer =(state = initialState , action)=>{
  let {type , payload} = action;
  switch (type) {

    //get all posts
    case postAction.GET_ALL_POST_REQUEST :
      return {
        ...state,
        loading:true
      };
    case postAction.GET_ALL_POST_SUCCESS :
      return{
        ...state,
        loading :false,
        posts : payload.posts
      };
    case postAction.GET_ALL_POST_FAILURE :
      return{
        ...state,
        loading:false,
        errorMessage : payload.error
      };

      //create new post
      case postAction.CREATE_POST_REQUEST :
      return {
        ...state,
        loading:true
      };
    case postAction.CREATE_POST_SUCCESS :
      return {
        ...state,
        loading : false,
        posts: [...state.posts , payload.post]
    };
    case postAction.CREATE_POST_FAILURE :
      return{
        ...state,
        loading:false,
        errorMessage : payload.error
      };

      //get a single post
    case postAction.GET_SINGLE_POST_REQUEST :
      return {
        ...state,
        loading:true
      };
    case postAction.GET_SINGLE_POST_SUCCESS :
      return{
        ...state,
        loading :false,
        post : payload.post
      };
    case postAction.GET_SINGLE_POST_FAILURE :
      return{
        ...state,
        loading:false,
        errorMessage : payload.error
      };

      //create comments
      case postAction.CREATE_COMMENT_REQUEST :
        return {
          ...state,
          loading:true
        };
      case postAction.CREATE_COMMENT_SUCCESS :
        return{
          ...state,
          loading :false,
          post :payload.post
          
        };
      case postAction.CREATE_COMMENT_FAILURE :
        return{
          ...state,
          loading:false,
          errorMessage : payload.error
        };

        //like post
      case postAction.LIKE_POST_REQUEST :
        return {
          ...state,
          loading : false
          
        };
      case postAction.LIKE_POST_SUCCESS :
        let likedPosts = state.posts.map(post => {
          if(post._id === payload.post._id){
              return payload.post;
          }
          else{
              return post;
          }
      })
      return {
          ...state,
          loading : false,
          posts: [...likedPosts]
      };
      case postAction.LIKE_POST_FAILURE :
        return{
          ...state,
          loading : false,
          errorMessage : payload.error
        };


        //unlike post
      case postAction.UNLIKE_POST_REQUEST :
        return {
          ...state,
          loading : false
        };
      case postAction.UNLIKE_POST_SUCCESS :
        let unLikedPosts = state.posts.map(post => {
          if(post._id === payload.post._id){
              return payload.post;
          }
          else{
              return post;
          }
      })
      return {
          ...state,
          loading : false,
          posts: [...unLikedPosts]
      };
      case postAction.UNLIKE_POST_FAILURE :
        return{
          ...state,
          loading : false,
          errorMessage : payload.error
        };

        //delete post
      case postAction.DELETE_POST_REQUEST :
        return {
          ...state,
          loading:true
        };
      case postAction.DELETE_POST_SUCCESS :
        return{
          ...state,
          loading:false,
          posts : state.posts.filter(post => post._id !== payload.post._id)
        };
      case postAction.DELETE_POST_FAILURE :
        return{
          ...state,
          loading :false,
          errorMessage : payload.error
        };
         // Delete a Comment
         case postAction.DELETE_COMMENT_REQUEST:
          return {
              ...state,
              loading : true
          };
      case postAction.DELETE_COMMENT_SUCCESS:
          return {
              ...state,
              loading : false,
              post: payload.post
          };
      case postAction.DELETE_COMMENT_FAILURE:
          return {
              ...state,
              loading : false,
              errorMessage: payload.error
          };
  

      
    default: return state;

      
  }
};