import React, {useState} from 'react'
import formModeEnum from "../../helpers/formHelper";
import LapForm from "./lapForm";
import {useTranslation} from "react-i18next";

function LapFormAdd() {
    const {t} = useTranslation();

    const [params, setParams] = useState({
        header: t("new_lap"),
        buttonText: t("add_driver"),
        formMode: formModeEnum.NEW
    })

    return (
        <div className={"main-content"}>
            <LapForm params={params}/>
        </div>
    )
}

export default LapFormAdd;