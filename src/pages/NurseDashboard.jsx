import { useState, useEffect } from 'react';
import { db, auth } from '../firebase/firebaseConfig';
import { collection, query, where, onSnapshot, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getLocation } from '../services/GeoLocationService';
import LoginPage from './login';  // Import your Login component
import SignupPage from './nurse_signup';  // Import your Signup component

function NurseDashboard() {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);
  const [emergencyRequests, setEmergencyRequests] = useState([]);
  const [error, setError] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      if (user) {
        fetchEmergencyRequests();
        fetchLocation();
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchLocation = async () => {
    try {
      const userLocation = await getLocation();
      setLocation(userLocation);
    } catch (err) {
      setError('Failed to get location: ' + err.message);
    }
  };

  const fetchEmergencyRequests = () => {
    const q = query(collection(db, 'emergencyRequests'), where('status', '==', 'pending'));
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const requests = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEmergencyRequests(requests);
      },
      (err) => {
        setError('Failed to fetch emergency requests: ' + err.message);
      }
    );

    return unsubscribe;
  };

  const handleRegister = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(db, 'nurses'), {
        uid: userCredential.user.uid,
        name: name,
        email: email
      });
      setError(null);
    } catch (err) {
      setError('Failed to register: ' + err.message);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(auth, email, password);
      setError(null);
    } catch (err) {
      setError('Failed to login: ' + err.message);
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        {showSignup ? (
          <SignupPage onRegister={handleRegister} setShowSignup={setShowSignup} />
        ) : (
          <LoginPage onLogin={handleLogin} setShowSignup={setShowSignup} />
        )}
      </div>
    );
  }

  return (
    <div className="nurse-dashboard min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Nurse Dashboard</h2>
        <p className="text-center text-lg mb-4">
          Welcome, <span className="font-semibold text-blue-600">{user.email}</span>
        </p>
        <p className="text-center text-gray-700 mb-6">
          Your current location: {location ? (
            <span className="text-green-500">{location.latitude}, {location.longitude}</span>
          ) : (
            'Loading...'
          )}
        </p>

        <h3 className="text-xl font-semibold mb-4">Emergency Requests:</h3>
        {emergencyRequests.length === 0 ? (
          <p className="text-center text-gray-500">No pending emergency requests.</p>
        ) : (
          <ul className="space-y-4">
            {emergencyRequests.map((request) => (
              <li key={request.id} className="p-4 bg-blue-100 rounded-lg shadow-sm flex justify-between items-center">
                <span className="text-gray-700">
                  Patient at <span className="font-semibold">{request.location.latitude}, {request.location.longitude}</span>
                </span>
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                  onClick={() => alert('Accepting request...')}
                >
                  Accept
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default NurseDashboard;
