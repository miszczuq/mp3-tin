import * as Yup from "yup";

const validate = Yup.object().shape({
    driver_id: Yup.string()
        .trim()
        .required("Pole jest wymagane"),
    gokart_id: Yup.string()
        .trim()
        .required("Pole jest wymagane"),
    lap_time: Yup.number()
        .required("Pole jest wymagane")
        .min(0, "Wartość musi być dodatnia"),
    wet_track: Yup.boolean()
        .required("Pole jest wymagane"),
})

export default validate;