import { db } from '../firebase/firebaseConfig';

export const listenForEmergencyRequests = (callback) => {
  const unsubscribe = db.collection('emergencyRequests')
    .where('status', '==', 'pending')
    .onSnapshot((snapshot) => {
      const requests = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(requests);
    });

  return unsubscribe;
};