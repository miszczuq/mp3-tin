import * as Yup from "yup";

const validate = Yup.object().shape({
    brand: Yup.string()
        .max(20,"Pole nie może być dłuższe niż 20 znaków")
        .required("Pole jest wymagane"),
    model: Yup.string()
        .max(20,"Pole nie może być dłuższe niż 20 znaków")
        .required("Pole jest wymagane"),
    color: Yup.string()
        .required("Pole jest wymagane"),
    horse_power: Yup.string()
        .required("Pole jest wymagane"),
    weight: Yup.number()
        .required("Pole jest wymagane"),
    fuel_consumption: Yup.number()
        .max(20,"Pole nie może być dłuższe niż 20 znaków")
})

export default validate;