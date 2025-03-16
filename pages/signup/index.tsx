import {useState} from 'react'
import {useRouter} from 'next/router'
import {AuthUser} from 'types/auth'
import {SignupSubmit} from 'lib/authsubmit'
import {AuthUserContext} from 'components/provider/AuthProvider'
import AuthForm from 'components/AuthForm'

const Signup = () => {
  const authUser = AuthUserContext()
  const router = useRouter()
  const [error, setError] = useState('')

  const handleSubmit = async (data: AuthUser) => {
    setError('')
    const result = await SignupSubmit(data.email, data.password)
    if(result && result.success){
      router.push('/user')
    } else {
      setError(result?.error ? result.error : '')
    }
  }

  return (
    <div>
      <h1 className="text-center mb-3">新規登録ページ</h1>
      {error && (<p className="text-center text-red-500">{error}</p>)}
      {!authUser && (
        <AuthForm handleSubmit={handleSubmit} />
      )}
      {authUser && (
        (<>ログインしています</>)
      )}
    </div>
  )
  
}

export default Signup