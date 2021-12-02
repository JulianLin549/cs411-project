import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import {makeStyles} from "@mui/styles";
const useStyles = makeStyles({
    box: {
        margin: 20,
        verticalAlign: "middle",
        height: 300,
        overflowY: "scroll"
    }
});
type Props = {
    earningSource: Array<any> | null,
    setEarningSource: Function
}
export default function DenseTable(props: Props) {
    const classes = useStyles()!;

    const data = props.earningSource;
    const [updateInfo, setUpdateInfo] = useState<any>([]);
    const [deleteId, setDeleteId] = useState<any>(null);
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
    const [updateOpen, setUpdateOpen] = useState<boolean>(false);
    const handleUpdateBtnClick = async (row: any) => {
        setUpdateInfo(row);
        setUpdateOpen(true)
    }
    const handleDeleteBtnClick = async (id:string) => {
        setDeleteId(id);
        setDeleteOpen(true);
    }
    const handleSourceNameChange = async (event: any) => {
        const newArr = updateInfo;
        newArr[1] = event.target.value;
        setUpdateInfo(newArr);
    };
    const handleAmountChange = async (event: any) => {
        const newArr = updateInfo;
        newArr[2] = event.target.value;
        setUpdateInfo(newArr);
    };
    const handleYearChange = async (event: any) => {
        const newArr = updateInfo;
        newArr[3] = event.target.value;
        setUpdateInfo(newArr);
    };

    const handleDelete = async () => {
        try {
            const requestBody = {
                "sourceId": deleteId
            };
            const userId = window.localStorage.getItem('user_id') || "";
            const accessToken = window.localStorage.getItem('access_token') || "";
            await axios.delete(process.env.REACT_APP_BASE_URL + `/earning-source`,
                {
                    data: requestBody,
                    headers: {
                        userId: userId,
                            accessToken: accessToken
                    }
                });
            alert(`delete sourceId: ${deleteId} success!`);
            setDeleteOpen(false);
            setUpdateOpen(false);
            props.setEarningSource(null);
            window.location.reload();
        } catch (e) {
            setDeleteOpen(false);
            setUpdateOpen(false);
            alert("fail to add new earning source")
        }

    }

    const handleUpdate = async () => {
        const newArr = updateInfo;
        try {
            const requestBody = {
                "sourceId": newArr[0],
                "amount": newArr[2],
                "year": newArr[3]
            };
            console.log(requestBody)
            const userId = window.localStorage.getItem('user_id') || "";
            const accessToken = window.localStorage.getItem('access_token') || "";
            await axios.put(process.env.REACT_APP_BASE_URL + `/earning-source`,
                requestBody,
                {
                    headers: {
                        userId: userId,
                        accessToken: accessToken
                    }
                });
            alert(`update sourceId: ${newArr[0]} success!`);
            setDeleteOpen(false);
            setUpdateOpen(false);
            props.setEarningSource(null);
            window.location.reload();
        } catch (e) {
            setDeleteOpen(false);
            setUpdateOpen(false);
            alert("fail to update earning source")
        }
    }
    const handleClose = async () => {
        setDeleteOpen(false);
        setUpdateOpen(false);
    }
    return (
        <Box m={2} className={classes.box}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell align="right">Earning Source</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Year</TableCell>
                            <TableCell align="right">Edit Options</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map((row) => (
                            <TableRow
                                key={row[0]}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row[0]}</TableCell>
                                <TableCell align="right">{row[1]}</TableCell>
                                <TableCell align="right">{row[2]}</TableCell>
                                <TableCell align="right">{row[3]}</TableCell>
                                <TableCell align="right">
                                    <Button variant="outlined" size="small" onClick={() => handleUpdateBtnClick(row)}>
                                        update
                                    </Button>
                                    <Button variant="outlined" size="small" color="error" onClick={() => handleDeleteBtnClick(row[0])}>
                                        delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={deleteOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Are you sure you want to delete record ${deleteId} ?`}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleDelete} autoFocus color="error" >
                        Yes
                    </Button>
                    <Button onClick={handleClose} variant="contained">No</Button>

                </DialogActions>
            </Dialog>
            <Dialog
                open={updateOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Update row ${updateInfo[0]}.`}
                </DialogTitle>
                <DialogContent>
                    <TextField id="standard-basic" label="Source Name" variant="standard" style = {{width: 320}}
                               defaultValue={updateInfo[1]} onChange={handleSourceNameChange}/>
                    <TextField id="standard-basic" label="Amount" variant="standard" style = {{width: 320}}
                               defaultValue={updateInfo[2]} onChange={handleAmountChange}/>
                    <TextField id="standard-basic" label="Year" variant="standard" style = {{width: 320}}
                               defaultValue={updateInfo[3]} onChange={handleYearChange}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus color={"info"} >
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} variant="contained">Yes</Button>

                </DialogActions>
            </Dialog>
        </Box>

    );
}
