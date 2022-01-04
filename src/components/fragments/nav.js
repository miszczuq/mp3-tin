import React from "react"

import {
    NavLink
} from 'react-router-dom'

function Navigation(){
    return (
        <nav>
            <div className="nav-content">
                <ul className="nav-list">
                    <li><NavLink to="/" exact={true} activeClassName='active'> Strona główna</NavLink></li>
                    <li><NavLink to="/drivers" exact={true} activeClassName='active'>Kierowcy</NavLink></li>
                    <li><NavLink to="/gokarts" exact={true} activeClassName='active'>Gokarty</NavLink></li>
                    <li><NavLink to="/driverGokarts" exact={true} activeClassName='active'>Przejazdy</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navigation