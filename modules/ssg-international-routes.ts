
/**
 * SSG International Routes Module
 * Returns routes for static site generation
 */

import { useServerGraphQL } from '../composables/useServerGraphQL'
import { GET_PAGE_ENTRIES } from '../queries/all-pages'

export default async function() {
	// Configuration
	const internationalSites = [
		'microsite_en_US', 
		'microsite_ko_KR',
	]

	const sections = [
		'towers',
	]


	try {
		// Initialize server GraphQL client
		const graphql = useServerGraphQL()
		
		// Fetch routes from CMS for all combinations of sites and sections
		const allRoutes = []
		
		// Create all combinations of sites and sections
		const combinations = []
		for (const site of internationalSites) {
			for (const section of sections) {
				combinations.push({ site, section })
			}
		}
		
		
		for (const { site, section } of combinations) {
			try {
                 const result = await graphql.query(GET_PAGE_ENTRIES, {
                   section: [section],
                   site: [site]
                 })


                 if (result?.entries && result.entries.length > 0) {
					const siteRoutes = result.entries
						.filter((entry: any) => entry.uri) // Only entries with URI
						.filter((entry: any) => {
							// Filter out pages with noindex in robots
							const robots = entry.seo?.[0]?.robots || []
							return !robots.includes('noindex')
						})
						.map((entry: any) => `/${entry.uri}`)
					
					allRoutes.push(...siteRoutes)
				}
			} catch (sectionError: any) {
				// Silently continue if one section fails
			}
		}
		
		// Remove duplicates from CMS routes
		const uniqueRoutes = [...new Set(allRoutes)]
		
		
		return uniqueRoutes
		
	} catch (error) {
		return []
	}
}
