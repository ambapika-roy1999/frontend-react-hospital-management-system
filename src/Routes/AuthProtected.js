import React, { useEffect } from "react";
import { useNavigate, Route,Navigate } from "react-router-dom";
import {setAuthorization} from "../helpers/api_helper";
import { useDispatch } from "react-redux";

import { useProfile } from "../Components/Hooks/UserHooks";

import { logoutUser } from "../store/actions";


const AuthProtected = (props) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userProfile, loading, token } = useProfile();
//   useEffect(()=>{
//     console.log('second')
// },[])
   
  useEffect(() => {
    console.log('token',token)
    if (userProfile && !loading && token) {
       setAuthorization(token);
    
    } else if (!userProfile && loading && !token) {
      dispatch(logoutUser());
    }
  }, [token, userProfile, loading, dispatch]);

  /*
    Navigate is un-auth access protected routes via url
    */

  // 
  // if (!userProfile && loading && !token) {
  //   return (
  //     <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
  //   );
  // }
  if (userProfile) {
    console.log('routes called')
    return (
          <Navigate to='/dashboard' />
        );
  }
 
  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (<> <Component {...props} /> </>);
      }}
    />
  );
};

export { AuthProtected, AccessRoute };