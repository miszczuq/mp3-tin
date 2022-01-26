import axios from 'axios'

const driversBaseUrl = 'http://localhost:3000/api/users'

export const loginApiCall = (user) => {
    const url = `${driversBaseUrl}/login`;
    const headers = {
            'Content-Type': 'application/json'
    }

    return axios.post(url, user, {headers})
        .then(res => {
            console.log("succes in post")
            return res;
        })
        .catch(err => {
            console.log("error in post")
            return err.response
        });
}

export const logoutApiCall = () =>{
    return axios.post(driversBaseUrl+'/logout')
        .then(res => {
            console.log("succes in post")
            return res;
        })
        .catch(err => {
            console.log("error in post")
            return err.response
        });
}