import {createContext, useState, useContext, useEffect} from 'react'
import type { User } from "firebase/auth";
import { auth } from 'lib/firebase'

const AuthContext = createContext<User | null>(null)

const AuthUserContext = () => {
  const user = useContext(AuthContext);
  return user ? user : null
}

const AuthProvider = ({children}: {children: React.ReactNode}) => {

  const [authUser, setAuthUser] = useState<User | null>(null)
  
  useEffect(() => {
    const authCheck = () => {
      auth.onAuthStateChanged((user) => {
        if(user){
          setAuthUser(user)
        } else {
          setAuthUser(null);
        }
      })
    }
    authCheck()
  },[])
  
  return(
    <AuthContext.Provider value={authUser}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthUserContext }