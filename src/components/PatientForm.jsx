import { useState } from "react";

function PatientForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log("Patient data:", { name, age, medicalHistory });
    alert("Patient information submitted!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
        required
      />
      <textarea
        value={medicalHistory}
        onChange={(e) => setMedicalHistory(e.target.value)}
        placeholder="Medical History"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default PatientForm;
