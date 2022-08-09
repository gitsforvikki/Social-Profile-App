import { combineReducers } from "redux";
import * as developerReducer from '../redux/developer/developer.reducer';
import * as userReducer from '../redux/user/user.reducer';
import * as alertReducer from '../redux/alert/alert.reducer';
import * as profileReducer from '../redux/profile/profile.reducer';
import * as postReducer from '../redux/post/post.reducer';

export const rootReducer = combineReducers({
    [developerReducer.developerFeaturesKey] : developerReducer.reducer,
    [userReducer.userFeatresKey] :userReducer.reducer,
    [alertReducer.alertFeaturesKey]:alertReducer.reducer,
    [profileReducer.profileFeaturesKey] : profileReducer.reducer,
    [postReducer.postFeaturesKey]:postReducer.reducer
});