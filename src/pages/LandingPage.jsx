import { Link } from 'react-router-dom';

const Card = ({ children }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {children}
    </div>
  );
};

const CardHeader = ({ children }) => {
  return <div className="mb-4">{children}</div>;
};

const CardTitle = ({ children }) => {
  return <h3 className="text-xl font-bold">{children}</h3>;
};

const CardDescription = ({ children }) => {
  return <p className="text-gray-500">{children}</p>;
};

const CardContent = ({ children }) => {
  return <div className="mt-4">{children}</div>;
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">SeniorCare Alert</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="#about" className="text-blue-600 hover:text-blue-800">About</Link></li>
              <li><Link to="#features" className="text-blue-600 hover:text-blue-800">Features</Link></li>
              <li><Link to="#contact" className="text-blue-600 hover:text-blue-800">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-blue-800">
            Senior Citizen Help Alert
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto">
            Immediate support for seniors, connecting them with the nearest available nurse in case of emergency.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>For Patients</CardTitle>
              <CardDescription>Get immediate help when you need it most</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>One-click emergency alert</li>
                <li>Automatic location tracking</li>
                <li>Quick connection to nearest available nurse</li>
                <li>24/7 support</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>For Nurses</CardTitle>
              <CardDescription>Efficiently respond to patients in need</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Real-time notifications of nearby emergencies</li>
                <li>Geolocation-based assignment</li>
                <li>Efficient route planning</li>
                <li>Seamless communication with patients</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="text-center mb-16">
          <h3 className="text-3xl font-bold mb-4 text-blue-800">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Patient Calls for Help</h4>
              <p>Patient activates the alert from their device</p>
            </div>
            <div>
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">System Locates Nearest Nurse</h4>
              <p>Our system identifies the closest available nurse</p>
            </div>
            <div>
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Nurse Responds</h4>
              <p>The assigned nurse quickly reaches the patient</p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h3 className="text-3xl font-bold mb-4 text-blue-800">Ready to Get Started?</h3>
          <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
            Join our network of care and experience peace of mind for you or your loved ones.
          </p>
          <Link to="/select-user-type" className="px-6 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300">
            Get Started
          </Link>
        </section>

      </main>

      <footer className="bg-blue-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 SeniorCare Alert. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
