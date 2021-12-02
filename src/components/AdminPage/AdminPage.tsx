import React from 'react';
import FormField from "../AdminForm/AdminForm";
import {Container} from "react-bootstrap";
import {Typography} from "@mui/material";
// import TableList from "../TableList/UserTableList";

const AdminPage = () => {
    return (
        <div className="m-3 align-middle">
        <Container>
            <Typography variant="h3" gutterBottom component="div">
                Admin Page
            </Typography>
            <hr/>
            <FormField />

            <Typography variant="h4" gutterBottom component="div">
                User List
            </Typography>
            {/*<TableList />*/}
        </Container>
    </div>
    );
};

export default AdminPage;