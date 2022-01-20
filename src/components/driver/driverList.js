import React, {useEffect, useState} from 'react'
import {getDriverApiCall} from "../../apiCalls/driverApiCalls";
import TableContent from "../table/tableContent";
import ListTable from "../table/listTable";
import {deleteData} from "../../apiCalls/deleteData";
import {Link} from "react-router-dom";

const DriversList = () => {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false);

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

    const handleDelete = (recordId) => {
        deleteData(params.parentRoute, recordId).then(() => {
            setIsDeleted(!isDeleted);
        })
    }

    useEffect(() => {
        getMappedDriverData();
    }, [isDeleted])

    const setContent = () => {
        let content;
        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ladowanie danych kierowców</p>
        } else {
            content = <TableContent params={params} onDelete={handleDelete}/>
        }

        return content
    }

    const getMappedDriverData = () => {
        let subset = ({id, first_name, last_name, weight}) => ({id, columns: [first_name, last_name, weight]})
        getDriverApiCall()
            .then(res => res.data
                .map(driver => subset(driver)))
            .then(
                (data) => {
                    setIsLoaded(true);
                    setParams(prevState => {
                        prevState.records = data;
                        return {...prevState};
                    })
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    return (
        <React.Fragment>
            {
                params.records.length > 0 ?
                <ListTable content={setContent()} params={params}/>
                    :
                        <div className="main-content">
                            <h1>Brak rekordów do wyświetlenia</h1>
                            <p className={"section-buttons"}>
                                <Link to={`${params.parentRoute}/add`} className="button-add">{params.buttonText}</Link>
                            </p>
                        </div>
            }
        </React.Fragment>
    )
}

export default DriversList;