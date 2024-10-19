import { useState } from "react";
import { Link } from "react-router-dom"; 
import { motion } from "framer-motion";
import { auth, db } from "../firebase/firebaseConfig"; // Import Firebase services
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Firestore functions

export default function NurseSignupPage({ onRegister, setShowNurseSignup }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    qualification: "",
    workplace: "",
    workingHours: "",
    workSchedule: "",
    phoneNumber: "",
    acceptTerms: false,
  });
  const [error, setError] = useState(""); // State to handle error messages

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError(""); // Clear error on input change
  };

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = (password) => password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email and password
    if (!isEmailValid(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    
    if (!isPasswordValid(formData.password)) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (formData.password === formData.confirmPassword) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        // Save user data to Firestore
        await setDoc(doc(db, "nurses", user.uid), {
          fullName: formData.fullName,
          qualification: formData.qualification,
          workplace: formData.workplace,
          workingHours: formData.workingHours,
          workSchedule: formData.workSchedule,
          phoneNumber: formData.phoneNumber,
        });

        onRegister(formData.email, formData.password, formData.fullName);
        // Redirect or show success message
      } catch (error) {
        console.error("Error creating user:", error);
        if (error.code === "auth/email-already-in-use") {
          setError("This email is already in use. Please use a different email.");
        } else {
          setError("Error creating user: " + error.message);
        }
      }
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl max-h-3xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/3 bg-blue-500 p-8 text-white flex flex-col justify-center items-center relative"
          >
            <h2 className="text-3xl font-bold mb-4 text-center">Join Nurse Connect</h2>
            <p className="text-center mb-4">Create your nurse profile and connect with healthcare professionals</p>
          </motion.div>
          <div className="md:w-2/3 p-8">
            <h2 className="text-3xl font-bold text-blue-500 mb-6">Nurse Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="text-blue-900">Full Name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-md p-2"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-blue-900">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-md p-2"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-blue-900">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-md p-2"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="text-blue-900">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-md p-2"
                />
              </div>
              <div>
                <label htmlFor="qualification" className="text-blue-900">Qualification</label>
                <select
                  id="qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  required
                  className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-md p-2"
                >
                  <option value="">Select qualification</option>
                  <option value="rn">Registered Nurse</option>
                  <option value="lpn">Licensed Practical Nurse</option>
                  <option value="aprn">Advanced Practice Registered Nurse</option>
                </select>
              </div>
              <div>
                <label htmlFor="workplace" className="text-blue-900">Current Workplace</label>
                <input
                  id="workplace"
                  name="workplace"
                  type="text"
                  value={formData.workplace}
                  onChange={handleChange}
                  required
                  className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-md p-2"
                />
              </div>
              <div>
                <label htmlFor="workingHours" className="text-blue-900">Working Hours</label>
                <input
                  id="workingHours"
                  name="workingHours"
                  type="text"
                  value={formData.workingHours}
                  onChange={handleChange}
                  required
                  className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-md p-2"
                />
              </div>
              <div>
                <label htmlFor="workSchedule" className="text-blue-900">Work Schedule</label>
                <input
                  id="workSchedule"
                  name="workSchedule"
                  type="text"
                  value={formData.workSchedule}
                  onChange={handleChange}
                  required
                  className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-md p-2"
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="text-blue-900">Phone Number (optional)</label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-md p-2"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="acceptTerms" className="text-blue-900">
                  I accept the{" "}
                  <Link to="/terms" className="text-blue-500 hover:underline">
                    Terms and Conditions
                  </Link>
                </label>
              </div>
              {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error message */}
              <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
                Sign Up
              </button>
              <p className="text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
