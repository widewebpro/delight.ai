
/**
 * SSG International Routes Module
 * Returns routes for static site generation
 */

export default function() {
	// Configuration
	const internationalSites = [
		'microsite_en_US', 
		'microsite_ko_KR',
	]

	const sections = [
		'towers',
	]

	// Static routes for testing
	const staticRoutes = [
		'/ai-agent/industries/retail',
		'/ai-agent/industries/b2b'
	]

	console.log('🚀 SSG Routes Module loaded')

	return staticRoutes
}
