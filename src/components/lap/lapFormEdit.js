import React, {useState} from 'react'
import formModeEnum from "../../helpers/formHelper";
import LapForm from "./lapForm";

function LapFormEdit() {
    const [params, setParams] = useState({
        header: "Edytuj przejazd",
        buttonText: "Edytuj przejazd",
        formMode: formModeEnum.EDIT,
    })

    return (
        <div className={"main-content"}>
            <LapForm params={params}/>
        </div>
    )
}

export default LapFormEdit