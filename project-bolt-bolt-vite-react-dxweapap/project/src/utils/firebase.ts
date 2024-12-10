import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDZ_5wB8rVoT5nHl-qGEBgkJ8sCaXpQ7vM",
  authDomain: "receipt-manager-bolt.firebaseapp.com",
  projectId: "receipt-manager-bolt",
  storageBucket: "receipt-manager-bolt.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456ghi789jkl"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);