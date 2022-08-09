import * as alertActions from './alert.action';

export const alertFeaturesKey = 'alertInfo';
let initialState={
  messages:[] 
};
export const reducer =(state = initialState , action)=>{

  let {type , payload} = action;
  switch (type) {

    case alertActions.SET_ALERT :
      return{
        ...state,
        messages:[...state.messages , payload]
      };

      case alertActions.REMOVE_ALERT :
        return{
          ...state,
          messages:[...state.messages.filter(msg => msg.id !== payload.id)]
        };

    default: return state;
      
  }
}