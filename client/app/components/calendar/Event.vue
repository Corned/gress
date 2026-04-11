<script setup lang="ts">
import type { ScheduledEvent } from '~/composables/useTeams'

defineProps<{
  event: ScheduledEvent & { teamName: string }
}>()

const cardClass = (type: ScheduledEvent['type']) => ({
  scrim: 'bg-orange-500',
  match: 'bg-zinc-800',
  coaching: 'bg-red-500',
}[type])

const timeClass = (type: ScheduledEvent['type']) => ({
  scrim: 'text-orange-200',
  match: 'text-zinc-400',
  coaching: 'text-red-200',
}[type])

function shortTime(t: string) {
  return t.split(':')[0]
}
</script>

<template>
  <div class="rounded-lg px-2 py-1.5 flex flex-col gap-0.5 text-white" :class="cardClass(event.type)">
    <div class="flex items-center justify-between gap-1 min-w-0">
      <span class="text-[10px] font-bold uppercase tracking-wide truncate min-w-0">{{ event.type }}</span>
      <span class="text-[10px] tabular-nums shrink-0" :class="timeClass(event.type)">
        {{ shortTime(event.timeStart) }}–{{ shortTime(event.timeEnd) }}
      </span>
    </div>
    <span class="text-[10px] truncate leading-tight" :class="timeClass(event.type)">{{ event.teamName }}</span>
  </div>
</template>
