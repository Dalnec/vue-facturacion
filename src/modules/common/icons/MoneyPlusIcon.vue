<template>
  <svg
    :class="$props.class"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#ffffff"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M3 10L3 8C3 6.89543 3.89543 6 5 6L7 6M3 10C4.33333 10 7 9.2 7 6M3 10L3 14M21 10V8C21 6.89543 20.1046 6 19 6H17M21 10C19.6667 10 17 9.2 17 6M21 10V12M7 6L17 6M3 14L3 16C3 17.1046 3.89543 18 5 18H7M3 14C4.33333 14 7 14.8 7 18M7 18H11"
        stroke="#ffffff"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      ></path>
      <circle
        cx="12"
        cy="12"
        r="2"
        stroke="#ffffff"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      ></circle>
      <path
        d="M18 15V18M18 21V18M18 18H15M18 18H21"
        stroke="#ffffff"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
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
