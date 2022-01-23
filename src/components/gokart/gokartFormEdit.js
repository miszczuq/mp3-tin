import React, {useState} from 'react'
import formModeEnum from "../../helpers/formHelper";
import GokartForm from "./gokartForm";
import {useTranslation} from "react-i18next";

function GokartFormEdit() {
    const {t} = useTranslation();

    const [params, setParams] = useState({
        header: t("edit_gokart"),
        buttonText: t("edit_gokart"),
        formMode: formModeEnum.EDIT,
    })

    return (
        <div className={"main-content"}>
            <GokartForm params={params}/>
        </div>
    )
}

export default GokartFormEdit