import React from 'react';
import {Typography} from "@mui/material";
import {Container} from "react-bootstrap";
import InsertUserForm from "./InsertUserForm";
import UserTableList from "./UserTableList";
import {useUser} from "../../Context/UserContext";

const UserManagement = () => {
    const { user } = useUser()!;
    console.log(user)
    return (
        <div className="m-3 align-middle">
            <Container>
                <Typography variant="h3" gutterBottom component="div">
                    User Management
                </Typography>
                <hr/>
                <InsertUserForm />
                <hr/>
                <UserTableList/>
            </Container>
        </div>
    );
};

export default UserManagement;
