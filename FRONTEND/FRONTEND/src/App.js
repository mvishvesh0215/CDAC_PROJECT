
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Body from './Components/Body';
import Header from './Components/Header';
//import SubBody from './Components/SubBody';
import About from './Components/About';
import Contact from './Components/Contact';
import Login from './Components/Login';
import Register from './Components/Register';
import SafetyInstructions from './Components/SafetyInstructions';
import Faq from './Components/Faq';
import Dashboard from './Components/Dashboard';
import { VendorDashboard } from './Components/VendorDashboard';
import NewSubscription from './Components/NewSubscription';
import CustomerTable  from './Components/CustomerTable';
import Subscriptions from './Components/Subscriptions';
import CustomerLandingPage from './Components/CustomerLandingPage';
import VendorSubscriptions from './Components/VendorSubscriptions';
import Profile from './Components/Profile';

function App() {
  const location=useLocation()
  const hideHeader=location.pathname.startsWith("/vendor")&&location.pathname.startsWith("/customer")
  return (
    <div className="App">
      {!(location.pathname.startsWith("/vendor")||location.pathname.startsWith("/customer")) &&  <Header />}
      <Routes>
        <Route path='/' element={<Body/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Contact' element={<Contact/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/safety' element={<SafetyInstructions/>}/>
        <Route path='/faq' element={<Faq/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        
        <Route path='/customer/*' element={<VendorDashboard/>}>
          <Route index element={<CustomerLandingPage />} /> {/* Default subpage */}
          <Route path='vendors' element={<Subscriptions/>}/>
          <Route path='vendor/subscriptions/:vendorId' element={<VendorSubscriptions/>}/>
          <Route path='profile' element={<Profile/>}/>
        </Route>
        
        <Route path='/vendor/*' element={<VendorDashboard/>}>
          <Route index element={<CustomerTable />} /> {/* Default subpage */}
          <Route path='newSubscription' element={<NewSubscription/>}/>
          <Route path='subscriptions' element={<Subscriptions/>}/>
          <Route path='profile' element={<Profile/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
