import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Typography} from "@mui/material";
import BudgetPlansTable from "./BudgetPlansTable";
import {Link as RouterLink} from "react-router-dom";
import Button from "@mui/material/Button";
import {makeStyles} from "@mui/styles";
const useStyles = makeStyles(() => ({
    routerLink: {
        fontSize: "1.25rem",
        color: "white",
        "&:hover": {
            color: "white"
        }
    }
}));
const BudgetPlans = () => {
    const classes = useStyles();

    const [budgetPlans, setBudgetPlans] = useState<any>(null);
    const [budgetPlanKeys, setBudgetPlanKeys] = useState<any>(null);
    const userString = window.localStorage.getItem("current_user");
    let user: any;
    if (userString != null && userString !== "null" && userString !== "undefined") {
        user = JSON.parse(userString);
    }
    useEffect(() => {
        async function fetch() {
            await handleGet()
        }
        fetch()
    })
    const handleGet = async () => {
        const userId = window.localStorage.getItem('user_id') || "";
        const accessToken = window.localStorage.getItem('access_token') || "";
        if (userId !== '' && accessToken !== ''){}
        const response = await axios.get(process.env.REACT_APP_BASE_URL + `/budget_plan?userId=${user?.userId}`,
            {
                headers: {
                    userId: userId,
                    accessToken: accessToken
                }
            });
        console.log(response.data);
        setBudgetPlans(response.data);
        setBudgetPlanKeys(Object.keys(response.data));

    };
    return (
        <>
            <Typography variant="h4" gutterBottom component="div">
                {`Budget Plans from ${user.userName}`}
            </Typography>
            {budgetPlanKeys && budgetPlanKeys.map((key:any)=>(
                <BudgetPlansTable data={budgetPlans[key]}/>
                ))}
            <Button variant={"contained"}  component={RouterLink} className={classes.routerLink}
                    to={'/init-budget'}>
                Initiate Budget
            </Button>
        </>
    );
};

export default BudgetPlans;
