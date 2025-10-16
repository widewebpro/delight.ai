<script setup>
import { useGraphQL } from '~/composables/useGraphQL'
import { PAGE_QUERY } from '~/queries/pages.ts'
import { usePreview } from '@/composables/usePreview'
import { useHead } from '#imports'

// Add onMounted for debugging
onMounted(() => {
  console.log('=== useAsyncData Debug ===')
  console.log('pageData.value:')
  console.log(pageData.value)
})

const route = useRoute()
const graphql = useGraphQL()
const { isPreview, previewToken, previewTimestamp } = usePreview()

// Disable SSR for preview mode
if (isPreview.value) {
  definePageMeta({ ssr: false })
}

// Get the current slug from the route
const slug = computed(() => {
  const slugParam = route.params.slug
  if (!slugParam) return ''
  return Array.isArray(slugParam) ? slugParam.join('/') : slugParam
})

// Skip fetching for system paths (e.g., .well-known)
const shouldFetch = computed(() => !!slug.value && !slug.value.startsWith('.well-known'))

// Fetch the page data
const { data: pageData, refresh, error } = await useAsyncData(
  `page-${slug.value}`,
  () => {
    if (!shouldFetch.value) {
      return Promise.resolve(null)
    }
    console.log('slug.value', slug.value)

    return graphql.query(PAGE_QUERY, {
      uri: [slug.value],
      site: ['microsite_en_US']
    }, {
      previewToken: previewToken.value
    }).then(result => {
      if (!result?.entry) {
        return null
      }
      return result.entry
    }).catch(err => {
      console.error('Error fetching page:', err)
      return null
    })
  },
  {
    watch: [slug, previewToken, shouldFetch] // Watch both slug and preview token
  }
)

watch([isPreview, previewToken], () => {
  if (isPreview.value && previewToken.value) {
    refresh()
  }
})

// Set the page title
useHead(() => ({
  title: pageData.value?.title || ''
}))
</script>

<template>
  <div v-if="pageData">
    <h1 class="text-3xl font-bold">{{ pageData.title }}</h1>
    <h2 class="text-2xl font-bold">PageId: {{ pageData.id }}</h2>
  </div>
</template>
