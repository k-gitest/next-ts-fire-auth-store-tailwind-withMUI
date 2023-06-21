import Link from 'next/link'
import Image from 'next/image'
import {AuthUserContext} from 'components/provider/AuthProvider'
import {SignoutSubmit} from 'lib/authsubmit'
import {useRouter} from 'next/router'
import type { User } from "firebase/auth";
import {useState,useEffect} from 'react'

const Header = () => {
  const user = AuthUserContext()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    try{
      await SignoutSubmit()
      router.push('/')
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    const timeout = setTimeout(() => {
      setIsLoading(true);
    }, 500);
    return () => clearTimeout(timeout);
  },[user])
  
  return (
    <div className="flex p-3">
      <h1>
        <Link href={"/"}>
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/next.svg"
            alt="ロゴマーク"
            width={180}
            height={37}
            priority
          />
        </Link>
      </h1>
      <ul className="block w-full flex justify-end">
        {!isLoading && (<p>Loading...</p>)}
        {isLoading && (
          <>
          {user && (
            <>
              <li>
                <Link className="block bg-white border rounded p-2 mr-1" href={"/user"}>マイページ</Link>
              </li>
              <li>
                <button className="bg-white border rounded p-2" onClick={handleSignOut} >ログアウト</button>
              </li>
            </>
          )}
          {!user && (
            <>
            <li className="bg-blue-500 hover:bg-blue-800 rounded text-white mr-2 p-2">
              <Link href={"/signup"}>サインアップ</Link>
            </li>
            <li className="bg-red-500 hover:bg-red-800 rounded text-white p-2">
              <Link href={"/login"}>ログイン</Link>
            </li>
            </>
          )}
          </>
        )}
        
      </ul>
    </div>
  )
}

export default Header