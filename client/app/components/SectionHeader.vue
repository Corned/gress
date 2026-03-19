<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div class="flex items-center gap-3 mb-4">
    <h2 class="text-xl font-bold text-zinc-900 shrink-0">{{ title }}</h2>
    <div class="flex-1 h-px bg-zinc-100" />
  </div>
</template>
