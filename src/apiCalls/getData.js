import axios from 'axios'
import {getCurrentUser} from "../helpers/authHelper";

export const getData = (route) => {
    let user = getCurrentUser();
    let headers = {};
    if(user) {
        let token = user.token;

        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }

    return axios.get(`http://localhost:3000/api${route}`,{headers})
        .then(res => {
            return res;
        })
        .catch(err => err.response);
}