<script setup lang="ts">
defineProps<{
  event: {
    type: 'scrim' | 'match' | 'coaching'
    timeStart: string
    timeEnd: string
    opponent?: string
  }
}>()

const blockClass = (type: 'scrim' | 'match' | 'coaching') => ({
  scrim: 'bg-zinc-900 text-white',
  match: 'bg-orange-600 text-white',
  coaching: 'bg-blue-100 text-blue-900',
}[type])
</script>

<template>
  <div class="rounded-xl flex flex-col p-2.5 gap-0.5" :class="blockClass(event.type)">
    <p class="text-xs font-bold capitalize">{{ event.type }}</p>
    <p class="text-xs opacity-60 tabular-nums">{{ event.timeStart }}–{{ event.timeEnd }}</p>
    <p v-if="event.opponent" class="text-xs opacity-80 truncate">vs {{ event.opponent }}</p>
  </div>
</template>
