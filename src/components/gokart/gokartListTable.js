import React from 'react';
import {Link} from "react-router-dom";

function GokartListTable(props) {
    const gokarts = props.gokartList
    return (
        <table className="table-list gokart">
            <thead>
            <tr>
                <th>Marka</th>
                <th>Model</th>
                <th>Moc(KM)</th>
                <th>Waga(kg)</th>
                <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
            {gokarts.map(gokart =>
                <tr key={gokart.id}>
                    <td>{gokart.brand}</td>
                    <td>{gokart.model}</td>
                    <td>{gokart.horse_power}</td>
                    <td>{gokart.weight}</td>
                    <td>
                        <ul className="list-actions">
                            <li><Link to={`/gokarts/details/${gokart.id}`}><i className="fas fa-info"></i></Link></li>
                            <li><Link to={`/gokarts/edit/${gokart.id}`}><i className="far fa-edit"></i></Link></li>
                            <li><Link to={`/gokarts/delete/${gokart.id}`}
                                      onClick="return confirm('Are you sure you want to delete this item?');"><i className="far fa-trash-alt"></i></Link></li>
                        </ul>
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    )
}

export default GokartListTable