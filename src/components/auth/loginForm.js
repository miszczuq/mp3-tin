import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Form, Formik} from "formik";
import {postData} from "../../apiCalls/postData";
import validate from "../../validation/loginValidation";
import {useTranslation} from "react-i18next";
import {loginApiCall} from "../../apiCalls/userApiCalls";

function LoginForm(props) {
    const navigate = useNavigate();
    const {t} = useTranslation();

    // const [user, setUser] = useState({
    //     username: '',
    //     password: '',
    // })
    //
    // const [errors, setErrors] = useState({
    //     username: '',
    //     password: '',
    // })
     const [message, setMessage]= useState('');
    // const [error, setError]= useState('');
    // const [prevPath, setPrevPath]= useState('');

    // const handleChange = (event) =>{
    //     const {name, value} = event.target
    //     const user = {...user}
    //     user[name] = value
    //
    //     //const errorMessage = validateField(name, value)
    //     //const errors = {...errors};
    //     //errors[name] = errorMessage
    //
    //     setUser(user);
    //     setErrors(errors);
    // }

    const handleSubmit = (user) => {
        loginApiCall(user)
            .then(response => {
                if (response.status === 200) {
                    let data = response.data
                    if (data.token) {
                        console.log("data.Token Found", data)
                        props.handleLogin(JSON.stringify(data))
                        navigate(-1);
                    }
                } else if (response.status === 401) {
                    let data = response.data
                    console.log("in401Error", response.status)
                    setMessage(data.message)
                }



        // const response = loginApiCall(user)
        //     .then(res =>{
        //         console.log("Res ", res)
        //         return res.data;
        //     })
        //     .then((data) => {
        //         console.log("FormData", data)
        //         if(response.status === 200){
        //             console.log("Before hangle login 200")
        //             if(data.token){
        //                 console.log("data.Token Found")
        //                 //const userString = JSON.stringify(data)
        //                 props.handleLogin(data)
        //                 navigate('success');
        //             }
        //         }else if(response.status === 401){
        //             console.log(401)
        //             setMessage(data.message)
        //         }
        //     })
    })
    }

    useEffect(() => {

    }, [])

    return (
        <div className={"main-content"}>
            <h2>{t("login")}</h2>
            <Formik
                initialValues={
                    {
                        username: '',
                        password: ''
                    }
                } onSubmit={
                async (values) => {
                    // await postData("api/users/login", values)
                    //     .then(() => {
                    //         navigate('/');
                    //     })
                    await handleSubmit(values);
                }
            }
                validationSchema={validate}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleSubmit,
                      setErrors,
                      setTouched,
                      validateForm
                  }) => (
                    <Form onSubmit={handleSubmit} className="form">

                        <label htmlFor="username">{t("username")}: <span className="symbol-required">*</span></label>
                        <input type="text" name="username" id="username" placeholder="2-20 znaków"
                               value={values.username} onChange={handleChange}
                        />
                        {errors.username && touched.username ? (
                                <span id="errorUsername" className="errors-text">{errors.username}</span>
                            )
                            : ''
                        }

                        <label htmlFor="password">{t("password")}: <span className="symbol-required">*</span></label>
                        <input type="password" name="password" id="password" placeholder="2-20 znaków"
                               value={values.password} onChange={handleChange}
                        />
                        {errors.password && touched.password ? (
                                <span id="errorPassword" className="errors-text">{errors.password}</span>
                            )
                            : ''
                        }

                        <label htmlFor="response_error" className={"error-message"}>{message}</label>

                        <div className="form-buttons">
                            <button onClick={() => {
                                validateForm().then(
                                    (res) => {
                                        setErrors(res)
                                    }
                                );
                            }}
                                    className="form-button-submit"
                            >
                                {t("login")}
                            </button>
                            <Link to="/" className="form-button-cancel">{t("cancel")}</Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default LoginForm