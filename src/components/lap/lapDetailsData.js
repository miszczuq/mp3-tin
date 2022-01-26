import React, {useState} from 'react';
import LapForm from "./lapForm";
import formModeEnum from "../../helpers/formHelper";
import {useTranslation} from "react-i18next";

function LapDetailsData(props) {
    const {t} = useTranslation();
    const lap = props.lapData

    const [params, setParams] = useState({
        header: "driver_details",
        buttonText: "edit",
        formMode: formModeEnum.DETAILS
    })


    return (
        <React.Fragment>
            <LapForm params={params}/>
        </React.Fragment>
    )
}

export default LapDetailsData