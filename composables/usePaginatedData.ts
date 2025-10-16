import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from '#app'

interface PaginatedData {
  total: number
  [key: string]: any
}

export function usePaginatedData(
  fetchData: (page: number, itemsPerPage: number) => Promise<PaginatedData>, 
  initialItemsPerPage: number = 4
) {
  const route = useRoute()
  const router = useRouter()
  
  const currentPage = ref(parseInt(route.query['page'] as string) || 1)
  const itemsPerPage = ref(initialItemsPerPage)

  const { 
    data, 
    error, 
    pending: loading, 
    refresh 
  } = useAsyncData(
    `paginated-data-${currentPage.value}`,
    () => fetchData(currentPage.value, itemsPerPage.value),
    {
      watch: [currentPage]
    }
  )

  const totalPosts = computed(() => data.value?.total || 0)
  const totalPages = computed(() => 
    Math.ceil(totalPosts.value / itemsPerPage.value)
  )

  const updateCurrentPage = async (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages.value && newPage !== currentPage.value) {
      await router.push({
        query: { ...route.query, page: newPage }
      })
    }
  }

  // Watch for route changes
  watch(() => route.query['page'], async (newPage) => {
    const page = parseInt(newPage as string) || 1
    if (page !== currentPage.value) {
      currentPage.value = page
    }
  })

  return {
    currentPage,
    itemsPerPage,
    data,
    totalPages,
    loading,
    error,
    updateCurrentPage,
    fetchPageData: refresh,
    refresh
  }
}