import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Form, Formik} from "formik";
import validate from "../../validation/loginValidation";
import {useTranslation} from "react-i18next";
import {loginApiCall} from "../../apiCalls/userApiCalls";

function LoginForm(props) {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [message, setMessage] = useState('');

    const handleSubmit = (user) => {
        loginApiCall(user)
            .then(response => {
                if (response.status === 200) {
                    let data = response.data
                    if (data.token) {
                        console.log("data.Token Found", data)
                        props.handleLogin(JSON.stringify(data))
                        navigate('/');
                    }
                } else if (response.status === 401) {
                    let data = response.data
                    console.log("in401Error", response.status)
                    setMessage(data.message)
                }
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
                        <input type="text" name="username" id="username" placeholder={t('char2_10')}
                               value={values.username} onChange={handleChange}
                        />
                        {errors.username && touched.username ? (
                                <span id="errorUsername" className="errors-text">{errors.username}</span>
                            )
                            : ''
                        }

                        <label htmlFor="password">{t("password")}: <span className="symbol-required">*</span></label>
                        <input type="password" name="password" id="password" placeholder={t('char2_50')}
                               value={values.password} onChange={handleChange}
                        />
                        {errors.password && touched.password ? (
                                <span id="errorPassword" className="errors-text">{errors.password}</span>
                            )
                            : ''
                        }

                        <label htmlFor="response_error" className={"error-message"}>{t(message)}</label>

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