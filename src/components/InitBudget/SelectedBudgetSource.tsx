import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import {Container} from "react-bootstrap";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {makeStyles} from "@mui/styles";
import axios from "axios";
const useStyles = makeStyles({
    box: {
        margin: 20,
        verticalAlign: "middle",
        height: 300,
        overflowY: "scroll"
    }
});
const SelectedBudgetSource = () => {
    const classes = useStyles()!;
    const [earningSource, setEarningSource] = useState<Array<any> | null>(null);

    useEffect(() => {
        async function fetch() {
            await handleGet()
        }
        fetch()
    }, [])

    const handleGet = async () => {
        try {
            const userId = window.localStorage.getItem('user_id') || "";
            const accessToken = window.localStorage.getItem('access_token') || "";
            if (userId !== '' && accessToken !== ''){}

            const response = await axios.get(process.env.REACT_APP_BASE_URL + `/earning-source`,
                {
                    headers: {
                        userId: userId,
                        accessToken: accessToken
                    }
                });
            setEarningSource(response.data.data)
        } catch (e){
            alert('get data failed')
        }
    };
    return (
        <div>
            <Typography variant="h6" gutterBottom component="div">
                Selected Budget Source
            </Typography>
            <Container>
                <Box m={2} className={classes.box}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>id</TableCell>
                                    <TableCell align="right">Earning Source</TableCell>
                                    <TableCell align="right">Amount</TableCell>
                                    <TableCell align="right">Year</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {earningSource && earningSource.map((row) => (
                                    <TableRow
                                        key={row[0]}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{row[0]}</TableCell>
                                        <TableCell align="right">{row[1]}</TableCell>
                                        <TableCell align="right">{row[2]}</TableCell>
                                        <TableCell align="right">{row[3]}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Container>
        </div>
    );
};

export default SelectedBudgetSource;
