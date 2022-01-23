import React, {useState} from 'react'
import formModeEnum from "../../helpers/formHelper";
import GokartForm from "./gokartForm";
import {useTranslation} from "react-i18next";

function GokartFormAdd() {
    const {t} = useTranslation();

    const [params, setParams] = useState({
        header: t("new_gokart"),
        buttonText: t("add_gokart"),
        formMode: formModeEnum.NEW
    })

    return (
        <div className={"main-content"}>
            <GokartForm params={params}/>
        </div>
    )
}

export default GokartFormAdd;