import * as Yup from "yup";
import {useTranslation} from "react-i18next";
import i18n from "i18next";

const validate = Yup.object().shape({
    driver_id: Yup.string()
        .trim()
        .required(() => i18n.t("required")),
    gokart_id: Yup.string()
        .trim()
        .required(() => i18n.t("required")),
    lap_time: Yup.number()
        .required(() => i18n.t("required"))
        .min(0,  () => i18n.t("positive")),
    wet_track: Yup.boolean()
        .required(() => i18n.t("required")),
})

export default validate;