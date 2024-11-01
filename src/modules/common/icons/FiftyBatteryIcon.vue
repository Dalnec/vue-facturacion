<template>
  <svg
    :class="$props.class"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="#46d33c"
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
        d="M20,10V8.33A1.34,1.34,0,0,0,18.67,7H12V17h6.67A1.34,1.34,0,0,0,20,15.67V14h2V10Z"
        fill-opacity="0.3"
      ></path>
      <path
        d="M12,7H3.34A1.34,1.34,0,0,0,2,8.33v7.33A1.34,1.34,0,0,0,3.33,17H12Z"
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
