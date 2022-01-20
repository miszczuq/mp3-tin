import React, {useState} from 'react'
import formModeEnum from "../../helpers/formHelper";
import DriverForm from "./driverForm";

function DriverFormAdd() {

    const [params, setParams] = useState({
        header: "Nowy kierowca",
        buttonText: "Dodaj kierowcę",
        formMode: formModeEnum.NEW
    })

    return (
        <div className={"main-content"}>
            <DriverForm params={params}/>
        </div>
    )
}

export default DriverFormAdd;