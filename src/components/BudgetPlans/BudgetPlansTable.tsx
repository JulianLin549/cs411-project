import React from 'react';
import {Box, Typography} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Container} from "react-bootstrap";
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
    data: any
}
const BudgetPlansTable = (props: Props) => {
    const data = props.data;
    const budgetSource = props.data.data;
    console.log(budgetSource);

    const classes = useStyles();
    return (
        <Container>
            <Typography variant="overline" component="div">{`Budget Name: ${data.budgetName}`}</Typography>
            <Typography variant="overline" component="div">{`Sector Id: ${data.sectorId}`}</Typography>
            <Typography variant="overline" component="div">{`Sector Name: ${data.sectorName}`}</Typography>
            <Typography variant="overline" component="div">{`Start Date: ${data.startDate}`}</Typography>
            <Typography variant="overline" component="div">{`End Date: ${data.endDate}`}</Typography>
            <Typography variant="overline" component="div">{`Status: ${data.status}`}</Typography>
            <Box m={2} className={classes.box}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Budget Source Id</TableCell>
                                <TableCell align="right">Budget Source Name</TableCell>
                                <TableCell align="right">Earning Source Id</TableCell>
                                <TableCell align="right">Earning Source Name</TableCell>
                                <TableCell align="right">Year</TableCell>
                                <TableCell align="right">Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {budgetSource && budgetSource.map((data: any) => (
                                <TableRow
                                    key={data.budgetSourceId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{data.budgetSourceId}</TableCell>
                                    <TableCell component="th" scope="row">{data.budgetSourceName}</TableCell>
                                    <TableCell component="th" scope="row">{data.sourceId}</TableCell>
                                    <TableCell component="th" scope="row">{data.sourceName}</TableCell>
                                    <TableCell component="th" scope="row">{data.year}</TableCell>
                                    <TableCell component="th" scope="row">{data.amount}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
};

export default BudgetPlansTable;
