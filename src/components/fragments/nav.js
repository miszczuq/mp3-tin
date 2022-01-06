import React from "react"

import {
    NavLink
} from 'react-router-dom'

function Navigation(){
    return (
        <nav>
            <div className="nav-content">
                <ul className="nav-list">
                    <li><NavLink to="/" activeClassName='active'> Strona główna</NavLink></li>
                    <li><NavLink to="/drivers" activeClassName='active'>Kierowcy</NavLink></li>
                    <li><NavLink to="/gokarts" activeClassName='active'>Gokarty</NavLink></li>
                    <li><NavLink to="/driverGokarts" activeClassName='active'>Przejazdy</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navigation