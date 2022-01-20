import React, {useEffect, useState} from 'react'
import {getGokartApiCall} from "../../apiCalls/gokartApiCalls";
import ListTable from "../table/listTable";
import TableContent from "../table/tableContent";

const GokartRoute = () => {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

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

    useEffect(() => {
        //setContent();
        getMappedGokartData();
    }, [])

    const setContent = () => {
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ladowanie danych gokartów</p>
        } else {
            content = <TableContent params={params}/>
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
        <ListTable content={setContent()} params={params}/>
    )
}


export default GokartRoute;