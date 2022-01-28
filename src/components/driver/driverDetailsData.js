import React, {useState} from 'react';
import DriverForm from "./driverForm";
import formModeEnum from "../../helpers/formHelper";
import {useTranslation} from "react-i18next";

function DriverDetailsData(props) {
    const driver = props.driverData
    const {t} = useTranslation();

    const [params, setParams] = useState({
        header: "driver_details",
        buttonText: t("edit"),
        formMode: formModeEnum.DETAILS
    })


    return (
        <React.Fragment>
            <DriverForm params={params}/>
            <h2>{t("lap_details")}</h2>
            <div className="table-div">
                <table className="table-list driver-gokartDetails">
                    <thead>
                    <tr>
                        <th>{t("gokart")}</th>
                        <th>{t("lap_time")}</th>
                        <th>{t("surface")}</th>
                    </tr>
                    </thead>

                    <tbody>

                    {driver.laps.map(
                        lap =>
                            <tr key={lap.id}>
                                <td>{lap.gokart.model + ' ' + lap.gokart.brand}</td>
                                <td>{lap.lap_time}</td>
                                <td>{lap.wet_track ? t("wet") : t("dry")}</td>
                            </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}

export default DriverDetailsData