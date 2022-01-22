import React, {useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import formModeEnum from "../../helpers/formHelper";
import {getGokartByIdApiCall} from "../../apiCalls/gokartApiCalls";
import {postData} from "../../apiCalls/postData";
import {updateData} from "../../apiCalls/updateData";
import {Form, Formik} from "formik";
import {getFormattedDate} from "../../helpers/dateHelper";
import validate from "../../validation/gokartValidation";

function GokartForm(props){
    const navigate = useNavigate();
    const route = '/gokarts'
    const formMode = props.params.formMode
    const header = props.params.header
    const buttonText = props.params.buttonText

    const [gokartId, setGokartId] = useState(useParams())
    const [gokart, setGokart] = useState(null)
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        if (formMode === formModeEnum.EDIT || formMode === formModeEnum.DETAILS) {
            getGokartData()
        }
    }, [])

    const getGokartData = () => {
        getGokartByIdApiCall(gokartId)
            .then(res => res.data)
            .then(
                (data) => {
                    setGokart(data);
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
            values.id = parseInt(gokartId.gokartId);
            return updateData("api" + route,gokartId.gokartId, values)
        }
    }

    return (
        (gokart || formMode === formModeEnum.NEW) ?
        <React.Fragment>
            <h2>{header}</h2>
            <Formik
                initialValues={
                    {
                        brand: gokart ? gokart.brand : '',
                        model: gokart ? gokart.model : '',
                        color: gokart ? gokart.color : '',
                        horse_power: gokart ? gokart.horse_power : '',
                        weight: gokart ? gokart.weight : '',
                        fuel_consumption: gokart ? gokart.fuel_consumption : ''
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
                //             navigate('/gokarts');
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

                        <label htmlFor="brand">Marka: <span className="symbol-required">*</span></label>
                        <input type="text" name="brand" id="brand" placeholder="2-20 znaków"
                               value={values.brand} onChange={handleChange}
                               disabled={formMode === formModeEnum.DETAILS}
                        />
                        {errors.brand && touched.brand ? (
                                <span id="errorBrand" className="errors-text">{errors.brand}</span>
                            )
                            : ''
                        }

                        <label htmlFor="model">Model: <span className="symbol-required">*</span></label>
                        <input type="text" name="model" id="model" placeholder="2-50 znaków"
                               value={values.model} onChange={handleChange}
                               disabled={formMode === formModeEnum.DETAILS}
                        />
                        {errors.model && touched.model ? (
                                <span id="errorModel" className="errors-text">{errors.model}</span>
                            )
                            : ''
                        }

                        <label htmlFor="color">Color: <span
                            className="symbol-required">*</span></label>
                        <input type="text" name="color" id="color" placeholder="2-20 znaków"
                               value={values.color} onChange={handleChange}
                               disabled={formMode === formModeEnum.DETAILS}
                        />
                        {errors.color && touched.color ? (
                                <span id="errorColor" className="errors-text">{errors.color}</span>
                            )
                            : ''
                        }

                        <label htmlFor="horse_power">Moc: <span className="symbol-required">*</span></label>
                        <input type="number" name="horse_power" id="horse_power"
                               value={values.horse_power} onChange={handleChange}
                               disabled={formMode === formModeEnum.DETAILS}
                        />
                        <span className="form-unit">KM</span>
                        {errors.horse_power && touched.horse_power ? (
                                <span id="errorHorsePower" className="errors-text">{errors.horse_power}</span>
                            )
                            : ''
                        }

                        <label htmlFor="weight">Waga: <span className="symbol-required">*</span></label>
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

                        <label htmlFor="fuel_consumption">Zużycie paliwa:</label>
                        <input type="number" name="fuel_consumption" id="fuel_consumption"
                               value={values.fuel_consumption} onChange={handleChange}
                               disabled={formMode === formModeEnum.DETAILS}
                        />
                        <span className="form-unit">(l/100km)</span>
                        {errors.fuel_consumption && touched.fuel_consumption ? (
                                <span id="errorFuelConsumption" className="errors-text">{errors.fuel_consumption}</span>
                            )
                            : ''
                        }


                        <div className="form-buttons">
                            {formMode === formModeEnum.DETAILS ?
                                <Link to={`/gokarts/edit/${gokartId.gokartId}`} className="form-button-edit">Edytuj</Link>
                                :
                                <React.Fragment>
                                    <button onClick={() => {
                                        validateForm().then(
                                            (res) => {
                                                // if (Object.keys(res).length === 0) {
                                                //     handleSubmit()
                                                // } else {
                                                //     setErrors(res)
                                                // }
                                                setErrors(res);
                                            }
                                        );
                                    }}
                                            className="form-button-submit"
                                    >
                                        {buttonText}
                                    </button>
                                    <Link to="/gokarts" className="form-button-cancel">Anuluj</Link>
                                </React.Fragment>
                            }
                        </div>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
            : <h1>LOADING</h1>
    )
}

export default GokartForm;