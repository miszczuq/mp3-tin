import React, {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Form, Formik} from "formik";
import {postData} from "../../apiCalls/postData";
import validate from "../../validation/loginValidation";
import {useTranslation} from "react-i18next";

function LoginForm() {
    const navigate = useNavigate();
    const {t} = useTranslation();

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
                    await postData("api/users/login", values)
                        .then(() => {
                            navigate('/');
                        })
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