import React, {useState} from 'react'
import formModeEnum from "../../helpers/formHelper";
import LapForm from "./lapForm";

function LapFormAdd() {

    const [params, setParams] = useState({
        header: "Nowy przejazd",
        buttonText: "Dodaj przejazd",
        formMode: formModeEnum.NEW
    })

    return (
        <div className={"main-content"}>
            <LapForm params={params}/>
        </div>
    )
}

export default LapFormAdd;