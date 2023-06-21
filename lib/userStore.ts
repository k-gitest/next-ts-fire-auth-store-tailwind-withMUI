import {collection, addDoc, getDocs, getDoc, setDoc, doc, updateDoc, deleteDoc, serverTimestamp} from "firebase/firestore"
import {db} from 'lib/firebase'
import type {User} from 'types/user'

const createUserProfile = async(user: User, uid: string) => {
  try {
    const userCollection = collection(db, 'users');
    const userDocument = doc(userCollection, uid)
    const newDocRef = await setDoc(userDocument,{
      ...user,
      createdAt: serverTimestamp()
    });
    const data = { newDocRef };
    return true
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error
  }
}

const getUserProfile = async (id: string) => {
  if(id){
    try {
      const userDocumentRef = doc(db, 'users', id);
      const documentSnapshot = await getDoc(userDocumentRef);
      const data = { ...documentSnapshot.data() };
      return data
    } 
    catch (error) {
      console.log(error);
      throw error
    }
  } else {
    try {
      const usersCollectionRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersCollectionRef);
      const data = querySnapshot.forEach((doc) => ({ ...doc.data(), id: doc.id }));
      return data
    } catch (error) {
      console.log(error);
      throw error
    }    
  }
}

const updateUserProfile = async(user: User, id: string) => {
  const userCollectionRef  = collection(db, 'users')
  const userDocumentRef  = doc(userCollectionRef, id);
  const newUserData = {...user, updatedAt: serverTimestamp()};
  try{
    await updateDoc(userDocumentRef, newUserData);
    console.log('成功')
    return true
  }
  catch(err){
    throw err
  } 
}


const deleteUserProfile = async(id: string) => {
  const userDocumentRef = doc(db, 'users', id)
  try{
    await deleteDoc(userDocumentRef);
    console.log('成功')
    return true
  }
  catch(err){
    throw err
  }
}

export { createUserProfile, getUserProfile, updateUserProfile, deleteUserProfile }