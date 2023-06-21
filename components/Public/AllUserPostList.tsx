import Link from 'next/link'
import {useGetAllPost} from 'lib/useGetAllPostList'
import ListCard from 'components/ListCard'

const AllUserPostList = () => {
  const {isLoading, isError, allPostList, setAllPostList} = useGetAllPost()
  return (
    <div>
      {isLoading && (
        <p>Loading...</p>
      )}
      {isError && (
        <p>エラーです。</p>
      )}
      {allPostList && allPostList.length > 0 && (
        allPostList.map(item => (
          <div key={item.pid} className="mb-2">
            <Link href={`${item.uid}/${item.pid}`}>
              <ListCard list={item} />
            </Link>
          </div>
        ))
      )}
      {allPostList && allPostList.length === 0 && (
        <p>記事がありません</p>
      )}
    </div>
  )
}

export default AllUserPostList