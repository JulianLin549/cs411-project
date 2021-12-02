import {Redirect, Route} from 'react-router-dom';
import {UserRole} from "../enums/UserRole";


const OfficerRoute = ({ component:Component, path, ...rest } : any) => {
    const localUserString = window.localStorage.getItem("current_user");
    console.log("currentUser", localUserString)
    let localUser = null
    if (localUserString) {
        localUser = JSON.parse(localUserString);
    }
    const isAdmin = localUser && localUser.roleId === UserRole.BUDGET_OFFICER;
    if (!isAdmin) {
        alert('User must be Budget Officer to view this page!')
        return (
            <Route path={path} {...rest}
                   render={(props: any) => {
                       return <Redirect to ={ { pathname:'/', state: {from: props.location} }}/>
                   }}
            />
        );
    }
    else {
        return (
            <Route path={path} {...rest}
                   render={(props: any) => {
                       return <Component {...props} />
                   }}
            />
        );
    }


}

export default OfficerRoute;