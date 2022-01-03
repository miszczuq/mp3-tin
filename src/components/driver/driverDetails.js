import React from 'react'
import { Link } from 'react-router-dom'
import { getDriverByIdApiCall } from '../../apiCalls/driverApiCalls'
import { getFormatedDate } from '../../helpers/dateHelper'
import DriverDetailsData from "./driverDetailsData";

class DriverDetails extends React.Component {

    constructor(props){
        super(props)
        let { driverId } = props.match.params
        this.state = {
            driverId: driverId,
            driver: null,
            error: null,
            isLoaded: false,
            message:null
        }
    }

componentDidMount(){
    this.fetchDriverDetails()
}

fetchDriverDetails = () => {
    getDriverByIdApiCall(this.state.driverId)
        .then(res => res.json())
        .then(
            (data) => {
                if(data.message){
                    this.setState({
                        driver: null,
                        message: data.message
                    })
                }else{
                    this.setState({
                        driver: data,
                        message: null
                    })
                }
                this.setState({
                    isLoaded: true
                })
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            }
        )
}

    render(){
        const {driver, error, isLoaded, message} = this.state
        let content;

        if(error){
            content = <p>Błąd: {error.message}</p>
        }else if(!isLoaded){
            content= <p>Ladowanie danych pracownika</p>
        }else if(message){
            content = <p>{message}</p>
        }else{
            content = <DriverDetailsData driverData={driver}/>
        }

        return(
            <main>
                <h2>Szczegóły kierowcy</h2>
                {content}
                <div className="section-buttons">
                    <Link to="/drivers" className="button-back">Powrót</Link>
                </div>
            </main>
        )
    }
}

export default DriverDetails