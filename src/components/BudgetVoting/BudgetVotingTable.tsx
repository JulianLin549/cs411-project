import React, {useEffect, useState} from 'react';
import {makeStyles} from "@mui/styles";
import {Container} from "react-bootstrap";
import {Box, Stack, Typography} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import axios from "axios";
import {useUser} from "../../Context/UserContext";
import TextField from "@mui/material/TextField";
const useStyles = makeStyles({
    box: {
        margin: 20,
        verticalAlign: "middle",
        maxHeight: 300,
        overflowY: "scroll"
    },
    btnGroup: {
        margin: "5px 5px",
    }
});
type Props = {
    data: any,
    budgetId: number
}
const BudgetVotingTable = (props: Props) => {

    const { user } = useUser()!; // for any reason to be null...
    const [comment, setComment] = useState('');
    const [voted, setVoted] = useState(false);
    const [votedComment, setVotedComment] = useState('');

    const data = props.data;
    const approved = (data?.status === "Approved" || data?.status === "Rejected")
    const budgetSource = props.data.data;
    const budgetId = props.budgetId;

    useEffect(() => {
        async function fetch() {
            await handleGet()
        }
        fetch()
    })
    const handleGet = async () => {
        try {
            const userId = window.localStorage.getItem('user_id') || "";
            const accessToken = window.localStorage.getItem('access_token') || "";
            if (userId !== '' && accessToken !== ''){}

            const response = await axios.get(process.env.REACT_APP_BASE_URL + '/budget_plan/committee_response',
                {
                    params: {userId: user?.userId, budgetId: props.budgetId},
                    headers: {
                        userId: userId,
                        accessToken: accessToken
                    }
                });
            if (JSON.stringify(response.data) !== '{}'){
                setVoted(true)
                setVotedComment(response.data.comment)
            }
            console.log(response.data)

        } catch (e){
            alert('get data failed')
        }
    };
    const decision = async (vote: number) => {
        const requestBody = {
            budgetId: budgetId,
            userId: user?.userId,
            vote: vote,
            comment: comment
        }
        const userId = window.localStorage.getItem('user_id') || "";
        const accessToken = window.localStorage.getItem('access_token') || "";
        console.log(requestBody)
        await axios.post(process.env.REACT_APP_BASE_URL + `/budget_plan/committee_response`,
            requestBody,
            {
                headers: {
                    userId: userId,
                    accessToken: accessToken
                }
            })
        window.location.reload();
    }
    const handleInput = (e:any) => {
        setComment(e.target.value)
    }
    const classes = useStyles();
    return (
        <Box mb={6}>
            <Container>
                <Typography variant="overline" component="div">{`Budget Name: ${data.budgetName}`}</Typography>
                <Typography variant="overline" component="div">{`Sector Id: ${data.sectorId}`}</Typography>
                <Typography variant="overline" component="div">{`Sector Name: ${data.sectorName}`}</Typography>
                <Typography variant="overline" component="div">{`Start Date: ${data.startDate}`}</Typography>
                <Typography variant="overline" component="div">{`End Date: ${data.endDate}`}</Typography>
                <Typography variant="overline" component="div">{`Status: ${data.status}`}</Typography>
                <Box m={3} className={classes.box}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Budget Source Id</TableCell>
                                    <TableCell align="right">Budget Source Name</TableCell>
                                    <TableCell align="right">Earning Source Id</TableCell>
                                    <TableCell align="right">Earning Source Name</TableCell>
                                    <TableCell align="right">Year</TableCell>
                                    <TableCell align="right">Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {budgetSource && budgetSource.map((data: any) => (
                                    <TableRow
                                        key={data.budgetSourceId}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{data.budgetSourceId}</TableCell>
                                        <TableCell component="th" scope="row">{data.budgetSourceName}</TableCell>
                                        <TableCell component="th" scope="row">{data.sourceId}</TableCell>
                                        <TableCell component="th" scope="row">{data.sourceName}</TableCell>
                                        <TableCell component="th" scope="row">{data.year}</TableCell>
                                        <TableCell component="th" scope="row">{data.amount}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                {
                    approved ?
                        <Typography variant="h6" component="div">{`Budget Has Been ${data?.status}!`}</Typography> :


                        <Stack direction={"column"} spacing={2} className={classes.btnGroup}>
                            <Typography variant="h6" component="div" hidden={!voted}>{'You have voted'}</Typography>
                            <TextField
                                id="budget-comment-input"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                multiline
                                defaultValue={votedComment}
                                disabled={voted}
                                rows={5}
                                onChange={handleInput}
                            />
                            <Button variant="contained" color="success" size="large" onClick={()=>decision(1)} disabled={voted}>
                                Accept Budget
                            </Button>
                            <Button variant="contained" color="error" size="large" onClick={()=>decision(0)} disabled={voted}>
                                Decline Budget
                            </Button>
                        </Stack>


                }
                <hr/>
            </Container>
        </Box>
    );
};

export default BudgetVotingTable;
