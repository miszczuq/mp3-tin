import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {getLapByIdApiCall} from '../../apiCalls/lapApiCalls'
import LapDetailsData from "./lapDetailsData";
import {useTranslation} from "react-i18next";

function LapDetails() {
    const [lapId, setLapId] = useState(useParams())
    const [lap, setLap] = useState(null)
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState(null)

    const {t} = useTranslation();

    useEffect(() => {
        checkState();
        getLapData();
    }, [])

    const checkState = () => {
        let content;

        if (error) {
            content = <p>{t("error")}: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t("data_loading")}</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <LapDetailsData lapData={lap}/>
        }

        return content
    }

    const getLapData = () => {
        getLapByIdApiCall(lapId)
            .then(res => res.data)
            .then(
                (data) => {
                    if (data.message) {
                        setLap(null);
                        setMessage(data.message);
                    } else {
                        setLap(data);
                        setMessage(null);
                    }
                    setIsLoaded(true)
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    return (
        <main>
            <div className={"main-content"}>
                {checkState()}
                <div className="form-buttons">
                    <Link to="/driverGokarts" className="form-button-details-back">{t("back")}</Link>
                </div>
            </div>
        </main>
    )
}

export default LapDetails