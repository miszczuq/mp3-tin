import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {getDriverByIdApiCall} from '../../apiCalls/driverApiCalls'
import DriverDetailsData from "./driverDetailsData";

function DriverDetails() {
    //const {id} = useParams()

    const [driverId, setDriverId] = useState(useParams())
    const [driver, setDriver] = useState(null)
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        checkState();
        getDriverData();
    }, [])

    const checkState = () => {
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ladowanie danych kierowcy</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <DriverDetailsData driverData={driver}/>
        }

        return content
    }

    const getDriverData = () => {
        getDriverByIdApiCall(driverId)
            .then(res => res.data)
            .then(
                (data) => {
                    if (data.message) {
                        setDriver(null);
                        setMessage(data.message);
                    } else {
                        setDriver(data);
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
                    <Link to="/drivers" className="form-button-details-back">Powrót</Link>
                </div>
            </div>
        </main>
    )
}

export default DriverDetails