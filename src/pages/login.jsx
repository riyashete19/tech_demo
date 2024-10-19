import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import loginImage from '../pages/images/login_img.png'; // Ensure the image path is correct
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig"; // Adjust the path as needed

export default function Login_Page({ onLogin }) {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const userType = query.get("type"); // Get user type from query
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call Firebase Authentication for login
      await signInWithEmailAndPassword(auth, email, password);
      // Call onLogin if passed as a prop
      if (onLogin) {
        onLogin(email, password);
      }
      // Navigate to the appropriate dashboard based on userType
      if (userType === "patient") {
        navigate("/patient-dashboard");
      } else if (userType === "nurse") {
        navigate("/nurse-dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const handleSignupClick = () => {
    // Redirect to the respective signup page based on user type
    if (userType === "patient") {
      navigate("/patient-signup");
    } else if (userType === "nurse") {
      navigate("/nurse-signup");
    } else {
      alert("User type not specified.");
    }
  };

  return (
    <div className="min-h-screen bg-teal-50 flex items-center justify-center">
      <div className="w-full max-w-4xl h-[400px] bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 text-white flex flex-col justify-center items-center">
            <div className="bg-white h-[100%]"><img src={loginImage} alt="Login" /></div>
          </div>
          <div className="md:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-blue-500 mb-6">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="text-blue-900">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-md p-2"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-teal-700">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-md p-2"
                />
              </div>
              <div className="flex items-center justify-between">
                <Link to="/forgot-password" className="text-sm text-blue-900 hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 hover:font-bold text-white py-2 px-4 rounded">
                Login
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button onClick={handleSignupClick} className="text-blue-900 hover:underline">
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}