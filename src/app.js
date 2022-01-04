import TopMenu from "./components/fragments/topMenu"
import Footer from "./components/fragments/footer";
import MainPage from "./components/mainPage";

import DriverDetails from './components/driver/driverDetails'
import DriverList from './components/driver/driverList'
import DriverForm from "./components/driver/driverForm";

import {BrowserRouter as Router, Route, Routes,} from 'react-router-dom'

function App() {
    return (
        <Router>
            <div className="master-container">
                <TopMenu/>
                <Routes>
                    <Route exact path="/" element={<MainPage/>}/>
                    <Route exact path="/drivers" element={<DriverList/>}/>
                    <Route exact path="/drivers/details/:driverId" element={<DriverDetails/>}/>
                    <Route exact path="/drivers/add" element={<DriverForm/>}/>
                    <Route exact path="/drivers/add/:driverId" element={<DriverForm/>}/>
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
