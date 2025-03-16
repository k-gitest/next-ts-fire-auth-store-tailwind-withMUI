import { useState } from 'react'
import { AuthUser } from 'types/auth'
import { useRouter } from 'next/router'
import AuthForm from 'components/AuthForm'
import { AuthUserContext } from 'components/provider/AuthProvider'
import { SigninSubmit, SignoutSubmit } from 'lib/authsubmit'

const Login = () => {
  const authUser = AuthUserContext()
  const router = useRouter()
  const [error, setError] = useState(null)

  const handleSubmit = async (data: AuthUser) => {
    setError(null)
    const result = await SigninSubmit(data.email, data.password)
    if (result !== undefined && result.success) {
      router.push('/user')
    } else {
      SignoutSubmit()
      setError(result?.error)
    }
  }

  return (
    <div>
      <h1 className="text-center mb-3">ログインページ</h1>
      {error && (<p className="text-center text-red-500 mb-2">{error}</p>)}
      {!authUser && (
        <AuthForm handleSubmit={handleSubmit} />
      )}
      {authUser && (
        (<p className="text-center">ログインしています</p>)
      )}
    </div>
  )
}

export default Login