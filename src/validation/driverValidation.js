import * as Yup from "yup";

const today = new Date(Date.now());

const validate = Yup.object().shape({
    first_name: Yup.string()
        .min(2,"Pole musi mieć przynajmniej 2 znaki")
        .max(20,"Pole nie może być dłuższe niż 20 znaków")
        .required("Pole jest wymagane"),
    last_name: Yup.string()
        .min(2,"Pole musi mieć przynajmniej 2 znaki")
        .max(20,"Pole nie może być dłuższe niż 20 znaków")
        .required("Pole jest wymagane"),
    birthdate: Yup.date()
        .required("Pole jest wymagane")
        .max(today, "Data musi być z przeszłości"),
    weight: Yup.number()
        .required("Pole jest wymagane")
        .min(0, "Wartość musi być dodatnia"),
    phone_number: Yup.string()
        .min(2, "Pole musi mieć przynajmniej 2 znaki")
        .max(9,"Pole nie może być dłuższe niż 9 znaków")
})

export default validate;