import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from 'react'
import TableContent from "../table/tableContent";
import ListTable from "../table/listTable";
import {deleteData} from "../../apiCalls/deleteData";
import {Link, useNavigate} from "react-router-dom";
import {isAuthenticated} from "../../helpers/authHelper";
import {getDriverApiCall} from "../../apiCalls/driverApiCalls";

const DriverList = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false);

    const [params, setParams] = useState({
        header: "driver_list",
        buttonText: "add_driver",
        tableColumnHeaders: [
            "first_name",
            "last_name",
            "weight",
            "actions"
        ],
        parentRoute: "/drivers",
        cssClassName: "driver",
        records: []
    })

    const handleDelete = (recordId) => {
        deleteData(params.parentRoute, recordId).then(() => {
            setIsDeleted(!isDeleted);
        })
            .catch(e => {
                //TODO: Make popup when user get 401
            })
    }

    useEffect(() => {
        getMappedDriverData();
    }, [isDeleted])

    // const hasPermission = (roles) => {
    //     const userRole = getUserRole();
    //     console.log("userRole: ", userRole)
    //     return roles.includes(userRole);
    // }

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
        isAuthenticated() ?
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
            :
            <div className="main-content">
                <h1>{t("no_access")}</h1>
            </div>
    )
}

export default DriverList;