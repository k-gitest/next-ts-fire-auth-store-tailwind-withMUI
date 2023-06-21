import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import {AuthUserContext} from 'components/provider/AuthProvider'
import PostList from 'components/Public/PostList'

const User = () => {
  const user = AuthUserContext()
  const router = useRouter()
  const {uid} = router.query
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (uid) {
      const timeout = setTimeout(() => {
        setIsLoading(true);
      }, 500);
      return () => clearTimeout(timeout);
    } 
    if(!uid){
      const timeout = setTimeout(() => {
        setIsLoading(true);
        router.push('/')
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [uid]);
  
  return(
    <div className="mx-2">
      {!isLoading && (<p>Loading...</p>)}
      {
        isLoading && (
          <>
            <h1>ユーザーページ</h1>
            {uid && (
              <>
                <div>
                  <PostList user={Array.isArray(uid) ? uid[0] : uid} />
                </div>
              </>
            )}   
          </>
        )
      } 
    </div>
  )
}

export default User