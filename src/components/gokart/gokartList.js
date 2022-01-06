import React, {useEffect, useState} from 'react'
import {getGokartApiCall} from "../../apiCalls/gokartApiCalls";
import GokartListTable from "./gokartListTable";
import {Link} from 'react-router-dom'

const GokartList = () => {
    const [gokarts, setGokarts] = useState([])
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        checkState();
        getGokartData();
    }, [])

    const checkState = () => {
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ladowanie danych gokartów</p>
        } else {
            content = <GokartListTable gokartList={gokarts}/>
        }

        return content
    }

    const getGokartData = () => {
        getGokartApiCall()
            .then(res => res.data)
            .then(
                (data) => {
                    setIsLoaded(true);
                    setGokarts(data);
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
                <h2>Lista gokartów</h2>
                <div className="table-div">
                    {checkState()}
                    <p className={"section-buttons"}>
                        <Link to="/gokarts/add" className="button-add">Dodaj nowego gokarta</Link>
                    </p>
                </div>
            </div>
        </main>
    )
}


export default GokartList;