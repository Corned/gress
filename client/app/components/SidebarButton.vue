<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{ label: string; icon: Component }>()
</script>

<template>
  <button class="w-full flex items-center gap-2 font-semibold hover:bg-zinc-200 transition-colors hover:cursor-pointer py-1 px-2 rounded-md">
    <component :is="icon" class="size-4 shrink-0 text-zinc-500" />
    {{ label }}
  </button>
</template>
