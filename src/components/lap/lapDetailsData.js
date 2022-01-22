import React, {useState} from 'react';
import LapForm from "./lapForm";
import formModeEnum from "../../helpers/formHelper";

function LapDetailsData(props) {
    const lap = props.lapData

    const [params, setParams] = useState({
        header: "Szczegóły kierowcy",
        buttonText: "Edytuj",
        formMode: formModeEnum.DETAILS
    })


    return (
        <React.Fragment>
            <LapForm params={params}/>
        </React.Fragment>
    )
}

export default LapDetailsData