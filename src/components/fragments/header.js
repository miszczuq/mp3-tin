import React, {useState} from "react"
import {i18n} from "../../locales/i18n";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {isAuthenticated} from "../../helpers/authHelper";
import {logoutApiCall} from "../../apiCalls/userApiCalls";

function Header(props) {

    const handleLogout = props.handleLogout;

    const [language, setLanguage] = useState('pl');

    const handleOnclick=(e)=>{
        e.preventDefault();
        setLanguage(e.target.value);
        i18n.changeLanguage(e.target.value);
        window.location.reload();
    }


    const {t} = useTranslation();

    return (
        <header>
            <div className="header-content">
                <div className="header-left">
                    <div className="logo_div">
                        <img src="../../images/logo.png" alt="Karting Racing Logo" id="logo"/>
                    </div>
                    <div className="quote">
                        <div className="quote-mark">“</div>
                        <div className="quote-content">
                            <div className="quote-text">If you’re in control, you’re not going fast enough.</div>
                            <div className="quote-author">— Parnelli Jones</div>
                        </div>
                    </div>
                </div>
                <div className="buttons">

                    {!isAuthenticated() ?
                    <React.Fragment>
                    <Link to={"/users/register"} className="button-register">{t("register")}</Link>
                    <Link to={"/users/login"} className="button-login">{t("login")}</Link>
                    </React.Fragment>
                        :
                        <Link to={"/"} className="button-login" onClick={handleLogout}>{'logout'}</Link>
                    }
                        <button value='pl' onClick={handleOnclick} className={"delete-button"}>
                            {t("polish")}
                        </button>
                        <button value='en' onClick={handleOnclick} className={"delete-button"}>
                    {t("english")}
                        </button>
                </div>
            </div>
        </header>
    )
}

export default Header