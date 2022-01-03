import React from 'react'
import {getDriverApiCall} from "../../apiCalls/driverApiCalls";
import DriverListTable from "./driverListTable";

import {
    Link
} from 'react-router-dom'

class DriverList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            employees: []
        }
    }

    // const driverList = getDriverApiCall();
    //
    // return (
    //     <main>
    //         <div classNameName="main-content">
    //             <h2>Lista kierowców</h2>
    //             <
    //             % if(drivers.length
    //             <
    //             = 0 ) { %>
    //             <p>Brak rekordów do wyświetlenia
    //         </p>
    //         <
    //         %}else{%>
    //         <div className="table-div">
    //         <table className="table-list driver">
    //         <thead>
    //         <tr>
    //         <th>Imię</th>
    //         <th>Nazwisko</th>
    //         <th>Waga(kg)</th>
    //         <th>Akcje</th>
    //         </tr>
    //         </thead>
    //
    //         <tbody>
    //             {driverList.map(driver => (
    //                 <tr key = {driver.id}>
    //                     <td><{driver.first_name}</td>
    //                     <td><{driver.last_name}</td>
    //                     <td><{driver.weight}</td>
    //
    //                     <td>
    //                         <ul className="list-actions">
    //                             <li><Link to={`/drivers/details/${driver.id}`}><i className="fas fa-info"></i></Link></li>
    //                             <li><Link to={`/drivers/edit/${driver.id}`}><i className="far fa-edit"></i></Link> </li>
    //                             <li><Link to={`/drivers/delete/${driver.id}`} onclick="return confirm('Are you sure you want to delete this item?');"><i className="far fa-trash-alt"></i></Link> </li>
    //                         </ul>
    //                     </td>
    //                 </tr>
    //
    //             ))}
    //         </tbody>
    //
    //         </table>
    //         <% } %>
    //         <p><Link to="/drivers/add" className="button-add">Dodaj nowego kierowcę</Link></p>
    //         </div>
    //         </div>
    //         </main>
    //
    //         )
    //         }

    render() {

        const {error, isLoaded,drivers} = this.state
        let content;

        if(error){
            content = <p>Błąd: {error.message}</p>
        }else if(!isLoaded){
            content = <p>Ladowanie danych pracowników</p>
        }else{
            content = <DriverListTable driverList={drivers} />
        }

        return(
            <main>
                <h2>Lista kierowców</h2>
                {content}
                <p className={"section-buttons"}>
                    <Link to="/drivers/add" className="button-add">Dodaj nowego pracownka</Link>
                </p>
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
                        employees: data
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

    componentDidMount(){
        this.fetchDriverList()
    }
}

export default DriverList;