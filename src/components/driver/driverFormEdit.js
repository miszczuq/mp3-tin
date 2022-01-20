import React, {useState} from 'react'
import formModeEnum from "../../helpers/formHelper";
import DriverForm from "./driverForm";

function DriverFormEdit() {
    const [params, setParams] = useState({
        header: "Edytuj kierowcę",
        buttonText: "Edytuj kierowcę",
        formMode: formModeEnum.EDIT,
    })

    return (
        <div className={"main-content"}>
            <DriverForm params={params}/>
        </div>
    )
}

export default DriverFormEdit