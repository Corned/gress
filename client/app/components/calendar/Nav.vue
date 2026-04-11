<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

defineProps<{ weekLabel: string }>()
const emit = defineEmits<{
  prev: []
  next: []
  today: []
}>()
</script>

<template>
  <div class="flex items-center justify-between mb-3">
    <p class="text-sm font-semibold text-zinc-500">{{ weekLabel }}</p>
    <div class="flex items-center gap-1">
      <button class="p-1.5 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-400 hover:text-zinc-700"
        @click="emit('prev')">
        <ChevronLeft class="size-4" />
      </button>
      <button
        class="text-xs font-semibold px-2.5 py-1 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-400 hover:text-zinc-700"
        @click="emit('today')">
        Today
      </button>
      <button class="p-1.5 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-400 hover:text-zinc-700"
        @click="emit('next')">
        <ChevronRight class="size-4" />
      </button>
    </div>
  </div>
</template>
