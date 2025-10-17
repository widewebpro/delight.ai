/**
 * Server-side GraphQL client for SSG route generation
 * Uses direct fetch instead of Nuxt composables
 */

interface GraphQLResponse<T = any> {
  data?: T
  errors?: Array<{
    message: string
    locations?: Array<{ line: number; column: number }>
    path?: Array<string | number>
  }>
}

interface GraphQLVariables {
  [key: string]: any
}

export class ServerGraphQL {
  private baseUrl: string

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || process.env['NUXT_PUBLIC_CRAFT_URL'] || 'https://cms.sendbird.com'
  }

  async query<T = any>(
    query: string,
    variables: GraphQLVariables = {}
  ): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}/api`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: GraphQLResponse<T> = await response.json()

      if (result.errors && result.errors.length > 0) {
        const errorMessages = result.errors.map(error => error.message).join(', ')
        throw new Error(`GraphQL Error: ${errorMessages}`)
      }

      return result.data as T
    } catch (error) {
      console.error('GraphQL query error:', error)
      throw error
    }
  }
}

// Export a function that returns a new instance (following use* naming convention)
export const useServerGraphQL = () => new ServerGraphQL()
