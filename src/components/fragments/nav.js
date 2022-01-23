import React from "react"

import {
    NavLink
} from 'react-router-dom'
import {useTranslation} from "react-i18next";

function Navigation(){

    const {t} = useTranslation();

    return (
        <nav>
            <div className="nav-content">
                <ul className="nav-list">
                    <li><NavLink to="/" activeClassName='active'> {t("main_page")}</NavLink></li>
                    <li><NavLink to="/drivers" activeClassName='active'>{t("drivers")}</NavLink></li>
                    <li><NavLink to="/gokarts" activeClassName='active'>{t("gokarts")}</NavLink></li>
                    <li><NavLink to="/driverGokarts" activeClassName='active'>{t("laps")}</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navigation