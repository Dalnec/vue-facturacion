<template>
  <svg
    :class="$props.class"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M13 16H16L3 0H0L3.38948 4.17167C2.58157 4.61063 1.83348 5.16652 1.17157 5.82842L0 7L1.41421 8.41421L2.58579 7.24264C3.20071 6.62772 3.90945 6.12819 4.67837 5.75799L5.98803 7.36989C5.24898 7.65114 4.56994 8.08691 4 8.65685L2.82843 9.82842L4.24264 11.2426L5.41421 10.0711C5.94688 9.5384 6.62695 9.18703 7.35855 9.05668L8.9375 11H8.00355L8 11C7.56057 11 7.13914 11.1746 6.82842 11.4853L5.65685 12.6568L8 15L10.3103 12.6897L13 16Z"
        fill="#ed0202"
      ></path>
      <path
        d="M10.3673 5.37513C11.5055 5.74521 12.5521 6.38051 13.4142 7.24264L14.5858 8.41421L16 7L14.8284 5.82842C13.1228 4.12278 10.8448 3.12107 8.44586 3.01028L10.3673 5.37513Z"
        fill="#ed0202"
      ></path>
    </g>
  </svg>
</template>

<script setup lang="ts">
interface Props {
  class?: string
}
withDefaults(defineProps<Props>(), {
  class: 'w-6 h-6',
})
</script>
