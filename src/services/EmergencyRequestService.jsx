import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const sendEmergencyRequest = async (location) => {
  try {
    await addDoc(collection(db, 'emergencyRequests'), {
      location,
      status: 'pending',
      timestamp: serverTimestamp()
    });
    alert('Emergency request sent successfully!');
  } catch (error) {
    console.error('Error sending emergency request:', error);
    alert('Failed to send emergency request. Please try again.');
  }
};