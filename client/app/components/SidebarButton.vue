<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{ label: string; icon: Component; to: string }>()
</script>

<template>
  <NuxtLink :to="to"
    class="w-full flex items-center gap-2 font-semibold hover:bg-zinc-200 transition-colors hover:cursor-pointer py-1 px-2 rounded-md"
    active-class="" exact-active-class="bg-zinc-200">
    <component :is="icon" class="size-4 shrink-0 text-zinc-500" />
    {{ label }}
  </NuxtLink>
</template>
