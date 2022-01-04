import React from 'react';
import DriverListTableRow from './DriverListTableRow'

function DriverListTable(props){
    const drivers = props.driverList
    return (
            <table className="table-list driver">
                <thead>
                    <tr>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Waga(kg)</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                {drivers.map(driver =>
                    <DriverListTableRow driverData={driver} key={driver.id}/>
                )}
                </tbody>
            </table>
    )
}

export default DriverListTable