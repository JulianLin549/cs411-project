import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Typography} from "@mui/material";
import BudgetVotingTable from "./BudgetVotingTable";

const BudgetVotingPage = () => {
    const [budgetPlans, setBudgetPlans] = useState<any>(null);
    const [budgetPlanKeys, setBudgetPlanKeys] = useState<any>(null);

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

            const response = await axios.get(process.env.REACT_APP_BASE_URL + '/budget_plan/voting',
                {
                    headers: {
                        userId: userId,
                        accessToken: accessToken
                    }
                });
            console.log(response.data)
            setBudgetPlans(response.data);
            setBudgetPlanKeys(Object.keys(response.data));

        } catch (e){
            alert('get data failed')
        }
    };
    return (
        <>
            <Typography variant="h4" gutterBottom component="div">
                Budget Voting
            </Typography>
            {budgetPlanKeys && budgetPlanKeys.map((key:any)=>(
                <BudgetVotingTable data={budgetPlans[key]} budgetId={key}/>
            ))}
        </>

    );
};

export default BudgetVotingPage;
