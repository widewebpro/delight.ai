/**
 * GraphQL query to fetch all pages from CMS
 * Used for SSG route generation
 */

export const GET_PAGE_ENTRIES = `
  query getPageEntries(
    $section:[String]
    $site:[String]) {
    entries(section:$section, site:$site) {
      uri
      robots
      seo { robots }
    }
  }
`