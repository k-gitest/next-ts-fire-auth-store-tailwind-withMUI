import { collection, getDocs, getDoc, setDoc, doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore"
import { db } from 'lib/firebase'
import type { Post } from 'types/post'

const createPostArticle = async (post: Post, uid: string) => {
  if (!post.title || !post.release) {
    return false;
  }
  try {
    const collectionRef = collection(db, 'posts');
    const documentRef = doc(collectionRef, uid);
    const subCollectionRef = collection(documentRef, 'post');
    const docRef = doc(subCollectionRef);
    const pid = docRef.id;
    await setDoc(docRef, { ...post, uid: uid, pid, createdAt: serverTimestamp() });
    return true
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error
  }
}

async function getSinglePostArticle(pid: string, uid: string): Promise<Post> {
  try {
    const subDocumentRef = doc(db, 'posts', uid, 'post', pid);
    const documentSnapshot = await getDoc(subDocumentRef);
    const data = documentSnapshot.data() as Post;
    return data
  } catch (error) {
    throw error;
  }
}

async function getPostsByUser(uid: string): Promise<Post[]> {
  try {
    const subDocumentRef = collection(db, 'posts', uid, 'post')
    const querySnapshot = await getDocs(subDocumentRef);
    const data = querySnapshot.docs.map((doc) => ({ ...doc.data() } as Post));
    return data
  }
  catch (err) {
    console.log(err)
    throw err
  }
}

async function getAllPosts(): Promise<Post[]> {
  try {
    const snapshot = await getDocs(collection(db, 'posts'));
    const promises = snapshot.docs.map(async (collec) => {
      const postSnapshot = await getDocs(collection(db, 'posts', collec.id, 'post'));
      return postSnapshot.docs.map((post) => post.data() as Post);
    });
    const results = await Promise.all(promises);
    return results.flat();
  }
  catch (err) {
    console.log(err)
    throw err
  }
}

async function getListPostArticles(uid: string): Promise<Post[]> {
  if (uid) {
    return getPostsByUser(uid);
  } else {
    return getAllPosts();
  }
}

const updatePostArticle = async (post: Post) => {
  if (!post.uid || !post.pid) {
    return false;
  }
  const subDocumentRef = doc(db, 'posts', post.uid, 'post', post.pid)
  try {
    await updateDoc(subDocumentRef, { ...post, updatedAt: serverTimestamp() });
    console.log('成功')
    return true
  }
  catch (err) {
    console.log(err)
    throw err
  }
}

const deletePostArticle = async (id: string, uid: string) => {
  if (uid === undefined || id === undefined) {
    return false;
  }
  const subDocumentRef = doc(db, 'posts', uid, 'post', id);
  try {
    await deleteDoc(subDocumentRef);
    console.log('成功');
    return true
  } catch (err) {
    console.log(err);
    throw err
  }

}

export { createPostArticle, getSinglePostArticle, getListPostArticles, updatePostArticle, deletePostArticle }