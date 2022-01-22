import * as Yup from "yup";

const validate = Yup.object().shape({
    brand: Yup.string()
        .min(2,"Pole musi mieć przynajmniej 2 znaki")
        .max(20,"Pole nie może być dłuższe niż 20 znaków")
        .required("Pole jest wymagane"),
    model: Yup.string()
        .min(2,"Pole musi mieć przynajmniej 2 znaki")
        .max(50,"Pole nie może być dłuższe niż 50 znaków")
        .required("Pole jest wymagane"),
    color: Yup.string()
        .required("Pole jest wymagane")
        .min(2,"Pole musi mieć przynajmniej 2 znaki")
        .max(20,"Pole nie może być dłuższe niż 20 znaków"),
    horse_power: Yup.number()
        .integer("Wartość musi być liczbą całkowitą")
        .required("Pole jest wymagane")
        .min(0, "Wartość musi być dodatnia"),
    weight: Yup.number()
        .required("Pole jest wymagane")
        .min(0, "Wartość musi być dodatnia"),
    fuel_consumption: Yup.number()
        .min(0, "Wartość musi być dodatnia")
})

export default validate;