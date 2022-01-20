import axios from "axios";

const lapsBaseUrl = 'http://localhost:3000/api/driverGokarts'

export function getLapApiCall(){
    return axios.get(lapsBaseUrl)
}

export  function getLapByIdApiCall(lapId){
    const url = `${lapsBaseUrl}/${lapId.lapId}`;
    return axios.get(url);
}