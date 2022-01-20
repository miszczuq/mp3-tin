import React, {useState} from 'react';
import DriverForm from "./driverForm";
import formModeEnum from "../../helpers/formHelper";

function DriverDetailsData(props) {
    const driver = props.driverData

    // const [params, setParams] = useState({
    //     header: "Lista Kierowców",
    //     buttonText: "Dodaj nowego kierowcę",
    //     tableColumnHeaders: [
    //         "Imie",
    //         "Nazwisko",
    //         "Waga(kg)",
    //         "Akcje"
    //     ],
    //     parentRoute: "/drivers",
    //     cssClassName: "driver",
    //     records: []
    // })

    const [params, setParams] = useState({
        header: "Szczegóły kierowcy",
        buttonText: "Edytuj",
        formMode: formModeEnum.DETAILS
    })


    return (
        <React.Fragment>
            <DriverForm params={params}/>
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
                                <td>{lap.wet_track ? "moka" : "sucha"}</td>
                            </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}

export default DriverDetailsData