import * as developerActions from './developer.action';

export const developerFeaturesKey = 'developers-info';

let initialState = {
    loading : false,
    profiles :[],
    selectedProfile:{},
    errorMessage : ''
};



export const reducer =(state = initialState ,action )=>{
    let {type , payload} = action;
    switch (type) {

        //get all profiles
        case developerActions.FETCH_ALL_DEVELOPER_REQUEST :
            return{
                ...state,
                loading : true,
            };
        case developerActions.FETCH_ALL_DEVELOPER_SUCCESS : 
            return{
                ...state,
                loading :false,
                profiles : payload.profiles
            };
        case developerActions.FETCH_ALL_DEVELOPER_FAILURE :
            return{
                ...state,
                loading:false,
                errorMessage : payload
            };

            //get single developer
           
        case developerActions.FETCH_DEVELOPER_REQUEST :
            return{
                ...state,
                loading : true,
            };
        case developerActions.FETCH_DEVELOPER_SUCCESS : 
            return{
                ...state,
                loading :false,
                selectedProfile : payload.profile
            };
        case developerActions.FETCH_DEVELOPER_FAILURE :
            return{
                ...state,
                loading:false,
                errorMessage : payload
            };

            
           
    
        default: return state;
           
    }

};

