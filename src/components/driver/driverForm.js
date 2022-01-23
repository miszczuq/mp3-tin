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

function DriverForm(props) {
    const navigate = useNavigate();
    const route = '/drivers'
    const formMode = props.params.formMode
    const header = props.params.header
    const buttonText = props.params.buttonText

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
        getDriverByIdApiCall(driverId)
            .then(res => res.data)
            .then(
                (data) => {
                    setDriver(data);
                    setIsLoaded(true);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
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
                <h2>{header}</h2>
                <Formik
                    initialValues={
                        {
                            first_name: driver ? driver.first_name : '',
                            last_name: driver ? driver.last_name : '',
                            birthdate: driver ? getFormattedDate(driver.birthdate) : '',
                            weight: driver ? driver.weight : '',
                            phone_number: driver ? driver.phone_number : ''
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
                            <input type="text" name="first_name" id="first_name" placeholder="2-20 znaków"
                                   value={values.first_name} onChange={handleChange}
                                   disabled={formMode === formModeEnum.DETAILS}
                            />
                            {errors.first_name && touched.first_name ? (
                                    <span id="errorFirstName" className="errors-text">{errors.first_name}</span>
                                )
                                : ''
                            }

                            <label htmlFor="last_name">{t("last_name")}: <span className="symbol-required">*</span></label>
                            <input type="text" name="last_name" id="last_name" placeholder="2-20 znaków"
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

                            <input type="text" name="phone_number" id="phone_number" placeholder="2-9 znaków"
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
                                            {buttonText}
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
            : <h1>LOADING</h1>
    )
}

export default DriverForm