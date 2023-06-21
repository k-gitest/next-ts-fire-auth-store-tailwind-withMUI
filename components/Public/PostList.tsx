import Link from 'next/link'
import ListCard from 'components/ListCard'
import {useGetList} from 'lib/useGetUserPostList'

type Props = {
  user: string;
}

const PostList = (props: Props) => {
  const {isLoading, isError, postList, setPostList} = useGetList(props.user)

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
            <Link href={`${item.uid}/${item.pid}`}>
              <ListCard list={item} />
            </Link>
          </div>
        ))
      )}
      {postList && postList.length === 0 && (
        <p>記事がありません</p>
      )}
    </div>
  )
}

export default PostList