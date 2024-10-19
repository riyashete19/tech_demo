import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig"; // Adjust the import based on your file structure
import { collection, addDoc } from "firebase/firestore";

export default function SeniorSignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    bloodGrp: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    chronicConditions: "",
    medications: "",
    allergies: "",
    previousSurgeries: "",
    mobilityIssues: "",
    cognitiveImpairments: "",
    visionHearingImpairments: "",
    dietaryRestrictions: "",
    physicalActivityLevel: "",
    livingSituation: "",
    caregiverSupport: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    consentToShareData: false,
    preferredContactMethod: "",
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user data to Firestore
      await addDoc(collection(db, "patients"), {
        ...formData,
        uid: user.uid,
        createdAt: new Date(),
      });

      console.log("User created and data saved!");
      // Redirect to the dashboard after successful signup
      navigate("/patient-dashboard"); // Navigate to the patient dashboard

    } catch (error) {
      // Error handling for specific Firebase errors
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already in use. Please try with a different email or login.");
      } else {
        console.error("Error during signup: ", error);
        alert("Error signing up. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-blue-600 p-8 text-white flex flex-col justify-center items-center">
            <div className="w-24 h-24 mb-4 rounded-full bg-white flex items-center justify-center">
              <span className="text-blue-600">👤</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Join SeniorCare</h2>
            <p className="text-center mb-4">
              Create your profile for personalized care and support
            </p>
          </div>
          <div className="md:w-2/3 p-8">
            <h2 className="text-3xl font-bold text-blue-700 mb-6">Senior Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-600">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="text-blue-700">Full Name</label>
                    <input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-500 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="dateOfBirth" className="text-blue-700">Date of Birth</label>
                    <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                      className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-500 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="gender" className="text-blue-700">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-500 rounded-md p-2"
                    >
                      <option value="" disabled>Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="bloodGrp" className="text-blue-700">Blood Group</label>
                    <input
                      id="bloodGrp"
                      name="bloodGrp"
                      value={formData.bloodGrp}
                      onChange={handleChange}
                      required
                      className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-500 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-blue-700">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-500 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="text-blue-700">Password</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-500 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="text-blue-700">Confirm Password</label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-500 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="phoneNumber" className="text-blue-700">Phone Number</label>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-500 rounded-md p-2"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-600">Medical History</h3>
                <div>
                  <label htmlFor="chronicConditions" className="text-blue-700">Chronic Conditions</label>
                  <textarea
                    id="chronicConditions"
                    name="chronicConditions"
                    value={formData.chronicConditions}
                    onChange={handleChange}
                    placeholder="e.g., diabetes, hypertension, heart disease"
                    className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-500 rounded-md p-2"
                  />
                </div>
                <div>
                  <label htmlFor="medications" className="text-blue-700">Current Medications</label>
                  <textarea
                    id="medications"
                    name="medications"
                    value={formData.medications}
                    onChange={handleChange}
                    placeholder="List any medications you're currently taking"
                    className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-500 rounded-md p-2"
                  />
                </div>
                <div>
                  <label htmlFor="allergies" className="text-blue-700">Allergies</label>
                  <textarea
                    id="allergies"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    placeholder="List any allergies (medications, food, environmental)"
                    className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-500 rounded-md p-2"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-600">Emergency Contact</h3>
                <div>
                  <label htmlFor="emergencyContactName" className="text-blue-700">Contact Name</label>
                  <input
                    id="emergencyContactName"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleChange}
                    required
                    className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-500 rounded-md p-2"
                  />
                </div>
                <div>
                  <label htmlFor="emergencyContactPhone" className="text-blue-700">Contact Phone Number</label>
                  <input
                    id="emergencyContactPhone"
                    name="emergencyContactPhone"
                    type="tel"
                    value={formData.emergencyContactPhone}
                    onChange={handleChange}
                    required
                    className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-500 rounded-md p-2"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    name="consentToShareData"
                    type="checkbox"
                    checked={formData.consentToShareData}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-blue-700">I consent to share my medical data for caregiving purposes.</span>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700"
                >
                  Sign Up
                </button>
              </div>
              <p className="text-center">
                Already have an account?{" "}
                <Link to="/patient-login" className="text-blue-600 hover:underline">Log In</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
