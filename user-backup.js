// user-backup.js
import { db } from './db.js';
import { getAuth } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

export async function downloadUserData() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    alert('Please log in to download your data.');
    return;
  }

  try {
    const resultsRef = collection(db, 'users', user.email, 'results');
    const snapshot = await getDocs(resultsRef);

    const data = [];
    snapshot.forEach(doc => {
      data.push({ id: doc.id, ...doc.data() });
    });

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my_soulprint_backup.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Backup failed:', error);
    alert('Failed to download data. Please try again later.');
  }
}