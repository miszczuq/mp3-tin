import React, {useState} from 'react';
import GokartForm from "./gokartForm";
import formModeEnum from "../../helpers/formHelper";

function GokartDetailsData(props) {
    const gokart = props.gokartData
    const [params, setParams] = useState({
        header: "Szczegóły gokarta",
        buttonText: "Edytuj",
        formMode: formModeEnum.DETAILS
    })


    return (
        <React.Fragment>
            <GokartForm params={params}/>
            <h2>Szczegóły przejazdów</h2>
            <div className="table-div">
                <table className="table-list gokart-gokartDetails">
                    <thead>
                    <tr>
                        <th>Kierowca</th>
                        <th>Czas(s)</th>
                        <th>Nawierzchnia</th>
                    </tr>
                    </thead>

                    <tbody>

                    {gokart.laps.map(
                        lap =>
                            <tr key={lap.id}>
                                <td>{lap.driver.first_name+' '+lap.driver.last_name}</td>
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

export default GokartDetailsData