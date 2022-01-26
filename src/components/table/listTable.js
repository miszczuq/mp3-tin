import React from 'react'
import {Link} from 'react-router-dom'
import {useTranslation} from "react-i18next";

const ListTable = (props) => {
    const parentRoute = props.params.parentRoute;
    const header = props.params.header;
    const buttonText = props.params.buttonText;
    const table = props.content

    const {t} = useTranslation();

    return (
        <main>
            <div className="main-content">
                <h2>{t(header)}</h2>
                <div className="table-div">
                    {table}
                    <p className={"section-buttons"}>
                        <Link to={`${parentRoute}/add`} className="button-add">{t(buttonText)}</Link>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default ListTable;