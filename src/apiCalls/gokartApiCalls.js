import axios from 'axios'

const gokartsBaseUrl = 'http://localhost:3000/api/gokarts'

export function getGokartApiCall() {
    return axios.get(gokartsBaseUrl)
}

export function getGokartByIdApiCall(gokartId) {
    const url = `${gokartsBaseUrl}/${gokartId.gokartId}`;
    return axios.get(url);
}