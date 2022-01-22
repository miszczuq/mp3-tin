import React, {useEffect, useState} from 'react'
import {getLapApiCall} from "../../apiCalls/lapApiCalls";
import TableContent from "../table/tableContent";
import ListTable from "../table/listTable";
import {deleteData} from "../../apiCalls/deleteData";
import {Link} from "react-router-dom";

const LapList = () => {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false);

    const [params, setParams] = useState({
        header: "Lista przejazdów",
        buttonText: "Dodaj nowy przejazd",
        tableColumnHeaders: [
            "Kierowca",
            "Gokart",
            "Czas przejazdu(s)",
            "Nawierzchnia",
            "Akcje"
        ],
        parentRoute: "/driverGokarts",
        cssClassName: "driverGokart",
        records: []
    })

    const handleDelete = (recordId) => {
        deleteData(params.parentRoute, recordId).then(() => {
            setIsDeleted(!isDeleted);
        })
    }

    useEffect(() => {
        getMappedLapData();
    }, [isDeleted])

    const setContent = () => {
        let content;
        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ladowanie danych przejazdów</p>
        } else {
            content = <TableContent params={params} onDelete={handleDelete}/>
        }

        return content
    }

    const getMappedLapData = () => {
        let subset = ({id, driver, gokart, lap_time, wet_track}) => ({id, columns: [driver.first_name+' '+ driver.last_name, gokart.model, lap_time, wet_track]})
        getLapApiCall()
            .then(res => res.data
                .map(lap => subset(lap)))
            .then(e =>{
                console.log(e);
                return e;
            })
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

export default LapList;