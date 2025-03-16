import {useState, useEffect} from 'react'
import Link from 'next/link'
import { useRouter, usePathname , useSearchParams } from "next/navigation"
import type { User } from "firebase/auth";
import {Post} from 'types/post'
import useSWRMutation from "swr/mutation";
import Modal from 'components/Modal'
import PostForm from 'components/Private/PostForm'
import ListCard from 'components/ListCard'
import { updatePostArticle, deletePostArticle } from 'lib/postStore'
import {useGetList, postFetcher} from 'lib/useGetUserPostList'

type Props = {
  user: User;
}

const defaultPostData = {
  title: '',
  release: '公開',
  category: '',
  article: '',
}                                     

const PostList = (props: Props) => {
  const pathName = usePathname()
  const {isLoading, isError, postList, setPostList} = useGetList(props.user.uid)
  const { data, trigger, isMutating } = useSWRMutation('/api/admin/post', postFetcher)
  const [isModal, setModal] = useState(false);
  const modalFlag = () => {setModal(true);}

  const handleEdit = async(postData: Post) => {
    try{
      await updatePostArticle({ ...data, ...postData })
      setPostList()
      setModal(false)
    }
    catch(err){
      console.log(err)
    }
  }
  const handleDelete = async(id: string | undefined) => {
    try{
      await deletePostArticle(id ?? '', props.user.uid)
      setPostList()
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div>
      <h2>投稿一覧</h2>
      {isLoading && (
        <p>Loading...</p>
      )}
      {isError && (
        <p>エラーです。</p>
      )}
      {postList && postList.length > 0 && (
        postList.map(item => (
          <div key={item.pid} className="mb-2">
            <ListCard list={item}>
              <button onClick={()=>{trigger([props.user.uid ?? '', item.pid ?? '']); modalFlag();}} className="bg-lime-500 hover:bg-lime-800 mr-2 p-3 rounded" >更新</button>
              <button onClick={()=>handleDelete(item.pid)} className="bg-red-500 hover:bg-red-800 p-3 rounded" >削除</button>
            </ListCard>
          </div>
        ))
      )}
      {postList && postList.length === 0 && (
        <p>記事がありません</p>
      )}
      <Modal showModal={isModal} setModal={setModal}>
        {isMutating && (
          <p>Loading...</p>
        )}
        {!isMutating && !data && (
          <p>データがありません。</p>
        )}
        {!isMutating && data && (
          <PostForm post={data} onRegister={handleEdit} />
        )}
      </Modal>
      <div>
        <Link href={`${pathName}/post`} className="block bg-blue-500 p-3 hover:bg-blue-800 rounded text-center text-white">
          記事を投稿する
        </Link>
      </div>
    </div>
  )
}

export default PostList