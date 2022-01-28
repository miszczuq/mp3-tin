import axios from 'axios'
import {getCurrentUser} from "../helpers/authHelper";

export const postData = (route, data) => {
    console.log("PostingData")
    let user = getCurrentUser();
    let headers = {};
    if(user) {
        let token = user.token;

        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }

    return axios.post(`http://localhost:3000/${route}`, data, {headers})
        .then(res => {
            console.log("succes in post")
            return res;
        })
        .catch(err => {
            console.log("error in post")
            return err.response
        })
}