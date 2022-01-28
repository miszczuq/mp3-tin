import React, {useState} from 'react';
import GokartForm from "./gokartForm";
import formModeEnum from "../../helpers/formHelper";
import {useTranslation} from "react-i18next";

function GokartDetailsData(props) {
    const {t} = useTranslation();

    const gokart = props.gokartData
    const [params, setParams] = useState({
        header: "gokart_details",
        buttonText: "edit",
        formMode: formModeEnum.DETAILS
    })


    return (
        <React.Fragment>
            <GokartForm params={params}/>
            <h2>{t("lap_details")}</h2>
            <div className="table-div">
                <table className="table-list gokart-gokartDetails">
                    <thead>
                    <tr>
                        <th>{t("driver")}</th>
                        <th>{t("lap_time")}</th>
                        <th>{t("surface")}</th>
                    </tr>
                    </thead>

                    <tbody>

                    {gokart.laps.map(
                        lap =>
                            <tr key={lap.id}>
                                <td>{lap.driver.first_name + ' ' + lap.driver.last_name}</td>
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

export default GokartDetailsData