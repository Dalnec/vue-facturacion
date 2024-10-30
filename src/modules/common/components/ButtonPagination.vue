<template>
  <div class="join m-2">
    <button
      class="join-item btn btn-sm"
      :disabled="page === 1"
      @click="$router.push({ query: { page: page - 1 } })"
    >
      «
    </button>
    <button class="join-item btn btn-sm">Página {{ page }}</button>
    <button
      class="join-item btn btn-sm"
      :disabled="hasMoreData"
      @click="$router.push({ query: { page: page + 1 } })"
    >
      »
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  page: number
  hasMoreData: boolean
}

defineProps<Props>()
</script>
