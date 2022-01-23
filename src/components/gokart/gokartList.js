import React, {useEffect, useState} from 'react'
import {getGokartApiCall} from "../../apiCalls/gokartApiCalls";
import ListTable from "../table/listTable";
import TableContent from "../table/tableContent";
import {deleteData} from "../../apiCalls/deleteData";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const GokartList = () => {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false);

    const {t} = useTranslation();

    const [params, setParams] = useState({
        header: t("gokart_list"),
        buttonText: t("add_gokart"),
        tableColumnHeaders: [
            t("brand"),
            t("model"),
            t("horse_power"),
            t("weight"),
            t("actions")
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
            content = <p>{t("error")}: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t("data_loading")}</p>
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
                        <h1>{t("no_records_to_show")}</h1>
                        <p className={"section-buttons"}>
                            <Link to={`${params.parentRoute}/add`} className="button-add">{params.buttonText}</Link>
                        </p>
                    </div>
            }
        </React.Fragment>
    )
}


export default GokartList;