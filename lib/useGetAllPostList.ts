import useSWR from 'swr'
import {getListPostArticles} from 'lib/postStore'
import {Post} from 'types/post'

const clientFetcher = async() => {
  const uid = ''
  return await getListPostArticles(uid)
}

const useGetAllPost = () => {
  const {data, error, mutate} = useSWR('/api/post', clientFetcher)
  console.log(data)
  const isLoading = !data && !error;
  const isError = error;
  const allPostList: Post[] | null = Array.isArray(data) ? data : data ? [data] : null;
  const setAllPostList = mutate;
  return {isLoading, isError, allPostList, setAllPostList}
}

export {useGetAllPost}