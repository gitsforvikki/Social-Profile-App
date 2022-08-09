import { Navigate } from 'react-router-dom';
import * as userUtil from './UserUtil';

const PrivateRoute=({children})=>{
    let auth = userUtil.isLoggedIn();
    return auth ? children : <Navigate to={"/users/login"} /> 
};

export default PrivateRoute;