import React, { useState } from 'react';
import {Link} from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import "react-confirm-alert/src/react-confirm-alert.css";

function TableContent(props) {
    const records = props.params.records
    const headers = props.params.tableColumnHeaders
    const parentRoute = props.params.parentRoute;
    const cssClassName = props.params.cssClassName

    const deleteConfirm = (recordId) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this record?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => props.onDelete(recordId)
                },
                {
                    label: 'No'
                }
            ]
        })
    }

    return (
        <table className={`table-list ${cssClassName}`}>
            <thead>
            <tr>
                {headers.map((value,index) =>
                    <th key={index}>{value}</th>
                )}
            </tr>
            </thead>
            <tbody>
            {records.map(record =>
                <tr key={record.id}>
                    {record.columns.map((value,index)=>{
                        if(value === true){
                            value = 'mokra';
                        }
                        if(value === false){
                            value = 'sucha';
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