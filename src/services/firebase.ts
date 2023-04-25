import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

export const useFirestore = (collection: any, condition: any) => {
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    let collectionRef = firestore().collection(collection).orderBy('createdAt');
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        setDocuments([]);
        return;
      }
      collectionRef = collectionRef.where(
        condition.fieldName,
        condition.operator,
        condition.compareValue,
      );
    }

    const unsubscribe = collectionRef.onSnapshot(snapshot => {
      const documents = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocuments(documents);
    });

    return unsubscribe;
  }, [collection, condition]);

  return documents;
};

export const addDocument = (collection: any, data: any) => {
  const query = firestore().collection(collection);
  query.add({
    ...data,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
};

export const generateKeywords = (fullName: string) => {
  const name = fullName.split(' ').filter(word => word);

  const length = name.length;
  let flagArray: any[] = [];
  let result: any[] = [];
  let stringArray: any[] = [];

  for (let i = 0; i < length; i++) {
    flagArray[i] = false;
  }

  const createKeywords = (name: any) => {
    const arrName: any[] = [];
    let curName = '';
    name.split('').forEach((letter: any) => {
      curName += letter;
      arrName.push(curName);
    });
    return arrName;
  };

  function findPermutation(k: any) {
    for (let i = 0; i < length; i++) {
      if (!flagArray[i]) {
        flagArray[i] = true;
        result[k] = name[i];

        if (k === length - 1) {
          stringArray.push(result.join(' '));
        }

        findPermutation(k + 1);
        flagArray[i] = false;
      }
    }
  }

  findPermutation(0);

  const keywords = stringArray.reduce((acc, cur) => {
    const words = createKeywords(cur);
    return [...acc, ...words];
  }, []);

  return keywords;
};
