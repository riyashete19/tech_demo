import { useState, useEffect } from 'react';
import { db, auth } from '../firebase/firebaseConfig';
import { collection, query, where, onSnapshot, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getLocation } from '../services/GeoLocationService';
import avtar from '../pages/images/avtar.jpg';
import { AlertTriangle, MapPin, Clock, User } from 'lucide-react';

const emergencyRequests = [
  { id: 1, patientName: "John Doe", status: "Chest Pain", location: "123 Main St", time: "2 mins ago" },
  { id: 2, patientName: "Jane Smith", status: "Difficulty Breathing", location: "456 Elm St", time: "5 mins ago" },
  { id: 3, patientName: "Mike Johnson", status: "Severe Headache", location: "789 Oak St", time: "10 mins ago" },
];

const Button = ({ children, className, onClick }) => (
  <button
    className={`px-4 py-2 rounded focus:outline-none ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const Card = ({ children, className }) => (
  <div className={`border rounded-lg shadow-md ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-lg font-bold">{children}</h2>
);

const CardDescription = ({ children }) => (
  <p className="text-sm text-gray-500">{children}</p>
);

const CardContent = ({ children }) => (
  <div className="p-4">{children}</div>
);

const Avatar = ({ children }) => (
  <div className="w-10 h-10 rounded-full overflow-hidden">{children}</div>
);

const AvatarImage = ({ src, alt }) => <img src={src} alt={alt} className="w-full h-full object-cover" />;
const Badge = ({ children, variant, className }) => (
  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded ${variant === "outline" ? "border" : ""} ${className}`}>
    {children}
  </span>
);

const ScrollArea = ({ children, className }) => (
  <div className={`overflow-y-auto ${className}`}>
    {children}
  </div>
);

function NurseDashboard() {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);
  const [emergencyRequests, setEmergencyRequests] = useState([]);
  const [error, setError] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

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

  const handleAccept = (requestId) => {
    console.log(`Accepted request ${requestId}`);
    // Here you would update the request status and notify the backend
  };

  const handleReject = (requestId) => {
    console.log(`Rejected request ${requestId}`);
    // Here you would update the request status and notify the backend
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
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-800">Nurse Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-blue-600 border-blue-600">
              On Duty
            </Badge>
            <Avatar>
              <AvatarImage src={avtar} alt="Nurse" />
            </Avatar>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <CardHeader className="bg-red-500 text-white">
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2" />
                Emergency Requests
              </CardTitle>
              <CardDescription className="text-red-100">
                Incoming alerts from patients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                {emergencyRequests.length === 0 ? (
                  <p className="text-center text-gray-500">No pending emergency requests.</p>
                ) : (
                  emergencyRequests.map((request) => (
                    <div
                      key={request.id}
                      className="mb-4 p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedRequest(request)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-red-800">{request.patientName}</h3>
                        <Badge variant="outline" className="text-red-600 border-red-600">
                          {request.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 flex items-center">
                        <MapPin className="mr-1" size={14} /> {request.location}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <Clock className="mr-1" size={14} /> {request.time}
                      </p>
                      <div className="mt-2 flex space-x-2">
                        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white" onClick={() => handleAccept(request.id)}>
                          Accept
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-500 border-red-500 hover:bg-red-50" onClick={() => handleReject(request.id)}>
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card>
              <CardHeader className="bg-blue-500 text-white">
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2" />
                  Live Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-200 h-[200px] flex items-center justify-center rounded-lg">
                  <p className="text-gray-600">Map Integration Placeholder</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-green-500 text-white">
                <CardTitle className="flex items-center">
                  <User className="mr-2" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Nurse: {user.displayName}</p>
                <p className="text-gray-700">Email: {user.email}</p>
                {location && <p className="text-gray-700">Location: {location}</p>}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

const LoginPage = ({ onLogin, setShowSignup }) => (
  <div className="bg-white p-8 rounded-lg shadow-md">
    <h2 className="text-2xl mb-4">Login</h2>
    <form onSubmit={e => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      onLogin(email, password);
    }}>
      <input type="email" name="email" placeholder="Email" required className="border rounded-lg w-full p-2 mb-4" />
      <input type="password" name="password" placeholder="Password" required className="border rounded-lg w-full p-2 mb-4" />
      <Button className="bg-blue-500 text-white">Login</Button>
      <div className="mt-4">
        <p>Don't have an account? <Button onClick={() => setShowSignup(true)} className="text-blue-600">Sign Up</Button></p>
      </div>
    </form>
  </div>
);

const SignupPage = ({ onRegister, setShowSignup }) => (
  <div className="bg-white p-8 rounded-lg shadow-md">
    <h2 className="text-2xl mb-4">Sign Up</h2>
    <form onSubmit={e => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      const name = e.target.name.value;
      onRegister(email, password, name);
    }}>
      <input type="text" name="name" placeholder="Name" required className="border rounded-lg w-full p-2 mb-4" />
      <input type="email" name="email" placeholder="Email" required className="border rounded-lg w-full p-2 mb-4" />
      <input type="password" name="password" placeholder="Password" required className="border rounded-lg w-full p-2 mb-4" />
      <Button className="bg-green-500 text-white">Sign Up</Button>
      <div className="mt-4">
        <p>Already have an account? <Button onClick={() => setShowSignup(false)} className="text-blue-600">Login</Button></p>
      </div>
    </form>
  </div>
);

export default NurseDashboard;
