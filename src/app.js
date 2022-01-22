import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import TopMenu from "./components/fragments/topMenu"
import Footer from "./components/fragments/footer";
import MainPage from "./components/mainPage";

import DriverDetails from './components/driver/driverDetails'
import DriverList from './components/driver/driverList'
import DriverFormEdit from "./components/driver/driverFormEdit";
import DriverFormAdd from "./components/driver/driverFormAdd";

import GokartList from "./components/gokart/gokartList";
import GokartFormEdit from "./components/gokart/gokartFormEdit"
import GokartFormAdd from "./components/gokart/gokartFormAdd"
import GokartDetails from "./components/gokart/gokartDetails";

import LapList from "./components/lap/lapList";
import LapFormAdd from "./components/lap/lapFormAdd";
import LapFormEdit from "./components/lap/lapFormEdit";
import LapDetails from "./components/lap/lapDetails";


function App() {
    return (
        <Router>
            <div className="master-container">
                <TopMenu/>
                <Routes>
                    <Route exact path="/" element={<MainPage/>}/>

                    <Route exact path="/drivers" element={<DriverList/>}/>
                    <Route exact path="/drivers/details/:driverId" element={<DriverDetails/>}/>
                    <Route exact path="/drivers/add" element={<DriverFormAdd/>}/>
                    <Route exact path="/drivers/edit/:driverId" element={<DriverFormEdit/>}/>

                    <Route exact path="/gokarts" element={<GokartList/>}/>
                    <Route exact path="/gokarts/details/:gokartId" element={<GokartDetails/>}/>
                    <Route exact path="/gokarts/add" element={<GokartFormAdd/>}/>
                    <Route exact path="/gokarts/edit/:gokartId" element={<GokartFormEdit/>}/>

                    <Route exact path="/driverGokarts" element={<LapList/>}/>
                    <Route exact path="/driverGokarts/add" element={<LapFormAdd/>}/>
                    <Route exact path="/driverGokarts/edit/:lapId" element={<LapFormEdit/>}/>
                    <Route exact path="/driverGokarts/details/:lapId" element={<LapDetails/>}/>
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
