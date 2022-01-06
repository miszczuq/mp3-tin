import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import * as fMode from "../../helpers/formHelper"
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import {postData} from "../../apiCalls/postDriverData"

import {getDriverByIdApiCall} from "../../apiCalls/driverApiCalls";

function DriverForm() {
    const navigate = useNavigate();
    //const driverId = useState(useParams());

    const validate = Yup.object().shape({
        first_name: Yup.string().max(20).required("123"),
        second_name: Yup.string().max(20).required("123"),
        last_name: Yup.string().max(20).required("123"),
        birthdate: Yup.date().required("asd"),
        weight: Yup.number().required("asd"),
        phone_number: Yup.string().max(20)
    })

    const [driverId, setDriverId] = useState(useParams())
    const [driver, setDriver] = useState(null)
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState(null)

    console.log("driverId: ", driverId)

    const formMode = driverId ? fMode.EDIT : fMode.NEW;

    const [nestedState, setNestedState] = useState({
        driverId: driverId,
        driver: {
            first_name: '',
            second_name: '',
            last_name: '',
            birthdate: '',
            weight: '',
            phone_number: ''
        },
        errors: {
            first_name: '',
            second_name: '',
            last_name: '',
            birthdate: '',
            weight: '',
            phone_number: ''
        },
        formMode: formMode,
        redirect: false,
        error: null,
    })

    useEffect(() => {
        checkState();
    }, [])

    const checkState = () => {
        if (formMode === fMode.EDIT) {
            getDriverData()
        }
    }

    const getDriverData = () => {
        getDriverByIdApiCall(driverId)
            .then(res => res.data)
            .then(
                (data) => {
                    if (data.message) {
                        setMessage(data.message);
                    } else {
                        setDriver(data);
                        setMessage(null);
                    }
                    setIsLoaded(true)
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    return (
        <main>
            <h2>Nowy kierowca</h2>
            <Formik


                initialValues={
                    {
                        first_name: '',
                        second_name: '',
                        last_name: '',
                        birthdate: '',
                        weight: '',
                        phone_number: ''
                    }
                } onSubmit={
                    async (values) => {
                        console.log("values: ", values)
                        await postData("api/drivers", values)
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
                        {errors.first_name ? (
                                <span id="errorFirstName" className="errors-text">{errors.first_name}siki</span>
                            )
                            : ''
                        }


                        <label htmlFor="second_name">Drugie imię: <span className="symbol-required">*</span></label>
                        <input type="text" name="second_name" id="second_name" placeholder="2-20 znaków"
                               value={values.second_name} onChange={handleChange}
                        />
                        <span id="errorSecondName" className="errors-text"></span>

                        <label htmlFor="last_name">Nazwisko: <span className="symbol-required">*</span></label>
                        <input type="text" name="last_name" id="last_name" placeholder="2-20 znaków"
                               value={values.last_name} onChange={handleChange}
                        />
                        <span id="errorLastName" className="errors-text"></span>

                        <label htmlFor="birthdate">Data urodzenia: <span className="symbol-required">*</span></label>
                        <input type="text" name="birthdate" id="birthdate" placeholder="2-20 znaków"
                               value={values.birthdate} onChange={handleChange}
                        />
                        <span id="errorBirthdate" className="errors-text"></span>

                        <label htmlFor="weight">Waga: <span className="symbol-required">*</span></label>
                        <input type="text" name="weight" id="weight" placeholder="2-20 znaków"
                               value={values.weight} onChange={handleChange}
                        />
                        <span className="form-unit">kg</span>
                        <span id="errorWeight" className="errors-text"></span>

                        <label htmlFor="phone_number">Numer telefonu:</label>
                        <input type="text" name="phone_number" id="phone_number" placeholder="2-20 znaków"
                               value={values.phone_number} onChange={handleChange}
                        />
                        <span id="errorTelephone" className="errors-text"></span>

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
                            }}>Dodaj kierowcę
                            </button>
                        </div>
                        <pre>{JSON.stringify(errors, null, 2)}</pre>
                    </Form>
                )}
            </Formik>
            {/*<form className="form">*/}

            {/*</form>*/}
        </main>
    )
}

export default DriverForm