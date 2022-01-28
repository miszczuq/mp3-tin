import axios from 'axios'
import {getCurrentUser} from "../helpers/authHelper";

export const updateData = async (route, recordId, data) => {
    console.log("BeforeAxiosPut data: ", data)
    let user = getCurrentUser();
    let headers = {};
    if(user) {
        let token = user.token;

        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    return axios.put(`http://localhost:3000/${route}/${recordId}`, data,{headers})
        .then(res => {
            return res;
        })
        .catch(err => err.response);
}