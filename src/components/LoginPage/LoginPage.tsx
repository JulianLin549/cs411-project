import React from 'react';
import LoginField from "../LoginForm/LoginForm";
import {Container} from "react-bootstrap";
import {Typography} from "@mui/material";
import {useUser} from "../../Context/UserContext";
import {useHistory} from "react-router-dom"

const LoginPage = () => {
    const history = useHistory();
    const {user} = useUser()!;
    if (user){
        history.push('/');
    }
    return (
        <div className="m-3 align-middle">
        <Container>
            <Typography variant="h3" gutterBottom component="div">
                Login
            </Typography>
            <hr/>
            <LoginField />
        </Container>
    </div>
    );
};

export default LoginPage;