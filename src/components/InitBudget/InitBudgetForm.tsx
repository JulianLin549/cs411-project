import React, {useEffect, useState} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import {Container} from "react-bootstrap";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {makeStyles} from "@mui/styles";

import axios from "axios";
import {useUser} from "../../Context/UserContext";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
    box: {
        margin: 20,
        verticalAlign: "middle",
        height: 300,
        overflowY: "scroll"
    },
    btn: {
        margin: 10,
        float: "right"
    }
});
type Props = {
    budgetSource: any,
    setBudgetSource: Function,
    earningSource: Array<any> | null
};
const InitBudgetForm = (props: Props) => {
    const history = useHistory();
    const {user} = useUser()!;
    const classes = useStyles()!;
    let selectedBudgetSource = props.budgetSource;
    let earningSource = props.earningSource;
    const [sectorId, setSectorId] = useState('');
    const [budgetName, setBudgetName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);


    useEffect(()=>{

    }, [selectedBudgetSource])

    const handleSubmit = async () => {
        let budgetSource: Array<any> = []
        selectedBudgetSource.forEach((row: any) => {
            let obj = {
                sourceId: row[0],
                budgetSourceName: row[1],
                amount: row[2]
            }
            budgetSource.push(obj)
            console.log(budgetSource)
        })
        try {
            const requestBody = {
                sectorId: sectorId,
                userId: user?.userId,
                budgetName: budgetName,
                startDate: startDate,
                endDate:endDate,
                budgetSources: budgetSource
            }
            const userId = window.localStorage.getItem('user_id') || "";
            const accessToken = window.localStorage.getItem('access_token') || "";
            if (userId !== '' && accessToken !== ''){}

            await axios.post(process.env.REACT_APP_BASE_URL + `/budget_plan`,
                requestBody,
                {
                    headers: {
                        userId: userId,
                        accessToken: accessToken
                    }
                })
            const res2 = await axios.get(process.env.REACT_APP_BASE_URL + `/budget_plan`,
                {
                    params: {userId: user?.userId},
                    headers: {
                        userId: userId,
                        accessToken: accessToken
                    }
                })
            console.log(res2.data)
            history.push('/budget-plans')
        }catch (e) {
            alert("Problem adding budget plan")
        }
    }
    const handleSourceNameChange = (index: number) => (e: any) => {
        let arr = JSON.parse(JSON.stringify(selectedBudgetSource));
        arr.forEach((row:any) => {
            if(row[0] === index){
                row[1] = e.target.value
            }
        })
        props.setBudgetSource(arr)
    }
    const handleAmountChange = (index: number) => (e: any) => {
        let total = 0
        let amount = parseInt(e.target.value);
        if (earningSource && earningSource[index]) {
            if (amount > earningSource[index][2]) {
                e.target.value = earningSource[index][2];
                amount = earningSource[index][2]
                alert("Budget amount cannot exceed earning source")
            }
        }
        let arr = JSON.parse(JSON.stringify(selectedBudgetSource));
        arr.forEach((row:any) => {
            if(row[0] === index){
                row[2] = amount
            }
            total = total + row[2]
        })
        setTotalAmount(total)
        props.setBudgetSource(arr)
    }

    const handleRemove = (index: number) => (e: any) => {
        let arr = selectedBudgetSource.filter((item:any) => item[0] !== index)
        props.setBudgetSource(arr)
        let total = 0;
        arr.forEach((row:any) => {
            total = total + row[2]
        })
        setTotalAmount(total)
    }
    const handleSectorIdInput = (e: any) => {
        setSectorId(e.target.value)
    }
    const handleBudgetNameInput = (e: any) => {
        setBudgetName(e.target.value)
    }
    const handleStartDateInput = (e: any) => {
        setStartDate(e.target.value)
    }
    const handleEndDateInput = (e: any) => {
        setEndDate(e.target.value)
    }
    return (
        <Container>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 3, width: '30ch' },
                }}
                noValidate
                autoComplete="on"
                m={4}
            >
                <Box m={2}>
                    <Typography variant="h6" gutterBottom component="div">
                        Initialize Budget
                    </Typography>
                    <TextField
                        required
                        id="standard-required"
                        label="SectorId"
                        variant="standard"
                        onChange={handleSectorIdInput}
                    />
                    <TextField
                        required
                        id="standard-required"
                        label="Budget Name"
                        variant="standard"
                        onChange={handleBudgetNameInput}

                    />
                    <TextField
                        required
                        id="standard-required"
                        label="Start Date"
                        placeholder="11/27/2020"
                        variant="standard"
                        onChange={handleStartDateInput}

                    />
                    <TextField
                        required
                        id="standard-required"
                        label="End Date"
                        placeholder="11/27/2020"
                        variant="standard"
                        onChange={handleEndDateInput}
                    />
                </Box>


                <Box m={2}
                     component="form"
                     sx={{
                         '& .MuiTextField-root': { m: 2, width: '30ch' },
                     }}
                >
                    <Typography variant="h6" gutterBottom component="div">
                        Budget Source
                    </Typography>
                    <Typography variant="caption" gutterBottom component="div">
                        Click on Earning Source above to add budget source
                    </Typography>
                    <Container>
                        <Box m={2}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>From SourceId</TableCell>
                                            <TableCell align="right">Budget Source Name</TableCell>
                                            <TableCell align="right">Amount</TableCell>
                                            <TableCell align="right">Remove</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {selectedBudgetSource && selectedBudgetSource.map((row: any) => (
                                            <TableRow
                                                key={row[0]}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">{row[0]}</TableCell>
                                                <TableCell align="right">
                                                    <TextField
                                                        required
                                                        id="standard-required"
                                                        label="Budget Source Name"
                                                        variant="standard"
                                                        onChange={handleSourceNameChange(row[0])}
                                                     />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <TextField
                                                        required
                                                        id="standard-required"
                                                        label="Amount"
                                                        variant="standard"
                                                        onChange={handleAmountChange(row[0])}
                                                    />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Button variant={"outlined"} size={'small'} onClick={handleRemove(row[0])}>
                                                        X
                                                    </Button>
                                                </TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Container>
                    <Typography variant="body1" gutterBottom component="div">
                        {`Total Amount:  ${totalAmount}`}
                    </Typography>

                </Box>
                <Button variant="outlined" onClick={handleSubmit} size={'large'} className={classes.btn}>
                    Add Budget
                </Button>
            </Box>
        </Container>

    );
};

export default InitBudgetForm;
