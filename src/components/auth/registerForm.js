import React, {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Form, Formik} from "formik";
import {postData} from "../../apiCalls/postData";
import validate from "../../validation/registerValidation";
import {useTranslation} from "react-i18next";

function RegisterForm() {
    const navigate = useNavigate();
    const {t} = useTranslation();

    useEffect(() => {

    }, [])

    return (
        <div className={"main-content"}>
            <h2>{t("register")}</h2>
            <Formik
                initialValues={
                    {
                        username: '',
                        password: '',
                        confirm_password: ''
                    }
                } onSubmit={
                async (values) => {
                    await postData("api/users/register", values)
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
                               onChange={handleChange}
                               value={values.password}
                        />
                        {errors.password && touched.password ? (
                                <span id="errorPassword" className="errors-text">{errors.password}</span>
                            )
                            : ''
                        }

                        <label htmlFor="confirm_password">{t("confirm_password")}: <span className="symbol-required">*</span></label>
                        <input type="password" name="confirm_password" id="confirm_password" placeholder={t('char2_50')}
                               onChange={handleChange}
                        />
                        {errors.confirm_password && touched.confirm_password ? (
                                <span id="errorConfirmPassword" className="errors-text">{errors.confirm_password}</span>
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
                                {t("register")}
                            </button>
                            <Link to="/" className="form-button-cancel">{t("cancel")}</Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default RegisterForm