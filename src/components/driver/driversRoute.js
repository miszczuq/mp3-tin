import React, {useEffect, useState} from 'react'
import {getDriverApiCall} from "../../apiCalls/driverApiCalls";
import tableContent from "../fragments/tableContent";
import {Link} from 'react-router-dom'
import ListTable from "../fragments/listTable";

const DriversRoute = () => {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    const [params, setParams] = useState({
        header: "Lista Kierowców",
        buttonText: "Dodaj nowego kierowcę",
        tableColumnHeaders: [
            "Imie",
            "Nazwisko",
            "Waga(kg)",
            "Akcje"
        ],
        parentRoute: "/drivers",
        cssClassName: "driver",
        records: []
    })

    useEffect(() => {
        //setContent();
        getMappedDriverData();
    }, [])

    const setContent = () => {
        let content;
        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ladowanie danych</p>
        } else {
            content = <tableContent params={params}/>
        }

        return content
    }

    const getMappedDriverData = () => {
        let unwrap = ({id, first_name, last_name, weight}) => ({id, columns:[first_name, last_name, weight]})
        getDriverApiCall()
            .then(res => res.data
                .map(driver => unwrap(driver)))
            .then(
                (data) => {
                    setIsLoaded(true);
                    setParams( prevState => {
                        prevState.records = data;
                        return {...prevState};
                })
                    console.log("records: ",params.records )
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    return (
        <ListTable content={setContent()} params={params}/>
    )
}

export default DriversRoute;