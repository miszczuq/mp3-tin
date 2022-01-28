import React, {useEffect, useState} from 'react'
import {getGokartApiCall} from "../../apiCalls/gokartApiCalls";
import ListTable from "../table/listTable";
import TableContent from "../table/tableContent";
import {deleteData} from "../../apiCalls/deleteData";
import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {getData} from "../../apiCalls/getData";
import {isAdmin, isAuthenticated} from "../../helpers/authHelper";

const GokartList = () => {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false);

    const navigate = useNavigate();
    const {t} = useTranslation();

    const [params, setParams] = useState({
        header: "gokart_list",
        buttonText: "add_gokart",
        tableColumnHeaders: [
            "brand",
            "model",
            "horse_power",
            "weight",
            "actions"
        ],
        parentRoute: "/gokarts",
        cssClassName: "gokart",
        records: []
    })

    const handleDelete = (recordId) => {
        if (!isAdmin()) {
            alert("You have no permision to do this");
        } else {
            deleteData(params.parentRoute, recordId)
                .then(() => {
                    setIsDeleted(!isDeleted);
                })
        }
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
        getData(params.parentRoute)
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
        !isAuthenticated() ?
            <React.Fragment>{
                navigate('/users/login')
            }</React.Fragment> :

            !isAdmin() ?
                <React.Fragment>
                    <div className="main-content">
                        <h1>{t("no_access")}</h1>
                    </div>
                </React.Fragment>
                :

            <React.Fragment>
                {
                    params.records.length > 0 ?
                        <ListTable content={setContent()} params={params}/>
                        :

                        <div className="main-content">
                            <h1>{t("no_records_to_show")}</h1>
                            <p className={"section-buttons"}>
                                <Link to={`${params.parentRoute}/add`}
                                      className="button-add">{t(params.buttonText)}</Link>
                            </p>
                        </div>
                }
            </React.Fragment>
    )
}


export default GokartList;