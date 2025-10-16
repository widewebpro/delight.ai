import { useRuntimeConfig } from '#app'
import type { GraphQLResponse, GraphQLQueryOptions } from '~/types/graphql'

export function useGraphQL() {
  const config = useRuntimeConfig()

  const query = async <T = any>(
    query: string, 
    variables: Record<string, any> = {}, 
    options: GraphQLQueryOptions = {}
  ): Promise<T> => {
    try {
      if (!config.public.CRAFT_URL) {
        throw new Error('CRAFT_URL is not configured')
      }

      let apiUrl = `${config.public.CRAFT_URL}/api`

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

      // Add auth header if private flag is true and token is available
      if (options.private && config.public.GRAPHQL_TOKEN) {
        headers['Authorization'] = `Bearer ${config.public.GRAPHQL_TOKEN}`
      }

      // Add preview token if available
      if (options.previewToken) {
        headers['X-Craft-Token'] = options.previewToken
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query,
          variables
        }),
        credentials: 'include'
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
      }

      const result: GraphQLResponse<T> = await response.json()

      if (!result || typeof result !== 'object') {
        throw new Error('Invalid response format')
      }

      if (result.errors) {
        throw new Error(result.errors[0]?.message || 'GraphQL error')
      }

      return JSON.parse(JSON.stringify(result.data)) as T
    } catch (err) {
      console.error('GraphQL Error:', {
        message: err instanceof Error ? err.message : 'Unknown error',
        craftUrl: config.public.CRAFT_URL
      })
      throw err
    }
  }

  return { query }
}
