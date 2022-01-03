import Header from "./components/fragments/header";
import Navigation from "./components/fragments/nav";
import Footer from "./components/fragments/footer";
import MainPage from "./components/mainPage";

import DriverDetails from './components/driver/driverDetails'
import DriverList from './components/driver/driverList'
import DriverForm from "./components/driver/driverForm";

import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom'

function App() {
  return (
      <Router>
          <div>
              <Header/>
                <Navigation/>
                <Routes>
                    <Route exact path= "/" element={<MainPage/>} />
                    <Route exact path= "/drivers" element={<DriverList/>} />
                    <Route exact path="/drivers/details/:driverId" element={<DriverDetails/>} />
                    <Route exact path="/drivers/add" element={<DriverForm/>} />
                    <Route exact path="/drivers/add/:driverId" element={<DriverForm/>} />
                </Routes>
                <MainPage/>
                <Footer/>
          </div>
      </Router>
  );
}

export default App;
