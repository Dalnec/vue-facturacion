<template>
  <svg
    :class="$props.class"
    viewBox="-2.4 -2.4 28.80 28.80"
    xmlns="http://www.w3.org/2000/svg"
    fill="#46d33c"
    stroke="#46d33c"
    stroke-width="0.00024000000000000003"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M24,0V24H0V0Z" fill="none"></path>
      <path
        d="M17,7H3.34A1.34,1.34,0,0,0,2,8.33v7.33A1.34,1.34,0,0,0,3.33,17H17Z"
      ></path>
      <path
        d="M20,10V8.33A1.34,1.34,0,0,0,18.67,7H17V17h1.67A1.34,1.34,0,0,0,20,15.67V14h2V10Z"
        fill-opacity="0.3"
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
