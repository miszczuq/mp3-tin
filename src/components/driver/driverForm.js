import React, {useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'

import {getDriverByIdApiCall} from "../../apiCalls/driverApiCalls";
import {Form, Formik} from "formik";
import {getFormattedDate} from "../../helpers/dateHelper";
import {postData} from "../../apiCalls/postData";
import validate from "../../validation/driverValidation";
import formModeEnum from "../../helpers/formHelper";
import {updateData} from "../../apiCalls/updateData";
import {useTranslation} from "react-i18next";
import {getCurrentUser} from "../../helpers/authHelper";
import {getDataById} from "../../apiCalls/getDataById";

function DriverForm(props) {
    const navigate = useNavigate();
    const route = '/drivers'
    const formMode = props.params.formMode
    const header = props.params.header
    const buttonText = props.params.buttonText
    const user = getCurrentUser();

    const [driverId, setDriverId] = useState(useParams())
    const [driver, setDriver] = useState(null)
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState(null)

    const {t} = useTranslation();

    useEffect(() => {
        if (formMode === formModeEnum.EDIT || formMode === formModeEnum.DETAILS) {
            getDriverData()
        }
    }, [])

    const getDriverData = () => {
        getDataById('/drivers',driverId.driverId)
            .then(res => res.data)
            .then(
                (data) => {
                    if(!data){
                        setDriver(null);
                        setError({message: 'i18next'})
                    }else{
                        setDriver(data);
                        setError(null)
                    }
                    setIsLoaded(true);
                },
                (error) => {
                    setIsLoaded(true);
                    setError({message: 'i18next niepowodzenie'});
                }
            )
    }

    const submitForm = (values) => {
        if (formMode === formModeEnum.NEW) {
            return postData("api" + route, values)
        }else if(formMode === formModeEnum.EDIT){
            values.id = parseInt(driverId.driverId);
            return updateData("api" + route,driverId.driverId, values)
        }
    }

    return (
        (driver || formMode === formModeEnum.NEW) ?
            //<main>
            //<div className="main-content">
            <React.Fragment>
                <h2>{t(header)}</h2>
                <Formik
                    initialValues={
                        {
                            first_name: driver ? driver.first_name : '',
                            last_name: driver ? driver.last_name : '',
                            birthdate: driver ? getFormattedDate(driver.birthdate) : '',
                            weight: driver ? driver.weight : '',
                            phone_number: driver ? driver.phone_number : '',
                            manager_id: user ? user.userId : '',
                        }
                    } onSubmit={
                    async (values) => {
                        await submitForm(values)
                            .then(() => {
                                    navigate(route);
                                });
                    }

                    // async (values) => {
                    //     await postData("api"+route, values)
                    //         .then(() => {
                    //             navigate('/drivers');
                    //         })
                    // }
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

                            <label htmlFor="first_name">{t("first_name")}: <span className="symbol-required">*</span></label>
                            <input type="text" name="first_name" id="first_name" placeholder={t("char2_20")}
                                   value={values.first_name} onChange={handleChange}
                                   disabled={formMode === formModeEnum.DETAILS}
                            />
                            {errors.first_name && touched.first_name ? (
                                    <span id="errorFirstName" className="errors-text">{errors.first_name}</span>
                                )
                                : ''
                            }

                            <label htmlFor="last_name">{t("last_name")}: <span className="symbol-required">*</span></label>
                            <input type="text" name="last_name" id="last_name" placeholder={t("char2_20")}
                                   value={values.last_name} onChange={handleChange}
                                   disabled={formMode === formModeEnum.DETAILS}
                            />
                            {errors.last_name && touched.last_name ? (
                                    <span id="errorLastName" className="errors-text">{errors.last_name}</span>
                                )
                                : ''
                            }

                            <label htmlFor="birthdate">{t("birthdate")}: <span
                                className="symbol-required">*</span></label>
                            <input type="date" name="birthdate" id="birthdate"
                                   value={values.birthdate} onChange={handleChange}
                                   disabled={formMode === formModeEnum.DETAILS}
                            />
                            {errors.birthdate && touched.birthdate ? (
                                    <span id="errorBirthdate" className="errors-text">{errors.birthdate}</span>
                                )
                                : ''
                            }

                            <label htmlFor="weight">{t("weight")}: <span className="symbol-required">*</span></label>
                            <input type="number" name="weight" id="weight"
                                   value={values.weight} onChange={handleChange}
                                   disabled={formMode === formModeEnum.DETAILS}
                            />
                            <span className="form-unit">kg</span>
                            {errors.weight && touched.weight ? (
                                    <span id="errorWeight" className="errors-text">{errors.weight}</span>
                                )
                                : ''
                            }

                            <label htmlFor="phone_number">{t("phone_number")}:</label>

                            <input type="text" name="phone_number" id="phone_number" placeholder={t("char2_9")}
                                   value={values.phone_number} onChange={handleChange}
                                   disabled={formMode === formModeEnum.DETAILS}
                            />
                            {errors.phone_number && touched.phone_number ? (
                                    <span id="errorTelephone" className="errors-text">{errors.phone_number}</span>
                                )
                                : ''
                            }


                            <div className="form-buttons">
                                {formMode === formModeEnum.DETAILS ?
                                    <Link to={`/drivers/edit/${driverId.driverId}`} className="form-button-edit">{t("edit")}</Link>
                                    :
                                    <React.Fragment>
                                        <button onClick={() => {
                                            validateForm().then(
                                                (res) => {
                                                    setErrors(res)
                                                }
                                            );
                                        }}
                                                className="form-button-submit"
                                        >
                                            {t(buttonText)}
                                        </button>
                                        <Link to="/drivers" className="form-button-cancel">{t("cancel")}</Link>
                                    </React.Fragment>
                                }
                            </div>
                        </Form>
                    )}
                </Formik>
            </React.Fragment>
            // </div>
            //</main>
            : <h1>{t('no_access')}</h1>
    )
}

export default DriverForm