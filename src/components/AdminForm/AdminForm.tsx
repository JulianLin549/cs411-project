import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button, Grid, Typography} from "@mui/material";
import Select from 'react-select';
import {useState} from "react";
import axios from "axios";


const signs = ['=', '>', '<', '>=', '<='];

const actions = [
    { label: "Budget Officer", value: 1 },
    { label: "Budget Committee Member", value: 2 },
    { label: "Department Head", value: 3 }
  ];

type EarningSourceResponse = {
}

export default function EarningSourceField() {

    const [searchEarningSource, setSearchEarningSource] = useState('');
    const [searchAmount, setSearchAmount] = useState('');
    const [searchYear, setSearchYear] = useState('');

    const [insertUserName, setInsertUserName] = useState('');
    const [insertEmail, setInsertEmail] = useState('');
    const [insertPassword, setInsertPassword] = useState('');

    
    const handleInsertUserNameChange = (event: any) => {
        setInsertUserName(event.target.value);
    };
    const handleInsertEmailChange = (event: any) => {
        setInsertEmail(event.target.value);
    };
    const handleInsertPasswordChange = (event: any) => {
        setInsertPassword(event.target.value);
    };
    
    const handleInsertSubmit = async () => {
        try {
            const requestBody = {
                userName: insertUserName,
                email: insertEmail,
                password: insertPassword
            };
            const userId = window.localStorage.getItem('user_id') || "";
            const accessToken = window.localStorage.getItem('access_token') || "";
            await axios.post(process.env.PUBLIC_BE_URL + `/api/v1/earningSource`,
                requestBody,
                {
                    headers: {
                        userId: userId,
                        accessToken: accessToken
                    }
                })
            //window.location.reload();
        } catch (e) {
            alert("fail to add new earning source")
        }
    };
    return (

        <Grid container justifyContent="center" columns={{ xs: 4, sm: 8, md: 12 }}>
           
            <Grid item xs={2}>
                <Typography variant="h6" gutterBottom component="div">
                    Add an User
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
                                   onChange={handleInsertUserNameChange}/>
                    </div>
                    <div>
                        <TextField id="standard-basic" label="Emalil" variant="standard" style = {{width: 400}}
                                   onChange={handleInsertEmailChange}/>
                    </div>
                    <div>
                        <TextField id="standard-basic" label="Password" type="password" variant="standard" style = {{width: 400}}
                                   onChange={handleInsertPasswordChange}/>
                    </div>

                    <div>
                        <br></br>
                    <Grid container justifyContent="center"  columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item md={1}>
                            Role
                        </Grid>
                        <Grid item md={8}>
                            <Select options={ actions }/>
                        </Grid>
                    </Grid>
                        
                    </div>
                    <Box m={2}>
                        <Button variant="outlined" onClick={handleInsertSubmit}>
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>

    );
}
