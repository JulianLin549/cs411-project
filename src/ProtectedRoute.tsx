import {Redirect, Route} from 'react-router-dom';
import {useUser} from "./Context/UserContext";


const ProtectedRoute = ({ component:Component, path, ...rest } : any) => {
    const { user } = useUser()!; // for any reason to be null...
    return (
        <Route path={path} {...rest}
               render={(props: any) => {
                   return user ? (<Component {...props} />)  : (<Redirect to ={ { pathname:'/login', state: {from: props.location} }}/>)
               }}
        />
    );

}
 
export default ProtectedRoute;