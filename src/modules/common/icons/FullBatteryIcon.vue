<template>
  <svg
    :class="$props.class"
    viewBox="0 0 24.00 24.00"
    xmlns="http://www.w3.org/2000/svg"
    fill="#46d33c"
    transform="matrix(1, 0, 0, 1, 0, 0)rotate(270)"
    stroke="#46d33c"
    stroke-width="0.00024000000000000003"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke="#CCCCCC"
      stroke-width="0.144"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M24,0V24H0V0Z" fill="none"></path>
      <path
        d="M20,10V8.33a1.31,1.31,0,0,0-1-1.26v9.86a1.31,1.31,0,0,0,1-1.26V14h2V10Z"
        fill-opacity="0.3"
      ></path>
      <path
        d="M18.67,7H3.34A1.34,1.34,0,0,0,2,8.33v7.33A1.34,1.34,0,0,0,3.33,17H18.67a1.21,1.21,0,0,0,.33-.07V7.07A1.21,1.21,0,0,0,18.67,7ZM11.5,13v2L4,11H9.5V9L17,13Z"
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
