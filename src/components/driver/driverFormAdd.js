import React, {useState} from 'react'
import formModeEnum from "../../helpers/formHelper";
import DriverForm from "./driverForm";
import {useTranslation} from "react-i18next";

function DriverFormAdd() {
    const {t} = useTranslation();

    const [params, setParams] = useState({
        header: "add_driver",
        buttonText: "add_driver",
        formMode: formModeEnum.NEW
    })

    return (
        <div className={"main-content"}>
            <DriverForm params={params}/>
        </div>
    )
}

export default DriverFormAdd;