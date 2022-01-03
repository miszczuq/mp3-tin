import React from 'react';
import { getFormatedDate } from '../../helpers/dateHelper';

function DriverDetailsData(props){
    const driver = props.driverData
    return(
        <React.Fragment>
            <p>Imie: {driver.firstName}</p>
            <h2>Szczegóły okrażen</h2>
        </React.Fragment>
    )
}

export default DriverDetailsData