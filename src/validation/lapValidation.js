import * as Yup from "yup";

const validate = Yup.object().shape({
    driver: Yup.string()
        .required("Pole jest wymagane"),
    gokart: Yup.string()
        .required("Pole jest wymagane"),
    lap_time: Yup.number()
        .required("Pole jest wymagane"),
    wet_track: Yup.boolean()
        .required("Pole jest wymagane"),
})

export default validate;