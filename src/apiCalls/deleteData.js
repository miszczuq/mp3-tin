import axios from 'axios'
import {getCurrentUser} from "../helpers/authHelper";

export const deleteData = async (route, recordId) => {
    let user = getCurrentUser();
    let token = user.token;
    console.log("TokenInDelete", token)

    const headers =  {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
    }

    return axios.delete(`http://localhost:3000/api${route}/${recordId}`,{headers});
        // .then(res => {
        //     return res;
        // })
        // .catch(err => console.log(err))
}