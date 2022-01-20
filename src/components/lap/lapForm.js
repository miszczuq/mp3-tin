import React, {useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'

import {getLapByIdApiCall} from "../../apiCalls/lapApiCalls";
import {Form, Formik, Field} from "formik";
import {getFormattedDate} from "../../helpers/dateHelper";
import {postData} from "../../apiCalls/postData";
import validate from "../../validation/lapValidation";
import formModeEnum from "../../helpers/formHelper";
import {updateData} from "../../apiCalls/updateData";
import {getDriverApiCall} from "../../apiCalls/driverApiCalls";
import {getGokartApiCall} from "../../apiCalls/gokartApiCalls";

function LapForm(props) {
    const navigate = useNavigate();
    const route = '/driverGokarts'
    const formMode = props.params.formMode
    const header = props.params.header
    const buttonText = props.params.buttonText

    const [lapId, setLapId] = useState(useParams())
    const [lap, setLap] = useState(null)
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState(null)
    const [allDrivers, setAllDrivers] = useState([]);
    const [allGokarts, setAllGokarts] = useState([]);

    useEffect(() => {
        getAllGokarts()
        getAllDrivers()
        if (formMode === formModeEnum.EDIT || formMode === formModeEnum.DETAILS) {
            getLapData()
        }
    }, [])

    const getAllDrivers = () => {
        getDriverApiCall()
            .then(res => res.data)
            .then((data) => {
                setAllDrivers(data);
            })
    }

    const getAllGokarts = () => {
        getGokartApiCall()
            .then(res => res.data)
            .then((data) => {
                setAllGokarts(data);
            })
    }

    const getLapData = () => {
        getLapByIdApiCall(lapId)
            .then(res => res.data)
            .then(
                (data) => {
                    setLap(data);
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
            values.id = parseInt(lapId.lapId);
            return updateData("api" + route,lapId.lapId, values)
        }
    }

    const test = () => {
        console.log("lap", lap);
        console.log("allDrivers",allDrivers);
        console.log("allGokarts",allGokarts);
    }

    return (
        (lap || formMode === formModeEnum.NEW) ?
            //<main>
            //<div className="main-content">
            <React.Fragment>
                <h2>{header}</h2>
                <Formik
                    initialValues={
                        {
                            driver: lap ? lap.driver : '',
                            gokart: lap ? lap.gokart : '',
                            lap_time: lap ? lap.lap_time : '',
                            wet_track: lap ? lap.wet_track : '',
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
                    //             navigate('/driverGokarts');
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

                            <label htmlFor="driver_id">Kierowca: <span className="symbol-required">*</span></label>
                            <select name={"driver_id"} id={"driver_id"} required disabled={formMode === formModeEnum.DETAILS}
                                    value={values.driver} onChange={handleChange}>
                                <option value={''}>=== Wybierz Kierowcę ===</option>
                                {
                                    allDrivers.map(driver =>
                                        <option key={driver.id} value={driver.id} label={driver.first_name+' '+driver.last_name}
                                                selected={lap && driver.id === parseInt(lap.driver.id)}> </option>
                                    )

                                }
                            </select>
                            {errors.driver_id && touched.driver_id ? (
                                    <span id="errorDriver" className="errors-text">{errors.driver_id}</span>
                                )
                                : ''
                            }

                            <label htmlFor="gokart_id">Gokart: <span className="symbol-required">*</span></label>
                            <select name={"gokart_id"} id={"gokart_id"} required disabled={formMode === formModeEnum.DETAILS}>
                                {
                                    test()
                                }
                                <option value={''}>=== Wybierz Gokart ===</option>
                                {
                                    allGokarts.map(gokart =>
                                        <option key={gokart.id} value={gokart.id} label={gokart.model+' '+gokart.brand}
                                                selected={lap && gokart.id === parseInt(lap.gokart.id)}> </option>
                                    )

                                }
                            </select>
                            {errors.gokart_id && touched.gokart_id ? (
                                    <span id="errorGokart" className="errors-text">{errors.gokart_id}</span>
                                )
                                : ''
                            }


                            <label htmlFor="lap_time">Czas przejazdu: <span className="symbol-required">*</span></label>
                            <input type="number" name="lap_time" id="lap_time"
                                   value={values.lap_time} onChange={handleChange}
                                   disabled={formMode === formModeEnum.DETAILS}
                            />
                            <span className="form-unit">s</span>
                            {errors.lap_time && touched.lap_time ? (
                                    <span id="errorLapTime" className="errors-text">{errors.lap_time}</span>
                                )
                                : ''
                            }

                            <label>Stan nawierzchni: <span className="symbol-required">*</span></label>

                            <div className={"form-radio"} role={"group"} aria-labelledby={"my-radio-group"}>
                                <label>
                                    <Field  type={"radio"} name={"wet_track"} id={"wet"} value={"true"}
                                            disabled={formMode === formModeEnum.DETAILS} checked={lap && lap.wet_track}>
                                        Mokra
                                    </Field>
                                </label>
                                <label>
                                    <Field  type={"radio"} name={"wet_track"} id={"dry"} value={"false"}
                                            disabled={formMode === formModeEnum.DETAILS} checked={lap && !lap.wet_track}>
                                        Sucha
                                    </Field>
                                </label>




                                {/*<input type={"radio"} name={"wet_track"} id={"wet"} value={"true"}*/}
                                {/*       disabled={formMode === formModeEnum.DETAILS} checked={lap && lap.wet_track}*/}
                                {/*/>*/}
                                {/*<label htmlFor="wet">Mokra</label>*/}

                                {/*<input type={"radio"} name={"wet_track"} id={"dry"} value={"false"}*/}
                                {/*       disabled={formMode === formModeEnum.DETAILS} checked={lap && !lap.wet_track}*/}
                                {/*/>*/}
                                {/*<label htmlFor="dry">Sucha</label>*/}
                            </div>

                            {errors.wet_track && touched.wet_track ? (
                                    <span id="errorWetTrack" className="errors-text">{errors.wet_track}</span>
                                )
                                : ''
                            }


                            <div className="form-buttons">
                                {formMode === formModeEnum.DETAILS ?
                                    <Link to={`/driverGokarts/edit/${lapId.lapId}`} className="form-button-edit">Edytuj</Link>
                                    :
                                    <React.Fragment>
                                        <button onClick={() => {
                                            validateForm().then(
                                                (res) => {
                                                    if (Object.keys(res).length === 0) {
                                                        handleSubmit()
                                                    } else {
                                                        setErrors(res)
                                                    }
                                                }
                                            );
                                        }}
                                                className="form-button-submit"
                                        >
                                            {buttonText}
                                        </button>
                                        <Link to="/driverGokarts" className="form-button-cancel">Anuluj</Link>
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

export default LapForm