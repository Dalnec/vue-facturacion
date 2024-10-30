<template>
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 32 32"
    xml:space="preserve"
    fill="#fff"
    :class="$props.class"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <circle
        style="fill: none; stroke: #fff; stroke-width: 2; stroke-miterlimit: 10"
        cx="14"
        cy="11"
        r="6"
      ></circle>
      <path
        style="fill: none; stroke: #fff; stroke-width: 2; stroke-miterlimit: 10"
        d="M5,26c0-4.971,4.029-9,9-9 c1.864,0,3.596,0.567,5.032,1.537"
      ></path>
      <circle
        style="fill: none; stroke: #fff; stroke-width: 2; stroke-miterlimit: 10"
        cx="24"
        cy="24"
        r="7"
      ></circle>
      <line
        style="fill: none; stroke: #fff; stroke-width: 2; stroke-miterlimit: 10"
        x1="24"
        y1="28"
        x2="24"
        y2="20"
      ></line>
      <line
        style="fill: none; stroke: #fff; stroke-width: 2; stroke-miterlimit: 10"
        x1="20"
        y1="24"
        x2="28"
        y2="24"
      ></line>
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
