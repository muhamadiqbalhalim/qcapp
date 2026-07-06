// Guna URL CDN Firebase (Versi Modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";
// Tambah browserLocalPersistence dan setPersistence di sini
import { getAuth, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: 'AIzaSyCno2NNkzt3gLdC4CfZ4TlhwESQJgI_IXk',
    authDomain: 'test-login2-e4c7f.firebaseapp.com',
    projectId: 'test-login2-e4c7f',
    storageBucket: 'test-login2-e4c7f.firebasestorage.app',
    messagingSenderId: '698181085162',
    appId: '1:698181085162:web:3b91954eb1779a05894cd2',
};

// Initialize
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// TAMBAH: Tetapkan persistence kepada LOCAL supaya sesi kekal
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // Persistence berjaya ditetapkan
    console.log("Firebase Auth persistence set to LOCAL");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

// Export
export const db = getFirestore(app);
export const storage = getStorage(app);
export { auth }; // Tukar cara export auth jika perlu

export default app;