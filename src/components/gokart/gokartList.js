import React, {useEffect, useState} from 'react'
import {getGokartApiCall} from "../../apiCalls/gokartApiCalls";
import ListTable from "../table/listTable";
import TableContent from "../table/tableContent";
import {deleteData} from "../../apiCalls/deleteData";
import {Link} from "react-router-dom";

const GokartList = () => {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false);

    const [params, setParams] = useState({
        header: "Lista Gokartów",
        buttonText: "Dodaj nowy gokart",
        tableColumnHeaders: [
            "Marka",
            "Model",
            "Moc(KM)",
            "Waga(kg)",
            "Akcje"
        ],
        parentRoute: "/gokarts",
        cssClassName: "gokart",
        records: []
    })

    const handleDelete = (recordId) => {
        deleteData(params.parentRoute, recordId).then(() => {
            setIsDeleted(!isDeleted);
        })
    }

    useEffect(() => {
        getMappedGokartData();
    }, [isDeleted])

    const setContent = () => {
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ladowanie danych gokartów</p>
        } else {
            content = <TableContent params={params} onDelete={handleDelete}/>
        }

        return content
    }

    const getMappedGokartData = () => {
        let unwrap = ({id, brand, model, horse_power, weight}) => ({id, columns: [brand, model, horse_power, weight]})
        getGokartApiCall()
            .then(res => res.data
                .map(gokart => unwrap(gokart)))
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


export default GokartList;