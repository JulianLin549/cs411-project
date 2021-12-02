import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import InitBudgetForm from "./InitBudgetForm";

import EarningSourceTable from "./EarningSourceTable";
const InitBudget = () => {
    const [selectedBudgetSource, setSelectedBudgetSource] = useState<Array<any>>([]);
    const [earningSource, setEarningSource] = useState<Array<any> | null>(null);

    useEffect(() => { setSelectedBudgetSource(selectedBudgetSource) }, [selectedBudgetSource]);
    return (
        <div>
            <Typography variant="h4" gutterBottom component="div">
                Initialize Budget Plan
            </Typography>
            <Typography variant="h6" gutterBottom component="div">
                Earning Source
            </Typography>
            <EarningSourceTable
                budgetSource={selectedBudgetSource}
                setBudgetSource={setSelectedBudgetSource}
                earningSource={earningSource}
                setEarningSource={setEarningSource}
            />
            <InitBudgetForm
                budgetSource={selectedBudgetSource}
                setBudgetSource={setSelectedBudgetSource}
                earningSource={earningSource}
            />
        </div>
    );
};

export default InitBudget;

