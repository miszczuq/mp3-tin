import * as Yup from "yup";
import i18n from 'i18next'

const today = new Date(Date.now());

const validate = Yup.object().shape({
    first_name: Yup.string()
        .min(2,(obj) => i18n.t("more_than")+' '+obj.min)
        .max(20, (obj) => i18n.t("less_than")+' '+obj.max)
        .required(i18n.t("required")),
    last_name: Yup.string()
        .min(2,(obj) => i18n.t("more_than")+' '+obj.min)
        .max(20,(obj) => i18n.t("less_than")+' '+obj.max)
        .required(i18n.t("required")),
    birthdate: Yup.date()
        .required(i18n.t("required"))
        .max(today, i18n.t("date_before")),
    weight: Yup.number()
        .required(i18n.t("required"))
        .min(0, i18n.t("positive")),
    phone_number: Yup.string()
        .min(2, (obj) => i18n.t("more_than")+' '+obj.min)
        .max(9,(obj) => i18n.t("less_than")+' '+obj.max)
})

export default validate;