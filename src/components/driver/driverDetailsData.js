import React from 'react';

function DriverDetailsData(props) {
    const driver = props.driverData
    return (
        <React.Fragment>
            <p>Imie: {driver.first_name}</p>
            <p>Nazwisko: {driver.last_name}</p>
            <h2>Szczegóły przejazdów</h2>
            <div className="table-div">
                <table className="table-list driver-gokartDetails">
                    <thead>
                    <tr>
                        <th>Gokart</th>
                        <th>Czas(s)</th>
                        <th>Nawierzchnia</th>
                    </tr>
                    </thead>

                    <tbody>

                    {driver.laps.map(
                        lap =>
                            <tr key={lap.id}>
                                <td>{lap.gokart.model+' '+lap.gokart.brand}</td>
                                <td>{lap.lap_time}</td>
                                <td>{lap.wet_track}</td>
                            </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}

export default DriverDetailsData