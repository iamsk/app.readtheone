import { useQuery } from '@tanstack/react-query'
import { axios } from 'src/lib/axios'
import { ExtractFnReturnType, QueryConfig } from 'src/lib/react-query'
import { Article } from 'src/types'

const getAIArticles = async (source: string, userTopics: string[]): Promise<Article[]> => {
  return axios.get('/feeds', {
    params: {
      source: source,
      tags: userTopics.join(','),
      limit: 50,
    },
  })
}

type QueryFnType = typeof getAIArticles

type UseGetArticlesOptions = {
  source: string
  userTopics: string[]
  config?: QueryConfig<QueryFnType>
}

export const useGetAIArticles = ({ source, userTopics, config }: UseGetArticlesOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [source, userTopics.join(',')],
    queryFn: () => getAIArticles(source, userTopics),
  })
}
