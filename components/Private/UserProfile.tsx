import Link from 'next/link'
import { useRouter, usePathname , useSearchParams } from "next/navigation"
import useSWR from 'swr'
import type { User } from "firebase/auth";
import {getUserProfile} from 'lib/userStore'

type Props = {
  authUser: User;
}

async function profileFetcher([url, id]: string[]){
  return await getUserProfile(id)
}

const Profile = (props: Props) => {
  const pathName = usePathname()
  
  const { data, error, mutate } = useSWR(['/api/admin/user', props.authUser.uid], profileFetcher)
  const isLoading = !data && !error

  return (
    <>
    {isLoading && (
      <p>Loading...</p>
    )}
    {error && (
      <p>エラーです。</p>
    )}
    {data && (
      <div className="mb-2">
      <h2>あなたのプロフィール</h2>
      <div>
        <p className="border-b mb-2">名前：{data.name}</p>
        <p className="border-b mb-2">住所：{data.address}</p>
        <p className="border-b mb-2">メール：{data.email}</p>
        <p className="border-b mb-2">性別：{data.gender}</p>
        <p className="border-b mb-2">年齢：{data.age}</p>
        {data.hobby && data.hobby.length > 0 && (
          <p className="border-b mb-2">趣味：{data.hobby.map((item: string) => <span key={item}>{item} </span>)}</p>
        )}
        <p className="border-b mb-2">選択：{data.selectValue}</p>
        <p className="border-b mb-2">コメント：{data.comment}</p>
      </div>
      <div className="mb-2">
        <Link href={`${pathName}/profile`} className="block bg-blue-500 p-3 hover:bg-blue-800 rounded text-center text-white">
          プロフィールを更新する
        </Link>
      </div>
    </div>
    )}
  </>
  )
}

export default Profile