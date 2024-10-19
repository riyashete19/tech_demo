"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Heart, Activity, User, Plus, X, Bell } from "lucide-react"
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig"; // Import the initialized Firestore instance

export default function PatientDashboard() {
  const [patientData, setPatientData] = useState(null); // Hold patient data
  const [alertSent, setAlertSent] = useState(false)
  const [medicines, setMedicines] = useState([])
  const [newMedicine, setNewMedicine] = useState({ name: "", time: "" })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Fetch patient data from Firestore
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const docRef = doc(db, "patients", "patientId123"); // Replace with actual patient ID
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPatientData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
  }, []);

  const handleEmergencyAlert = () => {
    setAlertSent(true)
    setTimeout(() => setAlertSent(false), 5000)
  }

  const handleAddMedicine = () => {
    if (newMedicine.name && newMedicine.time) {
      setMedicines([...medicines, newMedicine])
      setNewMedicine({ name: "", time: "" })
      setIsDialogOpen(false)
    }
  }

  const handleRemoveMedicine = (index) => {
    const updatedMedicines = medicines.filter((_, i) => i !== index)
    setMedicines(updatedMedicines)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const currentTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
      
      medicines.forEach(medicine => {
        if (medicine.time === currentTime) {
          alert(`It's time to take ${medicine.name}`);
        }
      })
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [medicines])

  if (!patientData) {
    return <div>Loading patient data...</div>;
  }

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-blue-800">Patient Dashboard</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Patient Info Card */}
          <div className="md:col-span-2 border border-gray-300 rounded-lg bg-white shadow-lg">
            <div className="bg-blue-500 text-white p-4">
              <h2 className="text-xl font-bold">Patient Information</h2>
            </div>
            <div className="p-4">
              <div className="flex items-center mb-4">
                <div className="h-20 w-20 mr-4 bg-gray-300 rounded-full flex items-center justify-center text-2xl text-white">
                  {patientData.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-800">{patientData.name}</h3>
                  <p className="text-blue-600">DOB: {patientData.dob} | Gender: {patientData.gender}</p>
                  <div className="mt-1 inline-block bg-gray-200 text-blue-800 px-2 py-1 rounded-full">Blood Group: {patientData.bloodGroup}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Medical History</h4>
                  <ul className="list-disc list-inside text-blue-700">
                    {patientData.medicalHistory.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Current Medications</h4>
                  <ul className="list-disc list-inside text-blue-700">
                    {patientData.currentMedications.map((med, index) => (
                      <li key={index}>{med}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Alert Card */}
          <div className="border border-gray-300 rounded-lg bg-white shadow-lg">
            <div className="bg-red-500 text-white p-4">
              <h2 className="text-xl font-bold flex items-center">
                <AlertTriangle className="mr-2" />
                Emergency Alert
              </h2>
            </div>
            <div className="p-4">
              <p className="mb-4 text-gray-600">Press the button below in case of a medical emergency to alert the nearest nurse.</p>
              <button
                className={`w-full text-white py-2 rounded-lg ${alertSent ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"}`}
                onClick={handleEmergencyAlert}
                disabled={alertSent}
              >
                {alertSent ? "Alert Sent!" : "Send Emergency Alert"}
              </button>
            </div>
          </div> {/* Closing Emergency Alert Card */}

          {/* Current Health Status */}
          <div className="border border-gray-300 rounded-lg bg-white shadow-lg">
            <div className="bg-green-500 text-white p-4">
              <h2 className="text-xl font-bold flex items-center">
                <Activity className="mr-2" />
                Current Health Status
              </h2>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Heart Rate:</span>
                  <span className="font-semibold">{patientData.vitalSigns.heartRate} bpm</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Blood Pressure:</span>
                  <span className="font-semibold">{patientData.vitalSigns.bloodPressure} mmHg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Temperature:</span>
                  <span className="font-semibold">{patientData.vitalSigns.temperature}</span>
                </div>
              </div>
            </div>
          </div> {/* Closing Current Health Status Card */}

          {/* Emergency Contact */}
          <div className="border border-gray-300 rounded-lg bg-white shadow-lg">
            <div className="bg-purple-500 text-white p-4">
              <h2 className="text-xl font-bold flex items-center">
                <User className="mr-2" />
                Emergency Contact
              </h2>
            </div>
            <div className="p-4">
              <p><strong className="text-purple-700">Name:</strong> {patientData.emergencyContact.name}</p>
              <p><strong className="text-purple-700">Relationship:</strong> {patientData.emergencyContact.relationship}</p>
              <p><strong className="text-purple-700">Phone:</strong> {patientData.emergencyContact.phone}</p>
            </div>
          </div> {/* Closing Emergency Contact Card */}

          {/* Medicine Reminders */}
          <div className="md:col-span-2 border border-gray-300 rounded-lg bg-white shadow-lg">
            <div className="bg-yellow-500 text-white p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center">
                <Bell className="mr-2" />
                Medicine Reminders
              </h2>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full flex items-center"
                onClick={() => setIsDialogOpen(true)}
              >
                <Plus className="mr-2" /> Add Medicine
              </button>
            </div>
            <div className="p-4">
              {medicines.length > 0 ? (
                <ul className="list-disc list-inside text-blue-700">
                  {medicines.map((medicine, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span>{medicine.name} at {medicine.time}</span>
                      <button onClick={() => handleRemoveMedicine(index)} className="text-red-500">Remove</button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No medicines added yet.</p>
              )}
            </div>
          </div>

        </div> {/* Closing main grid */}
      </div>

      {/* Modal for Adding Medicine */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Add Medicine</h3>
            <input
              type="text"
              placeholder="Medicine Name"
              value={newMedicine.name}
              onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
              className="border border-gray-300 rounded-md p-2 w-full mb-4"
            />
            <input
              type="time"
              value={newMedicine.time}
              onChange={(e) => setNewMedicine({ ...newMedicine, time: e.target.value })}
              className="border border-gray-300 rounded-md p-2 w-full mb-4"
            />
            <div className="flex justify-end mt-4">
              <button onClick={() => setIsDialogOpen(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2">Cancel</button>
              <button onClick={handleAddMedicine} className="bg-blue-500 text-white px-4 py-2 rounded-md">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
