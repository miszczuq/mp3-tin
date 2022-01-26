import axios from 'axios'
import {getCurrentUser} from "../helpers/authHelper";

const driversBaseUrl = 'http://localhost:3000/api/drivers'

export function getDriverApiCall() {
    console.log("getDriverApiCall")

    let user = getCurrentUser();
    let token = user ? user.token : '';
    console.log("TokenInGet", token)

    const headers =  {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
    }
    return axios.get(driversBaseUrl, {headers})
}

export function getCurrentUserDrivers(){
    let user = getCurrentUser();
    let token = user.token;
    console.log("TokenInDelete", token)

    const headers =  {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
    }

    return axios.get(driversBaseUrl, {headers})
}

export function getDriverByIdApiCall(driverId) {
    const url = `${driversBaseUrl}/${driverId.driverId}`;
    return axios.get(url);
}