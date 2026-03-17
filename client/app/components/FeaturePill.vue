<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  label: string
  icon: Component
}

defineProps<Props>()
</script>

<template>
  <div
    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-zinc-200 text-zinc-600 text-sm font-medium">
    <component :is="icon" class="size-3.5" />
    {{ label }}
  </div>
</template>
