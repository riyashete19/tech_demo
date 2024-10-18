import { useState } from 'react';
import "../App.css"; 

import Login_Page from './login';

import SeniorSignupPage from './patient_signup';

import UserTypeSelection from './UserTypeSelection';
import NurseDashboard from './NurseDashboard';



function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* <Login_Page /> */}
      {/* <SignupPage/> */}
      {/* <SeniorSignupPage/> */}
      {/* <LandingPage/> */}
      {/* <UserTypeSelection/>
       */}
       {/* <NurseDashboard/> */}
       <PatientDashboard/>
         
    </div>
  );
}

export default App;