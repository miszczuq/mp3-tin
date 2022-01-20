import React, {useEffect, useState} from 'react'
import {getDriverByIdApiCall} from '../../apiCalls/driverApiCalls'
import DriverDetailsData from "./driverDetailsData";
import {Form, Formik} from "formik";
import {postData} from "../../apiCalls/postData";
import validate from "../../validation/driverValidation";
import {Link, useNavigate, useParams} from 'react-router-dom'
import {getFormattedDate} from "../../helpers/dateHelper";

function FormComponent(props) {
    const driver = props.driver;
    const route = props.route;
    const navigate = useNavigate();
    return (
    <main>
        <div className="main-content">
            <h2>Nowy kierowca</h2>
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
                    console.log("values: ", values)
                    await postData("api"+route, values)
                        .then(() => {
                            navigate('/drivers');
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

                        <label htmlFor="first_name">Imię: <span className="symbol-required">*</span></label>
                        <input type="text" name="first_name" id="first_name" placeholder="2-20 znaków"
                               value={values.first_name} onChange={handleChange}
                        />
                        {errors.first_name && touched.first_name ? (
                                <span id="errorFirstName" className="errors-text">{errors.first_name}</span>
                            )
                            : ''
                        }

                        <label htmlFor="last_name">Nazwisko: <span className="symbol-required">*</span></label>
                        <input type="text" name="last_name" id="last_name" placeholder="2-20 znaków"
                               value={values.last_name} onChange={handleChange}
                        />
                        {errors.last_name && touched.last_name ? (
                                <span id="errorLastName" className="errors-text">{errors.last_name}</span>
                            )
                            : ''
                        }

                        <label htmlFor="birthdate">Data urodzenia: <span className="symbol-required">*</span></label>
                        <input type="date" name="birthdate" id="birthdate" placeholder="2-20 znaków"
                               value={values.birthdate} onChange={handleChange}
                        />
                        {errors.birthdate && touched.birthdate ? (
                                <span id="errorBirthdate" className="errors-text">{errors.birthdate}</span>
                            )
                            : ''
                        }

                        <label htmlFor="weight">Waga: <span className="symbol-required">*</span></label>
                        <input type="number" name="weight" id="weight" placeholder="2-20 znaków"
                               value={values.weight} onChange={handleChange}
                        />
                        <span className="form-unit">kg</span>
                        {errors.weight && touched.weight ? (
                                <span id="errorWeight" className="errors-text">{errors.weight}</span>
                            )
                            : ''
                        }

                        <label htmlFor="phone_number">Numer telefonu:</label>
                        <input type="text" name="phone_number" id="phone_number" placeholder="2-20 znaków"
                               value={values.phone_number} onChange={handleChange}
                        />
                        {errors.phone_number && touched.phone_number ? (
                                <span id="errorTelephone" className="errors-text">{errors.phone_number}</span>
                            )
                            : ''
                        }

                        <div className="form-buttons">
                            <button onClick={() => {
                                validateForm().then(
                                    (res) => {
                                        console.log("wyswietlam res: ", res)
                                        if (Object.keys(res).length === 0) {
                                            console.log("pierwszy if")
                                            handleSubmit()
                                        } else {
                                            console.log("else")
                                            setErrors(res)
                                        }
                                    }
                                );
                            }}
                                    className="form-button-submit"
                            >
                                Dodaj kierowcę
                            </button>
                            <Link to="/drivers" className="form-button-cancel">Anuluj</Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    </main>
    )
}

export default FormComponent