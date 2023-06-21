import {useRouter} from 'next/router'
import Link from 'next/link'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {AuthUserContext} from 'components/provider/AuthProvider'
import PostList from 'components/Private/PostList'
import UserProfile from 'components/Private/UserProfile'

const User = () => {
  const user = AuthUserContext()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  const handleAccountDelete = async() => {
    if(user){
      try{
        await axios.delete('/api/admin/deleteUser', {params: {uid: user.uid}})
        router.push('/')
      }
      catch(err){
        console.log(err)
      } 
    }
  }
  
  useEffect(() => {
    if (user) {
      const timeout = setTimeout(() => {
        setIsLoading(true);
      }, 500);
      return () => clearTimeout(timeout);
    } 
    if(!user){
      const timeout = setTimeout(() => {
        setIsLoading(true);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [user]);
  
  return(
    <div className="mx-2">
      {!isLoading && (<p>Loading...</p>)}
      {
        isLoading && (
          <>
            <h1>ユーザーページ</h1>
            {!user && (
              <p>ログインしてください</p>
            )}
            {user && (
              <>
                <UserProfile authUser={user} />
                <Link href={user.uid} className="bg-blue-500 hover:bg-blue-800 rounded p-3 block text-center text-white">公開データ</Link>
                <div>
                  <PostList user={user} />
                </div>
                <button className="bg-red-500 hover:bg-red-800 block rounded p-3" onClick={()=>handleAccountDelete()}>アカウント削除</button>
              </>
            )}   
          </>
        )
      } 
    </div>
  )
}

export default User