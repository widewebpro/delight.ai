export const PAGE_QUERY = `
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