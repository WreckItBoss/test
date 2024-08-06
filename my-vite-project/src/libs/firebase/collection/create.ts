import { collection, doc, serverTimestamp, setDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../app';

type Props<T extends { email: string }> = {
  inputData: Omit<T, 'id' | 'createdAt'> & { id?: string };
  path: string;
  parseT: (value: { [key: string]: unknown }) => T;
};

export const create = async <T extends { email: string }>({
  inputData,
  path,
  parseT,
}: Props<T>): Promise<T> => {
  const collectionRef = collection(db, path);

  // Check if the email already exists
  const emailQuery = query(collectionRef, where('email', '==', inputData.email));
  const querySnapshot = await getDocs(emailQuery);

  if (!querySnapshot.empty) {
    throw new Error('Email already exists');
  }

  const { id = doc(collectionRef).id, ...data } = {
    ...inputData,
    createdAt: serverTimestamp(),
  };

  const createdObject: T = parseT({
    id,
    ...inputData,
  });

  await setDoc(doc(collectionRef, id), data);

  return createdObject;
};
