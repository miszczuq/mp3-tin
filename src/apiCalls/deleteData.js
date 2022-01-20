import axios from 'axios'

export const deleteData = async (route, recordId) => {
    return axios.delete(`http://localhost:3000/api${route}/${recordId}`)
        .then(res => {
            return res;
        })
        .catch(err => console.log(err))
}