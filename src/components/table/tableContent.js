import React, { useState } from 'react';
import {Link} from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import "react-confirm-alert/src/react-confirm-alert.css";
import {useTranslation} from "react-i18next";

function TableContent(props) {
    const records = props.params.records
    const headers = props.params.tableColumnHeaders
    const parentRoute = props.params.parentRoute;
    const cssClassName = props.params.cssClassName

    const {t} = useTranslation();

    const deleteConfirm = (recordId) => {
        confirmAlert({
            title: t("confirm_to_delete"),
            message: t("delete_question"),
            buttons: [
                {
                    label: t("yes"),
                    onClick: () => props.onDelete(recordId)
                },
                {
                    label: t("no")
                }
            ]
        })
    }

    return (
        <table className={`table-list ${cssClassName}`}>
            <thead>
            <tr>
                {headers.map((value,index) =>
                    <th key={index}>{t(value)}</th>
                )}
            </tr>
            </thead>
            <tbody>
            {records.map(record =>
                <tr key={record.id}>
                    {record.columns.map((value,index)=>{
                        if(value === true){
                            value = t("wet");
                        }
                        if(value === false){
                            value = t("dry");
                        }
                        return <td key={index}>{value}</td>
                    })}

                    <td>
                        <ul className="list-actions">
                            <li><Link to={`${parentRoute}/details/${record.id}`}><i className="fas fa-info"></i></Link></li>
                            <li><Link to={`${parentRoute}/edit/${record.id}`}><i className="far fa-edit"></i></Link></li>
                            <li><button onClick={ () => deleteConfirm(record.id)} className={"delete-button"}><i className="far fa-trash-alt"></i></button></li>
                        </ul>
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    )
}

export default TableContent