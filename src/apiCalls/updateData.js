import axios from 'axios'

export const updateData = async (route, recordId, data) => {
    console.log("BeforeAxiosPut data: ", data)
    return axios.put(`http://localhost:3000/${route}/${recordId}`, data)
        .then(res => {
            return res;
        })
        .catch(err => console.log(err))
}