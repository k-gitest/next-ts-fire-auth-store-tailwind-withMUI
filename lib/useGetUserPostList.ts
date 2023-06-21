import useSWR from 'swr'
import { getListPostArticles, getSinglePostArticle } from 'lib/postStore'
import {Post} from 'types/post'

async function articleFetcher([url, uid, pid]: string[]){
  return await getSinglePostArticle(pid, uid)
}

async function postFetcher(url: string, {arg}: {arg: [string, string] | undefined}) {
  const pid = arg ? arg[1] : '';
  const uid = arg ? arg[0] : '';
  return await getSinglePostArticle(pid, uid)
}

async function fetcher ([url, uid]:[url:string, uid:string]) {
  return await getListPostArticles(uid)
}

const useGetList = (uid: string) => {
  const { data, error, mutate } = useSWR(['/api/admin/post', uid], fetcher)
  const isLoading = !data && !error;
  const isError = error;
  const postList: Post[] = data || [];
  const setPostList = mutate;
  return {isLoading, isError, postList, setPostList}
}

const useGetPost = (uid: string, pid: string) => {
  const { data, error, mutate } = useSWR(['/api/admin/post', uid, pid], articleFetcher)
  const isLoading = !data && !error;
  const isError = error;
  const isArticle: Post | null = data || null;
  const setIsArticle = mutate;
  return {isLoading, isError, isArticle, setIsArticle}
}

export { useGetList, useGetPost, postFetcher }