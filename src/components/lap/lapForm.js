import React, {useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {Field, Form, Formik} from "formik";
import {postData} from "../../apiCalls/postData";
import validate from "../../validation/lapValidation";
import formModeEnum from "../../helpers/formHelper";
import {updateData} from "../../apiCalls/updateData";
import {useTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";
import {getDataById} from "../../apiCalls/getDataById";
import {getData} from "../../apiCalls/getData";

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

    const {t} = useTranslation();

    useEffect(() => {
        if (isAuthenticated()) {
            getAllGokarts()
            getAllDrivers()
            if (formMode === formModeEnum.EDIT || formMode === formModeEnum.DETAILS) {
                getLapData()
            }
        } else {
            navigate('/users/login');
        }

    }, [])

    const getAllDrivers = () => {
        getData('/drivers')
            .then(res => res.data)
            .then((data) => {
                setAllDrivers(data);
            })
    }

    const getAllGokarts = () => {
        getData('/gokarts')
            .then(res => res.data)
            .then((data) => {
                setAllGokarts(data);
            })
    }

    const getLapData = () => {
        getDataById('/driverGokarts', lapId.lapId)
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
        } else if (formMode === formModeEnum.EDIT) {
            values.id = parseInt(lapId.lapId);
            return updateData("api" + route, lapId.lapId, values)
        }
    }

    return (
        (lap || formMode === formModeEnum.NEW) ?
            <React.Fragment>
                <h2>{t(header)}</h2>
                <Formik
                    initialValues={
                        {
                            driver: lap ? lap.driver : '',
                            gokart: lap ? lap.gokart : '',
                            gokart_id: lap ? lap.gokart.id : '',
                            driver_id: lap ? lap.driver.id : '',
                            lap_time: lap ? lap.lap_time : '',
                            wet_track: lap ? lap.wet_track.toString() : '',
                        }
                    } onSubmit={
                    async (values) => {
                        await submitForm(values)
                            .then(() => {
                                navigate(route);
                            });
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
                        <Form className="form">

                            <label htmlFor="driver_id">{t("driver")}: <span className="symbol-required">*</span></label>
                            <Field as={"select"} name={"driver_id"} disabled={formMode === formModeEnum.DETAILS}>
                                <option value={''}>=== ===</option>
                                {
                                    allDrivers.map(driver =>
                                        <option key={driver.id} value={driver.id}
                                                label={driver.first_name + ' ' + driver.last_name}
                                                selected={lap && driver.id === parseInt(lap.driver.id)}></option>
                                    )

                                }
                            </Field>
                            {errors.driver_id && touched.driver_id ? (
                                    <span id="errorDriver" className="errors-text">{errors.driver_id}</span>
                                )
                                : ''
                            }

                            <label htmlFor="gokart_id">{t("gokart")}: <span className="symbol-required">*</span></label>
                            <Field as={"select"} name={"gokart_id"} disabled={formMode === formModeEnum.DETAILS}>
                                <option value={''}>=== ===</option>
                                {
                                    allGokarts.map(gokart =>
                                        <option key={gokart.id} value={gokart.id}
                                                label={gokart.brand + ' ' + gokart.model}
                                                selected={lap && gokart.id === parseInt(lap.gokart.id)}></option>
                                    )
                                }
                            </Field>
                            {errors.gokart_id && touched.gokart_id ? (
                                    <span id="errorGokart" className="errors-text">{errors.gokart_id}</span>
                                )
                                : ''
                            }
                            <label htmlFor="lap_time">{t("lap_time")}: <span
                                className="symbol-required">*</span></label>
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

                            <label>{t("surface")}: <span className="symbol-required">*</span></label>

                            <div className={"form-radio"}>
                                <label>
                                    <Field type={"radio"} name="wet_track" id={"wet"} value={"true"}
                                           disabled={formMode === formModeEnum.DETAILS}
                                           checked={values.wet_track === "true"}
                                    />
                                    {t("wet")}
                                </label>
                                <label>
                                    <Field type={"radio"} name="wet_track" id={"dry"} value={"false"}
                                           disabled={formMode === formModeEnum.DETAILS}
                                           checked={values.wet_track === "false"}
                                    />
                                    {t("dry")}

                                </label>
                            </div>

                            {errors.wet_track && touched.wet_track ? (
                                    <span id="errorWetTrack" className="errors-text">{errors.wet_track}</span>
                                )
                                : ''
                            }


                            <div className="form-buttons">
                                {formMode === formModeEnum.DETAILS ?
                                    <Link to={`/driverGokarts/edit/${lapId.lapId}`}
                                          className="form-button-edit">{t("edit")}</Link>
                                    :
                                    <React.Fragment>
                                        <button
                                            onClick={() => {
                                                validateForm().then(
                                                    (res) => {
                                                        setErrors(res);
                                                    }
                                                );
                                            }}
                                            className="form-button-submit"
                                        >
                                            {t(buttonText)}
                                        </button>
                                        <Link to="/driverGokarts" className="form-button-cancel">{t("cancel")}</Link>
                                    </React.Fragment>
                                }
                            </div>
                        </Form>
                    )}
                </Formik>
            </React.Fragment>
            : <h1>{t('no_access')}</h1>
    )
}

export default LapForm