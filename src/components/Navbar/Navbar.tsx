import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {makeStyles} from "@mui/styles";
import {Link as RouterLink, useHistory} from 'react-router-dom';
import {useUser} from "../../Context/UserContext";
import {UserRole} from "../../enums/UserRole";
import {setCookie} from "nookies";


const useStyles = makeStyles(() => ({
    navbar:{
        backgroundColor: "#1b87cf"
    },
    grow: {
        flexGrow: 1,
    },
    routerLink: {
        fontSize: "1.25rem",
        color: "white",
        "&:hover": {
            color: "white"
        }
    },
    caption: {
        fontSize: "1px"
    }
}));
export default function NavBar() {
    const classes = useStyles();
    const {user, setUser} = useUser()!;
    const history = useHistory();

    const handleLogout = async () => {
        setUser(null);
        await setCookie(null, 'accessToken', '', {
            maxAge: -1,
            path: '/',
            secure: process.env.NODE_ENV === 'production',
        })
        await setCookie(null, 'userId', '', {
            maxAge: -1,
            path: '/',
            secure: process.env.NODE_ENV === 'production',
        })
        window.localStorage.removeItem("current_user");
        await history.push("/login");
    }
    return (
        <AppBar position="static">
            <Toolbar className={classes.navbar}>
                <Box m={2}>
                    <Typography variant="h6" component="div">
                        Budget Planner
                    </Typography>
                </Box>
                {user && user.roleId === UserRole.DEPARTMENT_HEAD && <Button color="inherit"
                                                                             component={RouterLink} className={classes.routerLink}
                                                                             to={'/user-management'}>
                    User Management
                </Button>}
                {user && user.roleId === UserRole.BUDGET_OFFICER && <Button color="inherit"
                                                                              component={RouterLink} className={classes.routerLink}
                                                                              to={'/budget-plans'}>
                    Budget Plans
                </Button>}
                {user && user.roleId === UserRole.BUDGET_OFFICER && <Button color="inherit"
                                                                            component={RouterLink} className={classes.routerLink}
                                                                            to={'/init-budget'}>
                    Init. Budget
                </Button>}
                {user && user.roleId === UserRole.COMMITTEE_MEMBER && <Button color="inherit"
                                                                             component={RouterLink} className={classes.routerLink}
                                                                             to={'/budget-voting'}>
                    Budget Voting
                </Button>}
                {user && user.roleId === UserRole.DEPARTMENT_HEAD && <Button color="inherit"
                                                                              component={RouterLink} className={classes.routerLink}
                                                                              to={'/budget-decision'}>
                    Budget Decision
                </Button>}
                {user  && <Button color="inherit" component={RouterLink} className={classes.routerLink}
                                  to={'/earning-source'}>
                    Earning Source
                </Button>}

                <div className={classes.grow}/>

                {!user && <Button color="inherit" component={RouterLink} className={classes.routerLink} to={'/login'}>Login</Button>}
                {user && <Box m={2}>
                    <Typography variant="body1" component="div">{`Hi, ${user.userName} `}</Typography>
                    <Typography variant="caption" component="div" className={classes.caption}>
                        {UserRole[user.roleId]}
                    </Typography>
                </Box>}
                {user && <Button color="inherit" onClick={handleLogout}>Logout</Button>}

            </Toolbar>
        </AppBar>
    );
}