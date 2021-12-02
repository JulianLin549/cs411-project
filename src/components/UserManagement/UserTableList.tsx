import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import {UserRole} from "../../enums/UserRole";
import {useUser} from "../../Context/UserContext";

export default function UserTableList() {
    const { user } = useUser()!;
    const [userList, setUserList] = useState<Array<any>>([]);
    const [deleteId, setDeleteId] = useState<any>(null);
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<any>([]);
    const [updateOpen, setUpdateOpen] = useState<boolean>(false);
    const handleClose = async () => {
        setDeleteOpen(false);
        setUpdateOpen(false);
    }
    useEffect(() => {
        async function fetch() {
            await handleUserGet()
        }
        fetch()
    }, [])
    const handleUserGet = async () => {
        try {
            const userId = window.localStorage.getItem('user_id') || "";
            const accessToken = window.localStorage.getItem('access_token') || "";
            const response = await axios.get(process.env.REACT_APP_BASE_URL + `/user`, {
                headers: {
                    userId: userId,
                    accessToken: accessToken
                }
            });
            setUserList(response.data.users)
        } catch (e){
            console.log("get data fail")
        }
    };
    const handleDeleteBtnClick = async (id:string) => {
        setDeleteId(id);
        setDeleteOpen(true);
    };
    const handleUpdateBtnClick = async (row: any) => {
        setUserInfo(row);
        setUpdateOpen(true)
    }
    const handleDelete = async () => {
        try {
            const requestBody = {
                "userId": deleteId
            };
            const userId = window.localStorage.getItem('user_id') || "";
            const accessToken = window.localStorage.getItem('access_token') || "";
            await axios.delete(process.env.REACT_APP_BASE_URL + `/user`,
                {
                    data: requestBody,
                    headers: {
                        userId: userId,
                        accessToken: accessToken
                    }
                });
            alert(`delete user: ${deleteId} success!`);
            setDeleteOpen(false);
            setUpdateOpen(false);
            window.location.reload();
        } catch (e) {
            setDeleteOpen(false);
            setUpdateOpen(false);
            alert("fail to add new earning source")
        }

    }

    const handleUpdate = async () => {
        const newArr = userInfo;
        if (!newArr[0] || !newArr[1] || !newArr[2] || !newArr[3] || !newArr[4]){
            alert('input cannot be empty')
            return
        }
        if (!(newArr[4] in UserRole)){
            alert('roleId not valid')
            return
        }
        try {
            const requestBody = {
                "userId": newArr[0],
                "userName": newArr[1],
                "email": newArr[2],
                "password":newArr[3],
                "roleId": newArr[4],
            };
            const userId = window.localStorage.getItem('user_id') || "";
            const accessToken = window.localStorage.getItem('access_token') || "";
            await axios.put(process.env.REACT_APP_BASE_URL + `/user`,
                requestBody,
                {
                    headers: {
                        userId: userId,
                        accessToken: accessToken
                    }
                });
            alert(`update userId: ${newArr[0]} success!`);
            setDeleteOpen(false);
            setUpdateOpen(false);
            window.location.reload();
        } catch (e) {
            setDeleteOpen(false);
            setUpdateOpen(false);
            alert("fail to update earning source")
        }
    }
    const handleUserNameUpdate = async (event: any) => {
        const newArr = userInfo;
        newArr[1] = event.target.value;
        setUserInfo(newArr);
    };
    const handleEmailUpdate = async (event: any) => {
        const newArr = userInfo;
        newArr[2] = event.target.value;
        setUserInfo(newArr);
    };
    const handlePasswordUpdate = async (event: any) => {
        const newArr = userInfo;
        newArr[3] = event.target.value;
        setUserInfo(newArr);
    };
    const handleRoleIdUpdate = async (event: any) => {
        const newArr = userInfo;
        newArr[4] = event.target.value;
        setUserInfo(newArr);
    };
    return (
        <Box m={2}>
            <Typography variant="h5" gutterBottom component="div">
                Users
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">User Id</TableCell>
                            <TableCell align="right">User Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Role</TableCell>
                            <TableCell align="right">Edit Options</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userList.map((row) => (
                            <TableRow
                                key={1}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="right">{row[0]}</TableCell>
                                <TableCell align="right">{row[1]}</TableCell>
                                <TableCell align="right">{row[2]}</TableCell>
                                <TableCell align="right">{row[4]}</TableCell>

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
                    {`Are you sure you want to delete user ${deleteId} ?`}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleDelete} variant="outlined" autoFocus color="error" >
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
                    {`Update user ${userInfo[0]}.`}
                </DialogTitle>
                <DialogContent>
                    <TextField id="standard-basic" label="User Name" variant="standard" style = {{width: 320}}
                               defaultValue={userInfo[1]} onChange={handleUserNameUpdate}/>
                    <TextField id="standard-basic" label="Email" variant="standard" style = {{width: 320}}
                               defaultValue={userInfo[2]} onChange={handleEmailUpdate}/>
                    <TextField id="standard-basic" label="Password" variant="standard" style = {{width: 320}}
                               defaultValue={userInfo[3]} type="password"  onChange={handlePasswordUpdate}/>
                    <TextField id="standard-basic" label="RoleId" variant="standard" style = {{width: 320}}
                               defaultValue={userInfo[4]} onChange={handleRoleIdUpdate}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus color={"info"} >
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} variant="contained">Update</Button>

                </DialogActions>
            </Dialog>
        </Box>

    );
}
