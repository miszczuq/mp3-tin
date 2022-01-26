import axios from 'axios'
import {getCurrentUser} from "../helpers/authHelper";

export const deleteData = async (route, recordId) => {
    let user = getCurrentUser();
    let headers = {};
    if(user) {
        let token = user.token;

        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }

    return axios.delete(`http://localhost:3000/api${route}/${recordId}`,{headers})
        .then(res => {
            return res;
        })
        .catch(err => err.response);
}