<script setup>
const props = defineProps({
  pages: {
    type: Array,
    default: () => []
  },
  mobile: {
    type: Boolean,
    default: false
  }
})

const isCurrentPage = (path) => {
  if (process.client) {
    return window.location.pathname === path
  }
  return false
}

// Main navigation items
const mainNavItems = [
  {
    title: 'Why Sendbird',
    path: '/ai-agent/why-choose-sendbird'
  },
  {
    title: 'AI agent platform',
    path: '/ai-agent'
  },
  {
    title: 'AI agent builder',
    path: '/ai-agent/builder'
  }
]
</script>

<template>
  <nav :class="mobile ? 'nav nav--mobile' : 'nav nav--desktop'" aria-label="Primary">
    <template v-if="mobile">
      <!-- Mobile navigation -->
      <a 
        v-for="item in mainNavItems" 
        :key="item.path"
        :href="item.path" 
        class="nav__link nav__link--mobile"
        :class="{ 'nav__link--active': isCurrentPage(item.path) }"
        :aria-current="isCurrentPage(item.path) ? 'page' : null"
      >
        {{ item.title }}
      </a>
    </template>
    <template v-else>
      <!-- Desktop navigation -->
      <a 
        v-for="item in mainNavItems" 
        :key="item.path"
        :href="item.path" 
        class="nav__link nav__link--desktop"
        :class="{ 'nav__link--active': isCurrentPage(item.path) }"
        :aria-current="isCurrentPage(item.path) ? 'page' : null"
      >
        {{ item.title }}
      </a>
    </template>
  </nav>
</template>

<style scoped>
.nav {
  /* Base nav styles */
}

.nav--desktop {
  display: flex;
  gap: var(--space-8);
}

.nav--mobile {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.nav__link {
  text-decoration: none;
  font-weight: var(--font-medium);
  transition: color var(--transition-fast);
}

.nav__link--desktop {
  color: var(--color-gray-300);
  font-size: var(--text-base);
}

.nav__link--desktop:hover {
  color: var(--color-white);
}

.nav__link--desktop.nav__link--active {
  color: var(--color-primary);
}

.nav__link--mobile {
  display: block;
  padding: var(--space-2) var(--space-3);
  color: var(--color-gray-300);
  font-size: var(--text-base);
  border-radius: var(--radius-base);
  transition: all var(--transition-fast);
}

.nav__link--mobile:hover {
  color: var(--color-white);
  background-color: var(--color-gray-800);
}

.nav__link--mobile.nav__link--active {
  color: var(--color-primary);
  background-color: var(--color-gray-800);
}
</style>