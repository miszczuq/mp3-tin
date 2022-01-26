import React from "react"
import Header from "../fragments/header";
import Navigation from "../fragments/nav";

function TopMenu(props) {
    const handleLogout = props.handleLogout;

    return (
        <div className="top-menu">
            <Header handleLogout={handleLogout}/>
            <Navigation/>
        </div>
    )
}

export default TopMenu