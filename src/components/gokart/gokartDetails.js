import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {getDataById} from "../../apiCalls/getDataById";
import GokartDetailsData from "./gokartDetailsData";
import {useTranslation} from "react-i18next";

function GokartDetails() {
    const [gokartId, setGokartId] = useState(useParams())
    const [gokart, setGokart] = useState(null)
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState(null)

    const {t} = useTranslation();

    useEffect(() => {
        checkState();
        getGokartData();
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
            content = <GokartDetailsData gokartData={gokart}/>
        }

        return content
    }

    const getGokartData = () => {
        getDataById('/gokarts', gokartId.gokartId)
            .then(res => res.data)
            .then(
                (data) => {
                    if (data.message) {
                        setGokart(null);
                        setMessage(data.message);
                    } else {
                        setGokart(data);
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
                    <Link to="/gokarts" className="form-button-details-back">{t("back")}</Link>
                </div>
            </div>
        </main>
    )
}

export default GokartDetails