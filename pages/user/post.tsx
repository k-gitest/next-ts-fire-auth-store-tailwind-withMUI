import {useState} from 'react'
import { useRouter } from "next/navigation"
import axios from 'axios'
import type {Post} from 'types/post'
import PostForm from 'components/Private/PostForm'
import {AuthUserContext} from 'components/provider/AuthProvider'
import {createPostArticle} from 'lib/postStore'

const CreatePost = () => {
  const authUser = AuthUserContext()
  const router = useRouter()
  
  const defaultPostData = {
    title: '',
    release: '公開',
    category: '',
    article: '',
  }
  const [post, setPost] = useState<Post>(defaultPostData)
  const [error, setError] = useState('')

  const handleRegister = async (data: Post) => {
    const uid = authUser ? authUser.uid : "";
    const result = await createPostArticle(data, uid)
    if(result){
      setPost(defaultPostData);
      router.push('/user');
    }
  }
        
  return(
    <div>
      <h1>投稿</h1>
      {authUser && (
        <>
          <p>記事作成</p>
          {error && (<span className="text-red-500">{error}</span>)}
          <PostForm post={post} onRegister={handleRegister} />
        </>
      )}
      {!authUser && (
        <>
          <p>ログインしてください</p>
        </>
      )}
      <div>
        <button className="border p-3 rounded" onClick={()=>router.back()}>戻る</button >
      </div>
    </div>
  )
}

export default CreatePost