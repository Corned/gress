<script setup lang="ts">
defineProps<{ to: string }>()
</script>

<template>
  <NuxtLink :to="to" class="rounded-xl border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-colors">
    <slot />
  </NuxtLink>
</template>
