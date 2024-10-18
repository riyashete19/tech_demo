
function EmergencyRequestButton({ onClick }) {
  return (
    <button 
      className="emergency-button"
      onClick={onClick}
    >
      Request Emergency Assistance
    </button>
  );
}

export default EmergencyRequestButton;