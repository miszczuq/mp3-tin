import * as Yup from "yup";
import i18n from "i18next";

const validate = Yup.object().shape({
    brand: Yup.string()
        .min(2,(obj) => i18n.t("less_than")+' '+obj.min)
        .max(20,(obj) => i18n.t("less_than")+' '+obj.max)
        .required(i18n.t("required")),
    model: Yup.string()
        .min(2,(obj) => i18n.t("less_than")+' '+obj.min)
        .max(50,(obj) => i18n.t("less_than")+' '+obj.max)
        .required(i18n.t("required")),
    color: Yup.string()
        .required(i18n.t("required"))
        .min(2,(obj) => i18n.t("less_than")+' '+obj.min)
        .max(20,(obj) => i18n.t("less_than")+' '+obj.max),
    horse_power: Yup.number()
        .integer( i18n.t("integer"))
        .required(i18n.t("required"))
        .min(0,  i18n.t("positive")),
    weight: Yup.number()
        .required(i18n.t("required"))
        .min(0,  i18n.t("positive")),
    fuel_consumption: Yup.number()
        .min(0,  i18n.t("positive"))
})

export default validate;