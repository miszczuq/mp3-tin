import React, {useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import DriverDetailsData from "./driverDetailsData";
import {useTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";
import {getDataById} from "../../apiCalls/getDataById";

function DriverDetails() {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const [driverId, setDriverId] = useState(useParams())
    const [driver, setDriver] = useState(null)
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        getDriverData();
        checkState();
    }, [])

    const checkState = () => {
        console.log("Before error in checkState")
        if (error) {
            console.log("IfError ", error)
            return <p>{t("error")}: {error.message}</p>
        } else if (!isLoaded) {
            return <p>{t("data_loading")}</p>
        } else {
            console.log("Before error in checkState, DRIVER", driver)
            return <DriverDetailsData driverData={driver}/>
        }
    }

    const getDriverData = () => {
        getDataById('/drivers', driverId.driverId)
            .then(res => res.data)
            .then(
                (data) => {
                    if (!data) {
                        setDriver(null);
                        setError({message: 'i18next'})
                    } else {
                        setDriver(data);
                        setError(null)
                    }
                    setIsLoaded(true);
                },
                (error) => {
                    setIsLoaded(true);
                    setError({message: 'i18next niepowodzenie'});
                }
            )
    }

    return (
        !isAuthenticated() ?
            <React.Fragment>{
                navigate('/users/login')
            }</React.Fragment> :

            <main>
                <div className={"main-content"}>
                    {checkState()}
                    <div className="form-buttons">
                        <Link to="/drivers" className="form-button-details-back">{t("back")}</Link>
                    </div>
                </div>
            </main>
    )
}

export default DriverDetails