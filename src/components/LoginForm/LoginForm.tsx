import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button, Grid} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import {makeStyles} from "@mui/styles";
import {useUser} from "../../Context/UserContext";
import {IUser} from "../../types/IUser";
import {UserRole} from "../../enums/UserRole";
import {setCookie} from "nookies";
const useStyles = makeStyles({
    input: {
        width: 400,
        margin: "100px 10px",
    }
});

export default function LoginField() {
    const classes = useStyles();

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useUser()!; // for any reason to be null...

    const handleUserIdChange = (event: any) => {
        setUserId(event.target.value);
    };
    const handleUserPasswordChange = (event: any) => {
        setPassword(event.target.value);
    };
    
    const handleLogin= async () => {
        try {
            const requestBody = {
                userId: userId,
                password: password
            };
            const response = await axios.post(process.env.REACT_APP_BASE_URL + `/login`, requestBody)
            const resUser = await response.data;
            const user: IUser = {
                userId: resUser.userId,
                userName: resUser.userName,
                email: resUser.email,
                roleId: resUser.roleId,
                accessToken: resUser.accessToken
            }


            await setUser(user);
            window.localStorage.setItem("current_user", JSON.stringify(user));
            window.localStorage.setItem("access_token", user.accessToken);
            window.localStorage.setItem("user_id", user.userId);

            //console.log(user);
            //window.location.reload();
        } catch (e) {
            alert("fail to login");
            window.location.reload();
        }
    };
    return (

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={4}>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="on"
                >
                    <Box m={2}>
                        <TextField id="standard-basic" label="UserID" className={classes.input} variant="standard"
                                   onChange={handleUserIdChange}/>
                    </Box>
                    <Box m={2}>
                        <TextField id="standard-basic" label="Password" className={classes.input} variant="standard" type="password"
                                   onChange={handleUserPasswordChange}/>
                    </Box>
                    <Box m={4}>
                        <Button variant="outlined" onClick={handleLogin}>
                            Login
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>

    );
}
