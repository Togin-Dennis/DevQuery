// Firebase/Read.js
import { collection, getDocs, query, where, limit as limitFn } from 'firebase/firestore';
import { db } from './Firebase';

/**
 * Fetch documents from a Firestore collection with optional conditions and limit.
 * @param {string} dbname - Firestore collection name.
 * @param {Array} conditions - Optional array of [field, operator, value] for filtering.
 * @param {number} limitCount - Optional maximum number of documents to fetch.
 */
const fetchfirebasedb = async (dbname, conditions = [], limitCount = null) => {
  try {
    const colRef = collection(db, dbname);

    const constraints = conditions.map(([f, op, v]) => where(f, op, v));
    if (limitCount) {
      constraints.push(limitFn(limitCount));
    }

    const q = constraints.length ? query(colRef, ...constraints) : colRef;
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Firestore fetch error:", error);
    return [];
  }
};

export default fetchfirebasedb;
