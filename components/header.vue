<script setup>
const props = defineProps({
  globalData: {
    type: Object,
    default: () => ({
      logo: {
        url: '',
        alt: ''
      }
    })
  },
  pages: {
    type: Array,
    default: () => []
  }
})

const { public: { SITE_NAME } } = useRuntimeConfig()
const siteName = computed(() => SITE_NAME || 'Site Name')

// Mobile menu state
const mobileMenuOpen = ref(false)
</script>

<template>
  <header class="header">
    <div class="header__container">
      <div class="header__content">
        <!-- Left: Home -->
        <div class="header__left">
          <a href="/ai" class="header__logo">
            Home
          </a>
        </div>

        <!-- Center: Main Navigation -->
        <div class="header__center">
          <Navigation :pages="pages" />
        </div>

        <!-- Right: Contact Sales -->
        <div class="header__right">
          <a href="/ai/contact-sales" class="header__cta">
            Contact Sales
          </a>
        </div>

        <!-- Mobile menu button -->
        <div class="header__mobile-toggle">
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="header__mobile-button"
          >
            <svg class="header__mobile-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="header__mobile-menu">
        <div class="header__mobile-content">
          <Navigation :pages="pages" mobile />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: var(--color-black);
  border-bottom: 1px solid var(--color-gray-800);
  position: sticky;
  top: 0;
  z-index: var(--z-fixed);
}

.header__container {
  max-width: 80rem; /* 1280px */
  margin: 0 auto;
  padding: 0 var(--space-4);
}

@media (min-width: 640px) {
  .header__container {
    padding: 0 var(--space-6);
  }
}

@media (min-width: 1024px) {
  .header__container {
    padding: 0 var(--space-8);
  }
}

.header__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem; /* 64px */
}

.header__left {
  flex-shrink: 0;
}

.header__logo {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-white);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.header__logo:hover {
  color: var(--color-primary);
}

.header__center {
  display: none;
}

@media (min-width: 768px) {
  .header__center {
    display: block;
  }
}

.header__right {
  flex-shrink: 0;
}

.header__cta {
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-base);
  font-weight: var(--font-medium);
  text-decoration: none;
  transition: background-color var(--transition-fast);
}

.header__cta:hover {
  background-color: var(--color-primary-dark);
}

.header__mobile-toggle {
  display: block;
}

@media (min-width: 768px) {
  .header__mobile-toggle {
    display: none;
  }
}

.header__mobile-button {
  color: var(--color-gray-400);
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-2);
  transition: color var(--transition-fast);
}

.header__mobile-button:hover {
  color: var(--color-white);
}

.header__mobile-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.header__mobile-menu {
  display: block;
  border-top: 1px solid var(--color-gray-800);
}

@media (min-width: 768px) {
  .header__mobile-menu {
    display: none;
  }
}

.header__mobile-content {
  padding: var(--space-2) var(--space-3);
  background-color: var(--color-gray-900);
}
</style>
