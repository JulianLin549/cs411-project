import './App.css';
import {Route, Switch} from 'react-router-dom';
import MainPage from "./components/MainPage/MainPage";
import UserManagement from "./components/UserManagement/UserManagement";
import LoginPage from "./components/LoginPage/LoginPage";
import EarningSource from "./components/EarningSource/EarningSource";
import HeadRoute from './Protected/HeadRoute';
import CommitteeRoute from "./Protected/CommitteeRoute";
import Navbar from "./components/Navbar/Navbar";
import {Box} from "@mui/material";
import OfficerRoute from "./Protected/OfficerRoute";
import InitBudget from "./components/InitBudget/InitBudget";
import BudgetPlans from "./components/BudgetPlans/BudgetPlans";
import BudgetDecision from "./components/BudgetDecision/BudgetDecision";
import BudgetVoting from "./components/BudgetVoting/BudgetVoting";

function App() {
    return (
        <div className="App">
            <Navbar/>
            <Box mt={6}>
                <Switch>
                    <Route exact path="/" component={MainPage}/>
                    <Route path="/earning-source">
                        <EarningSource earningSourceForm={true} />
                    </Route>

                    <Route path="/login" component={LoginPage}/>

                    <OfficerRoute path="/budget-plans" component={BudgetPlans}/>
                    <OfficerRoute path="/init-budget" component={InitBudget}/>
                    <CommitteeRoute path="/budget-voting" component={BudgetVoting}/>
                    <HeadRoute path="/user-management" component={UserManagement}/>
                    <HeadRoute path="/budget-decision" component={BudgetDecision}/>

                </Switch>

            </Box>

        </div>
  );
}

export default App;
