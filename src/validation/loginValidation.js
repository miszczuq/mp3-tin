import * as Yup from "yup";
import i18n from 'i18next'

const validate = Yup.object().shape({
    username: Yup.string()
        .min(2,(obj) => i18n.t("more_than")+' '+obj.min)
        .max(10, (obj) => i18n.t("less_than")+' '+obj.max)
        .required(i18n.t("required")),
    password: Yup.string()
        .min(5,(obj) => i18n.t("more_than")+' '+obj.min)
        .max(50,(obj) => i18n.t("less_than")+' '+obj.max)
        .required(i18n.t("required")),

})

export default validate;