import * as Yup from "yup";

const validate = Yup.object().shape({
    first_name: Yup.string()
        .max(20,"Pole nie może być dłuższe niż 20 znaków")
        .required("Pole jest wymagane"),
    last_name: Yup.string()
        .max(20,"Pole nie może być dłuższe niż 20 znaków")
        .required("Pole jest wymagane"),
    birthdate: Yup.date()
        .required("Pole jest wymagane"),
    weight: Yup.number()
        .required("Pole jest wymagane"),
    phone_number: Yup.string()
        .max(20,"Pole nie może być dłuższe niż 20 znaków")
})

export default validate;