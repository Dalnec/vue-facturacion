<template>
  <svg
    viewBox="-1.5 -1.5 18.00 18.00"
    :class="$props.class"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    transform="rotate(0)"
    stroke="#0369a1"
    stroke-width="0.375"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M2 12.5V13H3V12.5H2ZM7 12.5V13H8V12.5H7ZM3 12.5V11.9999H2V12.5H3ZM7 11.9997V12.5H8V11.9997H7ZM5 10C6.10466 10 7 10.8952 7 11.9997H8C8 10.3427 6.65677 9 5 9V10ZM3 11.9999C3 10.8953 3.8954 10 5 10V9C3.34318 9 2 10.343 2 11.9999H3ZM5 4C3.89543 4 3 4.89543 3 6H4C4 5.44772 4.44772 5 5 5V4ZM7 6C7 4.89543 6.10457 4 5 4V5C5.55228 5 6 5.44772 6 6H7ZM5 8C6.10457 8 7 7.10457 7 6H6C6 6.55228 5.55228 7 5 7V8ZM5 7C4.44772 7 4 6.55228 4 6H3C3 7.10457 3.89543 8 5 8V7ZM1.5 3H13.5V2H1.5V3ZM14 3.5V11.5H15V3.5H14ZM13.5 12H1.5V13H13.5V12ZM1 11.5V3.5H0V11.5H1ZM1.5 12C1.22386 12 1 11.7761 1 11.5H0C0 12.3284 0.671574 13 1.5 13V12ZM14 11.5C14 11.7761 13.7761 12 13.5 12V13C14.3284 13 15 12.3284 15 11.5H14ZM13.5 3C13.7761 3 14 3.22386 14 3.5H15C15 2.67157 14.3284 2 13.5 2V3ZM1.5 2C0.671573 2 0 2.67157 0 3.5H1C1 3.22386 1.22386 3 1.5 3V2ZM9 6H12V5H9V6ZM9 9H12V8H9V9ZM0 15H15V14H0V15ZM3 0V2.5H4V0H3ZM11 0V2.5H12V0H11Z"
        fill="#0369a1"
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
