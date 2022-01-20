import React, {useState} from 'react'
import formModeEnum from "../../helpers/formHelper";
import GokartForm from "./gokartForm";

function GokartFormAdd() {

    const [params, setParams] = useState({
        header: "Nowy gokart",
        buttonText: "Dodaj gokart",
        formMode: formModeEnum.NEW
    })

    return (
        <div className={"main-content"}>
            <GokartForm params={params}/>
        </div>
    )
}

export default GokartFormAdd;