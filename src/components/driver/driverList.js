import React from 'react'
import {getDriverApiCall} from "../../apiCalls/driverApiCalls";
import DriverListTable from "./driverListTable";

import {Link} from 'react-router-dom'

class DriverList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            drivers: []
        }
    }

    render() {

        const {error, isLoaded, drivers} = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ladowanie danych pracowników</p>
        } else {
            content = <DriverListTable driverList={drivers}/>
        }

        return (
            <main>
                <div className="main-content">
                    <h2>Lista kierowców</h2>
                    <div className="table-div">
                        {content}
                        <p className={"section-buttons"}>
                            <Link to="/drivers/add" className="button-add">Dodaj nowego kierowcę</Link>
                        </p>
                    </div>
                </div>
            </main>
        )
    }

    fetchDriverList = () => {
        getDriverApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        drivers: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentDidMount() {
        this.fetchDriverList()
    }
}

export default DriverList;