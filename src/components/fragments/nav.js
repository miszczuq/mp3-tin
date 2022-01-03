import React from "react"

import {
    Link
} from 'react-router-dom'

function Navigation(){
    return (
        <nav>
            <div className="nav-content">
                <ul className="nav-list">
                    <li><Link to="/" className="<%= navLocation === 'main' ? 'active' : ''%>">Strona główna</Link></li>
                    <li><Link to="/drivers" className="<%= navLocation === 'driver' ? 'active' : ''%>">Kierowcy</Link></li>
                    <li><Link to="/gokarts" className="<%= navLocation === 'gokart' ? 'active' : ''%>">Gokarty</Link></li>
                    <li><Link to="/driverGokarts" className="<%= navLocation === 'driverGokart' ? 'active' : ''%>">Przejazdy</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navigation