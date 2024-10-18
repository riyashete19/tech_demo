import { useState } from "react";
import { Link } from "react-router-dom";

export default function SeniorSignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    bloodGrp:"",
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

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up logic here
    console.log(formData);
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
                <div>
                  <label htmlFor="previousSurgeries" className="text-blue-700">Previous Surgeries</label>
                  <textarea
                    id="previousSurgeries"
                    name="previousSurgeries"
                    value={formData.previousSurgeries}
                    onChange={handleChange}
                    placeholder="List any previous surgeries"
                    className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-500 rounded-md p-2"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-600">Health Status</h3>
                <div>
                  <label htmlFor="mobilityIssues" className="text-blue-700">Mobility Issues</label>
                  <textarea
                    id="mobilityIssues"
                    name="mobilityIssues"
                    value={formData.mobilityIssues}
                    onChange={handleChange}
                    placeholder="Describe any mobility challenges or assistance required"
                    className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-500 rounded-md p-2"
                  />
                </div>
                
                <div>
                  <label htmlFor="visionHearingImpairments" className="text-blue-700">Vision/Hearing Impairments</label>
                  <textarea
                    id="visionHearingImpairments"
                    name="visionHearingImpairments"
                    value={formData.visionHearingImpairments}
                    onChange={handleChange}
                    placeholder="Describe any vision or hearing impairments"
                    className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-500 rounded-md p-2"
                  />
                </div>
                <div>
                  <label htmlFor="dietaryRestrictions" className="text-blue-700">Dietary Restrictions</label>
                  <textarea
                    id="dietaryRestrictions"
                    name="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={handleChange}
                    placeholder="List any dietary restrictions"
                    className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-500 rounded-md p-2"
                  />
                </div>
                <div>
                  <label htmlFor="physicalActivityLevel" className="text-blue-700">Physical Activity Level</label>
                  <textarea
                    id="physicalActivityLevel"
                    name="physicalActivityLevel"
                    value={formData.physicalActivityLevel}
                    onChange={handleChange}
                    placeholder="Describe your physical activity level"
                    className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-500 rounded-md p-2"
                  />
                </div>
                <div>
                  <label htmlFor="livingSituation" className="text-blue-700">Living Situation</label>
                  <textarea
                    id="livingSituation"
                    name="livingSituation"
                    value={formData.livingSituation}
                    onChange={handleChange}
                    placeholder="Describe your living situation (alone, with family, etc.)"
                    className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-500 rounded-md p-2"
                  />
                </div>
                <div>
                  <label htmlFor="caregiverSupport" className="text-blue-700">Caregiver Support</label>
                  <textarea
                    id="caregiverSupport"
                    name="caregiverSupport"
                    value={formData.caregiverSupport}
                    onChange={handleChange}
                    placeholder="Describe any caregiver support you have"
                    className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-500 rounded-md p-2"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-600">Emergency Contact</h3>
                <div>
                  <label htmlFor="emergencyContactName" className="text-blue-700">Emergency Contact Name</label>
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
                  <label htmlFor="emergencyContactPhone" className="text-blue-700">Emergency Contact Phone</label>
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
                    type="checkbox"
                    name="consentToShareData"
                    checked={formData.consentToShareData}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  I consent to share my data with healthcare providers for personalized care.
                </label>
                <div>
                  <label htmlFor="preferredContactMethod" className="text-blue-700">Preferred Contact Method</label>
                  <select
                    name="preferredContactMethod"
                    value={formData.preferredContactMethod}
                    onChange={handleChange}
                    className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-500 rounded-md p-2"
                  >
                    <option value="" disabled>Select method</option>
                    <option value="phone">Phone</option>
                    <option value="email">Email</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition duration-300"
              >
                Sign Up
              </button>
            </form>
            <p className="mt-4 text-center">
              Already have an account? <Link to="/login" className="text-blue-600">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}