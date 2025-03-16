import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation"
import type { User } from 'types/user'
import useSWR from 'swr'
import UserForm from 'components/Private/UserForm'
import { AuthUserContext } from 'components/provider/AuthProvider'
import { createUserProfile, getUserProfile } from 'lib/userStore'

async function profileFetcher([url, id]: string[]) {
  return await getUserProfile(id)
}

export const useGetUser = (uid: string | undefined) => {
  const { data, error, mutate } = useSWR(['/api/admin/user', uid], profileFetcher)
  const isLoading = !data && !error;
  const isError = error;
  const userProfile: User | null = data ? (data as User) : null;
  const setUserProfile = mutate;
  return { isLoading, isError, userProfile, setUserProfile }
}

const Profile = () => {
  const authUser = AuthUserContext()
  const router = useRouter()
  const { isLoading, isError, userProfile, setUserProfile } = useGetUser(authUser?.uid);

  const defaultUserData = {
    name: '',
    address: '',
    email: '',
    gender: '男性',
    hobby: [],
    selectValue: '',
    comment: '',
    admin: false,
    age: 18,
  }

  const handleSubmit = async (data: User) => {
    try {
      const uid = authUser ? authUser.uid : "";
      const result = await createUserProfile(data, uid)
      if (result) {
        router.push('/user')
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h1>プロフィール</h1>
      {authUser && (
        <>
          <p>あなたのプロフィール</p>
          {isLoading && (
            <p>Loading...</p>
          )}
          {userProfile && (
            <UserForm user={userProfile} onRegister={handleSubmit} />
          )}
          {!userProfile && (
            <p>プロフィールが見つかりませんでした。</p>
          )}
        </>
      )}
      {!authUser && (
        <>
          <p>ログインしてください</p>
        </>
      )}
      <div>
        <button className="border p-3 rounded" onClick={() => router.back()}>戻る</button >
      </div>
    </div>
  )
}

export default Profile