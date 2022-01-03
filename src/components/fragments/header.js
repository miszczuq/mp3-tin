import React from "react"

function Header() {
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
                    <div className="button-register">Register</div>
                    <div className="button-login">Login</div>
                </div>
            </div>
        </header>
    )
}

export default Header