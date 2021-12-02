import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button, Grid, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";

const signs = ['=', '>', '<', '>=', '<='];
interface Map<T> {
    [K: string]: T;
}


type Props = {
    setEarningSource: Function
}
export default function EarningSourceField(props: Props) {
    useEffect(() => {
        async function fetch() {
            await handleSearchSubmit()
        }
        fetch()
    })
    const [amountSign, setAmountSign] = useState('=');
    const [yearSign, setYearSign] = useState('=');

    const [searchEarningSource, setSearchEarningSource] = useState('');
    const [searchAmount, setSearchAmount] = useState('');
    const [searchYear, setSearchYear] = useState('');

    const [insertEarningSource, setInsertEarningSource] = useState('');
    const [insertAmount, setInsertAmount] = useState('');
    const [insertYear, setInsertYear] = useState('');

    const handleAmountSignChange = (event: any) => {
        setAmountSign(event.target.value);
    };
    const handleYearSignChange = (event: any) => {
        setYearSign(event.target.value);
    };
    const handleSearchEarningSourceChange = (event: any) => {
        setSearchEarningSource(event.target.value);
    };
    const handleSearchYearChange = (event: any) => {
        setSearchYear(event.target.value);
    };
    const handleSearchAmountChange = (event: any) => {
        setSearchAmount(event.target.value);
    };
    const handleInsertEarningSourceChange = (event: any) => {
        setInsertEarningSource(event.target.value);
    };
    const handleInsertYearChange = (event: any) => {
        setInsertYear(event.target.value);
    };
    const handleInsertAmountChange = (event: any) => {
        setInsertAmount(event.target.value);
    };
    const handleSearchSubmit = async () => {
        let params: Map<string> = {};
        if (searchEarningSource !== ''){
            params["sourceName"] = searchEarningSource;
        }
        if (searchAmount !== ''){
            params["amount"]= amountSign + searchAmount;
        }
        if (searchYear !== ''){
            params["year"]= yearSign + searchYear;
        }

        try {
            const userId = window.localStorage.getItem('user_id') || "";
            const accessToken = window.localStorage.getItem('access_token') || "";

            const response = await axios.get(process.env.REACT_APP_BASE_URL + `/earning-source`,
                {
                    params: params,
                    headers: {
                        userId: userId,
                        accessToken: accessToken
                    }
                });
            props.setEarningSource(response.data.data)
        } catch (e){
            alert('get data failed')
        }
    };
    const handleInsertSubmit = async () => {
        if (!insertEarningSource || !insertAmount || !insertYear){
            alert("input field cannot be empty");
            return
        }
        try {
            const requestBody = {
                "sourceName": insertEarningSource,
                "amount": insertAmount,
                "year": insertYear
            };
            const userId = window.localStorage.getItem('user_id') || "";
            const accessToken = window.localStorage.getItem('access_token') || "";
            await axios.post(process.env.REACT_APP_BASE_URL + `/earning-source`,
                requestBody,
                {
                    headers: {
                        userId: userId,
                        accessToken: accessToken
                    }
                })
            alert(`insert sourceName: ${insertEarningSource}, amount: ${insertAmount}, year:${insertYear} success!`)
            window.location.reload();

        } catch (e) {
            alert("fail to add new earning source")
        }
    };
    return (

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={2}>
                <Typography variant="h6" gutterBottom component="div">
                    Search
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
                        <TextField id="standard-basic" label="Earning Source" style = {{width: 400}} variant="standard"
                                   onChange={handleSearchEarningSourceChange}/>
                    </div>
                    <div>
                        <TextField
                            id="standard-select-currency-native"
                            select
                            label="Amount"
                            value={amountSign}
                            onChange={handleAmountSignChange}
                            SelectProps={{
                                native: true,
                            }}
                            style = {{width: 60}}
                            variant="standard"
                        >
                            {signs.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </TextField>
                        <TextField id="standard-basic" label="Amount" variant="standard" style = {{width: 320}}
                            onChange={handleSearchAmountChange}
                        />
                    </div>
                    <div>
                        <TextField
                            id="standard-select-currency-native"
                            select
                            label="Year"
                            value={yearSign}
                            onChange={handleYearSignChange}
                            SelectProps={{
                                native: true,
                            }}
                            style = {{width: 60}}
                            variant="standard"
                        >
                            {signs.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </TextField>
                        <TextField id="standard-basic" label="Year" variant="standard" style = {{width: 320}}
                                   onChange={handleSearchYearChange}/>
                    </div>
                    <Box m={2}>
                        <Button variant="outlined" onClick={handleSearchSubmit}>
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="h6" gutterBottom component="div">
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
                        <TextField id="standard-basic" label="Earning Source" style = {{width: 400}} variant="standard"
                                   onChange={handleInsertEarningSourceChange}/>
                    </div>
                    <div>
                        <TextField id="standard-basic" label="Amount" variant="standard" style = {{width: 400}}
                                   onChange={handleInsertAmountChange}/>
                    </div>
                    <div>
                        <TextField id="standard-basic" label="Year" variant="standard" style = {{width: 400}}
                                   onChange={handleInsertYearChange}/>
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
