import React from 'react';
import {Link} from "react-router-dom";

function TableContent(props) {
    const records = props.params.records
    const headers = props.params.tableColumnHeaders
    const parentRoute = props.params.parentRoute;
    const cssClassName = props.params.cssClassName

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
                        return <td key={index}>{value}</td>
                    })}

                    <td>
                        <ul className="list-actions">
                            <li><Link to={`${parentRoute}/details/${record.id}`}><i className="fas fa-info"></i></Link></li>
                            <li><Link to={`${parentRoute}/edit/${record.id}`}><i className="far fa-edit"></i></Link></li>
                            <li><Link to={`${parentRoute}/delete/${record.id}`} onClick="return confirm('Are you sure you want to delete this item?');"><i className="far fa-trash-alt"></i></Link></li>
                        </ul>
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    )
}

export default TableContent