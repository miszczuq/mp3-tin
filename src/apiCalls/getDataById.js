import axios from 'axios'
import {getCurrentUser} from "../helpers/authHelper";

export const getDataById = async (route, id) => {
    let user = getCurrentUser();
    let headers = {};
    if(user) {
        let token = user.token;

        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }

    return axios.get(`http://localhost:3000/api${route}/${id}`,{headers})
        .then(res => {
            return res;
        })
        .catch(err => err.response);
}