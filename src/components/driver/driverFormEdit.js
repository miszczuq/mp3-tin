import React, {useState} from 'react'
import formModeEnum from "../../helpers/formHelper";
import DriverForm from "./driverForm";
import {useTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";
import {useNavigate} from "react-router-dom";

function DriverFormEdit() {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const [params, setParams] = useState({
        header: "edit_driver",
        buttonText: "edit_driver",
        formMode: formModeEnum.EDIT,
    })

    return (
        !isAuthenticated() ?
            <React.Fragment>{
                navigate('/users/login')
            }</React.Fragment> :

            <div className={"main-content"}>
                <DriverForm params={params}/>
            </div>
    )
}

export default DriverFormEdit