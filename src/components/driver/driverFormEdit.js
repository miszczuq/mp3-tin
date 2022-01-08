import React, {Fragment, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import * as fMode from "../../helpers/formHelper"

import {getDriverByIdApiCall} from "../../apiCalls/driverApiCalls";
import FormComponent from "./formComponent";

function DriverFormEdit() {
    const [driverId, setDriverId] = useState(useParams())
    const [driver, setDriver] = useState(null)
    // const [error, setError] = useState(null)
    // const [isLoaded, setIsLoaded] = useState(false)
    // const [message, setMessage] = useState(null)

    console.log("driverId: ", driverId)
    console.log("driverId type: ", typeof driverId)

    const formMode = driverId ? fMode.EDIT : fMode.NEW;

    // const [nestedState, setNestedState] = useState({
    //     driverId: driverId,
    //     driver: {
    //         first_name: '',
    //         last_name: '',
    //         birthdate: '',
    //         weight: '',
    //         phone_number: ''
    //     },
    //     errors: {
    //         first_name: '',
    //         last_name: '',
    //         birthdate: '',
    //         weight: '',
    //         phone_number: ''
    //     },
    //     formMode: formMode,
    //     redirect: false,
    //     error: null,
    // })

    useEffect(() => {
        checkState();
    }, [])

    const checkState = () => {
        if (formMode === fMode.EDIT) {
            getDriverData()
        }
    }

    const getDriverData = () => {
        getDriverByIdApiCall(driverId)
            .then(res => res.data)
            .then((data) => setDriver(data))
    }

    return (
        <React.Fragment>
            {driver ? (<FormComponent driver={driver} route={"/drivers/edit/"+driverId}/>) : <p>Ladowanie danych</p>}
        </React.Fragment>
    )
}

export default DriverFormEdit