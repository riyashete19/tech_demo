import { Link } from 'react-router-dom';

function UserTypeSelection() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-8">Are you a patient or a nurse?</h2>
      <div className="flex space-x-4">
        <Link to="/login?type=patient">
          <div className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold rounded-lg transition duration-300">
            I’m a Patient
          </div>
        </Link>
        <Link to="/login?type=nurse">
          <div className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold rounded-lg transition duration-300">
            I’m a Nurse
          </div>
        </Link>
      </div>
    </div>
  );
}

export default UserTypeSelection;
