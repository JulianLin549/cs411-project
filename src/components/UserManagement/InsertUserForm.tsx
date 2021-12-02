import React, {useState} from 'react';
import axios from "axios";
import {Button, Grid, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {UserRole} from "../../enums/UserRole";
const InsertUserForm = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roleId, setRoleId] = useState('');


    const handleUserNameChange = (event: any) => {
        setUserName(event.target.value);
    };
    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };
    const handleRoleIdChange = (event: any) => {
        setRoleId(event.target.value);
    };

    const handleInsertSubmit = async () => {
        if (!userName || !email || !password || !roleId){
            alert("input field cannot be empty");
            return
        }
        if (!(roleId in UserRole)){
            alert('input not valid')
            return
        }
        try {
            const requestBody = {
                "userName": userName,
                "email": email,
                "password": password,
                "roleId": roleId

            };
            const userId = window.localStorage.getItem('user_id') || "";
            const accessToken = window.localStorage.getItem('access_token') || "";
            await axios.post(process.env.REACT_APP_BASE_URL + `/user`,
                requestBody,
                {
                    headers: {
                        userId: userId,
                        accessToken: accessToken
                    }
                })
            alert(`insert user: ${userName} success!`)
            window.location.reload();
        } catch (e) {
            alert("Failed to add new user")
        }
    };
    return (

        <Box m={2}>

            <Typography variant="h5" gutterBottom component="div">
                Insert
            </Typography>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField id="standard-basic" label="User Name" style = {{width: 400}} variant="standard"
                               onChange={handleUserNameChange}/>
                </div>
                <div>
                    <TextField id="standard-basic" label="Email" variant="standard" style = {{width: 400}}
                               onChange={handleEmailChange}/>
                </div>
                <div>
                    <TextField id="standard-basic" label="Password" variant="standard" style = {{width: 400}} type={"password"}
                               onChange={handlePasswordChange}/>
                </div>
                <div>
                    <TextField id="standard-basic" label="RoleId" variant="standard" style = {{width: 400}}
                               onChange={handleRoleIdChange}/>
                </div>
                <Box m={2}>
                    <Button variant="outlined" onClick={handleInsertSubmit}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </Box>

    );
};

export default InsertUserForm;
