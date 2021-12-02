import {useState} from 'react';
import EarningSourceForm from "./EarningSourceForm";
import EarningSourceTableList from "./EarningSourceTableList";
import {Container} from "react-bootstrap";
import {Typography} from "@mui/material";

type Props = {
    earningSourceForm: Boolean
}
const EarningSource = (props:Props) => {
    const [earningSource, setEarningSource] = useState<Array<any> | null>(null);
    return (
        <div className="m-3 align-middle">
            <Container>
                <Typography variant="h3" gutterBottom component="div">
                    Earning Source
                </Typography>
                <hr/>

                <EarningSourceForm setEarningSource={setEarningSource}/>
                <hr/>

                <Typography variant="h4" gutterBottom component="div">
                    Result
                </Typography>
                <EarningSourceTableList earningSource={earningSource} setEarningSource={setEarningSource}/>
            </Container>
        </div>
    );
};

export default EarningSource;
