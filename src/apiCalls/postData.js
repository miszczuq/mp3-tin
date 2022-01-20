import axios from 'axios'

export const postData = async (route, data) => {
    return axios.post(`http://localhost:3000/${route}`, data)
        .then(res => {
            return res;
        })
        .catch(err => console.log(err))
}