import React, {useState} from 'react'
import formModeEnum from "../../helpers/formHelper";
import DriverForm from "./driverForm";
import {useTranslation} from "react-i18next";

function DriverFormEdit() {
    const {t} = useTranslation();

    const [params, setParams] = useState({
        header: "edit_driver",
        buttonText: "edit_driver",
        formMode: formModeEnum.EDIT,
    })

    return (
        <div className={"main-content"}>
            <DriverForm params={params}/>
        </div>
    )
}

export default DriverFormEdit