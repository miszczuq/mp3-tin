import React from "react"
import Header from "../fragments/header";
import Navigation from "../fragments/nav";

function TopMenu() {
    return (
        <div className="top-menu">
            <Header/>
            <Navigation/>
        </div>
    )
}

export default TopMenu