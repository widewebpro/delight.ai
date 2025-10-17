<template>
  <button 
    :class="buttonClasses"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  fullWidth: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => {
  const baseClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'rounded',
    'transition',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed'
  ]

  // Variant styles
  const variantClasses = {
    primary: [
      'bg-primary',
      'text-white',
      'hover:bg-primary-dark',
      'focus:ring-primary'
    ],
    secondary: [
      'bg-secondary',
      'text-white',
      'hover:bg-secondary-dark',
      'focus:ring-secondary'
    ],
    accent: [
      'bg-accent',
      'text-white',
      'hover:bg-accent-dark',
      'focus:ring-accent'
    ],
    success: [
      'bg-success',
      'text-white',
      'hover:bg-success',
      'focus:ring-success'
    ],
    warning: [
      'bg-warning',
      'text-white',
      'hover:bg-warning',
      'focus:ring-warning'
    ],
    error: [
      'bg-error',
      'text-white',
      'hover:bg-error',
      'focus:ring-error'
    ]
  }

  // Size styles
  const sizeClasses = {
    sm: ['px-3', 'py-1.5', 'text-sm'],
    md: ['px-4', 'py-2', 'text-base'],
    lg: ['px-6', 'py-3', 'text-lg']
  }

  // Full width
  const widthClasses = props.fullWidth ? ['w-full'] : []

  return [
    ...baseClasses,
    ...variantClasses[props.variant],
    ...sizeClasses[props.size],
    ...widthClasses
  ]
})
</script>

