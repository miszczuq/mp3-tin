import React, {useEffect, useState} from 'react'
import {getDriverApiCall} from "../../apiCalls/driverApiCalls";
import DriverListTable from "./driverListTable";
import {Link} from 'react-router-dom'

const DriverList = () => {
    const [drivers, setDrivers] = useState([])
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        checkState();
        getDriverData();
    }, [])

    const checkState = () => {
        let content;
        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ladowanie danych kierowców</p>
        } else {
            content = <DriverListTable driverList={drivers}/>
        }

        return content
    }

    const getDriverData = () => {
        getDriverApiCall()
            .then(res => res.data)
            .then(
                (data) => {
                    setIsLoaded(true);
                    setDrivers(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    return (
        <main>
            <div className="main-content">
                <h2>Lista kierowców</h2>
                <div className="table-div">
                    {checkState()}
                    <p className={"section-buttons"}>
                        <Link to="/drivers/add" className="button-add">Dodaj nowego kierowcę</Link>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default DriverList;