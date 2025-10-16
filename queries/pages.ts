export const PAGE_QUERY = `
  query PageEntry($uri: [String]!, $site: [String]) {
    entry(site: $site, uri: $uri) {
      id
      title
      uri
      pageSubheading
      pageContent
      image {
        url @transform(handle: "hero")
        alt
      }
      ancestors {
        id
        title
        uri
      }
      children {
        id
        title
        uri
      }
    }
  }
`

export const getTower = `
query getTower(
  $site: [String]
  $uri: [String]) {
  
  entry(
    section: "towers"
    site: $site
    uri: $uri
  ) {

    ...on towers_default_Entry {
      id
      title

      blocks {
        id
        __typename


        ... on blocks_responsiveSpacer_BlockType {
          hS: number
          hM: number2
          hL: number3
          hXL: number4
        }
      }
    }

  }
}
`
