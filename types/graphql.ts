// GraphQL types for Sendbird CMS

export interface GraphQLResponse<T = any> {
  data?: T
  errors?: Array<{
    message: string
    locations?: Array<{
      line: number
      column: number
    }>
    path?: string[]
  }>
}

export interface GraphQLQueryOptions {
  private?: boolean
  previewToken?: string
}

// Types for pages
export interface PageEntry {
  id: string
  title: string
  uri: string
  pageSubheading?: string
  pageContent?: string
  image?: Array<{
    url: string
    alt: string
  }>
  ancestors: Array<{
    id: string
    title: string
    uri: string
  }>
  children: Array<{
    id: string
    title: string
    uri: string
  }>
}

// Types for towers
export interface TowerEntry {
  id: string
  title: string
  blocks?: Array<{
    id: string
    __typename: string
    hS?: number
    hM?: number
    hL?: number
    hXL?: number
  }>
}

// Types for blogs
export interface BlogEntry {
  id: string
  slug: string
  title: string
  uri: string
  pageSubheading?: string
  pageContent?: string
  postDate?: string
  image?: {
    alt: string
    url: string
  }
  next?: {
    id: string
    slug: string
    uri: string
    title: string
    postDate: string
  }
  prev?: {
    id: string
    slug: string
    uri: string
    title: string
    postDate: string
  }
  category?: {
    id: string
    title: string
  }
}

// Types for global settings
export interface GlobalEntry {
  id: string
  title: string
  logo?: {
    url: string
    alt: string
  }
  address?: {
    addressLine1?: string
    addressLine2?: string
    addressLine3?: string
    countryCode?: string
    locality?: string
    postalCode?: string
    title?: string
  }
}

// Types for queries
export interface PageQueryVariables {
  uri: string[]
}

export interface TowerQueryVariables {
  site?: string[]
  uri?: string[]
}

export interface BlogQueryVariables {
  limit: number
  offset: number
}

export interface BlogPostQueryVariables {
  slug?: string[]
}
