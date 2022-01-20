import TopMenu from "./components/fragments/topMenu"
import Footer from "./components/fragments/footer";
import MainPage from "./components/mainPage";

import DriverDetails from './components/driver/driverDetails'
import DriversList from './components/driver/driversList'
import DriverForm from "./components/driver/driverForm";

import GokartList from "./components/gokart/gokartList";

import {BrowserRouter as Router, Route, Routes,} from 'react-router-dom'
import DriverFormEdit from "./components/driver/driverFormEdit";
import formModeEnum from "./helpers/formHelper";
import DriverFormAdd from "./components/driver/driverFormAdd";

function App() {
    return (
        <Router>
            <div className="master-container">
                <TopMenu/>
                <Routes>
                    <Route exact path="/" element={<MainPage/>}/>
                    <Route exact path="/drivers" element={<DriversList/>}/>
                    <Route exact path="/drivers/details/:driverId" element={<DriverDetails/>}/>
                    <Route exact path="/drivers/add" element={<DriverFormAdd/>}/>
                    <Route exact path="/drivers/edit/:driverId" element={<DriverFormEdit/>}/>


                    <Route exact path="/gokarts" element={<GokartList/>}/>
                    {/*<Route exact path="/gokarts/details/:gokartId" element={<GokartDetails/>}/>*/}
                    {/*<Route exact path="/gokarts/add" element={<GokartForm/>}/>*/}
                    {/*<Route exact path="/gokarts/add/:gokartId" element={<GokartForm/>}/>*/}
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
