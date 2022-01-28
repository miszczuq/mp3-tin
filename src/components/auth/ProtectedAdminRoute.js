import React, {useEffect} from 'react'
import {isAdmin, isAuthenticated} from "../../helpers/authHelper";
import Forbidden from "./Forbidden";
import {useNavigate} from "react-router-dom";

const ProtectedRoute = (props) => {
    const Component = props.component;
    const navigate = useNavigate()

    useEffect(() => {
        if(!isAuthenticated()){
            navigate('/users/login')
        }
    }, [])

    return(

        isAdmin() ? <Component/>
        : <Forbidden/>
    )
}
export default ProtectedRoute