import React, {useState} from 'react'
import formModeEnum from "../../helpers/formHelper";
import GokartForm from "./gokartForm";

function GokartFormEdit() {
    const [params, setParams] = useState({
        header: "Edytuj gokart",
        buttonText: "Edytuj gokart",
        formMode: formModeEnum.EDIT,
    })

    return (
        <div className={"main-content"}>
            <GokartForm params={params}/>
        </div>
    )
}

export default GokartFormEdit