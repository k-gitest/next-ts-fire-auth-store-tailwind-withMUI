import Link from 'next/link'
import { useRouter } from "next/router";
import {useGetPost} from 'lib/useGetUserPostList'

const Page = () => {
  const router = useRouter();
  const {uid, pid} = router.query
  const {isLoading, isError, isArticle, setIsArticle} = useGetPost(String(uid), String(pid))
  
  return (
    <div>
    {isLoading && (
      <p>Loading...</p>
    )}
    {isError && (
      <p>エラーです。</p>
    )}
    {!isLoading && (
      <div>
        個別ページ<br />
        <p>{isArticle?.title}</p>
        <p>{isArticle?.category}</p>
        <p>{isArticle?.article}</p>
        <Link href={`/${uid}`}>ユーザーページへ</Link>
      </div>
    )}
    </div>
  )
}

export default Page