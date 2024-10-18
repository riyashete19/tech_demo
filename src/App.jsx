import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UserTypeSelection from "./pages/UserTypeSelection";
import PatientDashboard from "./pages/PatientDashboard";
import NurseDashboard from "./pages/NurseDashboard";
import Login_Page from "./pages/login"; // Ensure correct import for your Login_Page component
import PatientSignup from "./pages/patient_signup"; // Ensure correct import for Patient Signup
import NurseSignup from "./pages/nurse_signup"; // Ensure correct import for Nurse Signup

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/select-user-type" element={<UserTypeSelection />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/nurse-dashboard" element={<NurseDashboard />} />
          <Route path="/login" element={<Login_Page />} /> {/* Add this line */}
          <Route path="/patient-signup" element={<PatientSignup />} /> {/* Add Patient Signup Route */}
          <Route path="/nurse-signup" element={<NurseSignup />} /> {/* Add Nurse Signup Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
