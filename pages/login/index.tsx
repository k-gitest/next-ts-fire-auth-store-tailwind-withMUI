import AuthForm from 'components/AuthForm'
import {useState} from 'react'
import {AuthUser} from 'types/auth'
import {useRouter} from 'next/router'
import {AuthUserContext} from 'components/provider/AuthProvider'
import {SigninSubmit, SignoutSubmit} from 'lib/authsubmit'

const Login = () => {
  const authUser = AuthUserContext()
  const defaultState = {email: '', password: ''}
  const [account, setAccount] = useState<AuthUser>(defaultState)
  const router = useRouter()
  const [error, setError] = useState(null)

  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    const result = await SigninSubmit(account.email, account.password)
    if(result !== undefined && result.success){
      router.push('/user')
    } else {
      SignoutSubmit()
      setError(result?.error)
    }
  }
  
  return(
    <div>
      <h1 className="text-center mb-3">ログインページ</h1>
      {error && (<p className="text-center text-red-500 mb-2">{error}</p>)}
      {!authUser && (
        <AuthForm account={account} setAccount={setAccount} handleSubmit={handleSubmit} />
      )}
      {authUser && (
        (<p className="text-center">ログインしています</p>)
      )}
    </div>
  )
}

export default Login