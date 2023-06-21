import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from 'lib/firebase'
import axios from 'axios'
import { User } from 'firebase/auth';

const SignupSubmit = (id: string, pass: string): Promise<{ success: boolean; user?: User; error?: string }> => {
  return createUserWithEmailAndPassword(auth, id, pass)
  .then((userCredential) => {
    const user = userCredential.user;
    return {success: true, user}
  })
  .catch((err) => {
    return {success: false, error: '登録できませんでした'}
  });
}

const SigninSubmit = async (id: string, pass: string) => {
  return signInWithEmailAndPassword(auth, id, pass)
  .then( async (userCredential) => {
    const user = userCredential.user;
    const token = await user.getIdToken();
    try{
      const response = await axios.post('/api/jwtToken',null , {headers: {'authorization': `Bearer ${token}`}})
      if(response.status === 200){
        return { success: true, user };
      }
    }
    catch(err){
      if(axios.isAxiosError(err)){
        return { success: false, error: err?.response?.data?.error || 'エラーが発生しました' };
      }
    }
  })
  .catch((error) => {
    return { success: false, error: 'emailもしくはpasswordが不正です' }
  });
}

const SignoutSubmit = () => {
  return signOut(auth)
  .then((res) => {
    return res
  })
  .catch((error) => {
    return error
  });
}

const authStateChanged = () => {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      resolve(user);
      unsubscribe();
    });
  });
};

export { SignupSubmit, SigninSubmit, SignoutSubmit, authStateChanged }