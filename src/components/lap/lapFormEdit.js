import React, {useState} from 'react'
import formModeEnum from "../../helpers/formHelper";
import LapForm from "./lapForm";
import {useTranslation} from "react-i18next";

function LapFormEdit() {
    const {t} = useTranslation();
    const [params, setParams] = useState({
        header: t("edit_lap"),
        buttonText: t("edit_lap"),
        formMode: formModeEnum.EDIT,
    })

    return (
        <div className={"main-content"}>
            <LapForm params={params}/>
        </div>
    )
}

export default LapFormEdit