import React, {useEffect, useState} from "react";
import axios from "axios";
import {Typography} from "@mui/material";
import BudgetDecisionTable from "./BudgetDecisionTable";

const BudgetDecision = () => {

    const [budgetPlans, setBudgetPlans] = useState<any>(null);
    const [budgetPlanKeys, setBudgetPlanKeys] = useState<any>(null);

    useEffect(() => {
        async function fetch() {
            await handleGet()
        }
        fetch()
    }, [])
    const handleGet = async () => {
        const userId = window.localStorage.getItem('user_id') || "";
        const accessToken = window.localStorage.getItem('access_token') || "";
        if (userId !== '' && accessToken !== ""){
            const response = await axios.get(process.env.REACT_APP_BASE_URL + `/budget_plan/decision`,
                {
                    headers: {
                        userId: userId,
                        accessToken: accessToken
                    }
                });
            console.log(response.data);
            setBudgetPlans(response.data);
            setBudgetPlanKeys(Object.keys(response.data));
        }

    };
    return (
        <>
            <Typography variant="h4" gutterBottom component="div">
                Budget Decision
            </Typography>
            {budgetPlanKeys && budgetPlanKeys.map((key:any)=>(
                <BudgetDecisionTable data={budgetPlans[key]} budgetId={key}/>
            ))}
        </>
    );
};

export default BudgetDecision;
