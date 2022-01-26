import axios from 'axios'

export const getUserRole = async () => {
    return axios.get(`http://localhost:3000/api/users/roleCheck`)
        .then(res => {
            console.log(("getUserRoleResponse: "),res)
            return res;
        })
        .catch(err => console.log(err))
}