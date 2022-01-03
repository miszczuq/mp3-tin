import React from 'react';
import {Link} from "react-router-dom";

function DriverListTableRow(props){
    const driver = props.driverData
    return (
        <tr>
            <td>{driver.first_name}</td>
            <td>{driver.last_name}</td>
            <td>{driver.weight}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/drivers/details/${driver.id}`}><i className="fas fa-info"></i></Link></li>
                    <li><Link to={`/drivers/edit/${driver.id}`}><i className="far fa-edit"></i></Link> </li>
                    <li><Link to={`/drivers/delete/${driver.id}`} onclick="return confirm('Are you sure you want to delete this item?');"><i className="far fa-trash-alt"></i></Link> </li>
                </ul>
            </td>
            </tr>
    )
}

export default DriverListTableRow