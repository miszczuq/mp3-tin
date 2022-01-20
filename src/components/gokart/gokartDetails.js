import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {getGokartByIdApiCall} from '../../apiCalls/gokartApiCalls'
import GokartDetailsData from "./gokartDetailsData";

function GokartDetails() {
    const [gokartId, setGokartId] = useState(useParams())
    const [gokart, setGokart] = useState(null)
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        checkState();
        getGokartData();
    }, [])

    const checkState = () => {
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ladowanie danych gokarta</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <GokartDetailsData gokartData={gokart}/>
        }

        return content
    }

    const getGokartData = () => {
        getGokartByIdApiCall(gokartId)
            .then(res => res.data)
            .then(
                (data) => {
                    if (data.message) {
                        setGokart(null);
                        setMessage(data.message);
                    } else {
                        setGokart(data);
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
                    <a href="/gokarts" className="form-button-details-back">Powrót</a>
                </div>
            </div>
        </main>
    )
}

export default GokartDetails