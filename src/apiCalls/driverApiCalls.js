import axios from 'axios'

const driversBaseUrl = 'http://localhost:3000/api/drivers'

export function getDriverApiCall() {
    return axios.get(driversBaseUrl)
}

export function getDriverByIdApiCall(driverId) {
    const url = `${driversBaseUrl}/${driverId.driverId}`;
    return axios.get(url);
}