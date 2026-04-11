<script setup lang="ts">
import type { ScheduledEvent } from '~/composables/useTeams'

defineProps<{
  day: string
  date: string
  isToday: boolean
  events: (ScheduledEvent & { teamName: string })[]
}>()
</script>

<template>
  <div class="p-2.5 flex flex-col gap-2"
    :class="isToday ? 'bg-white ring-2 ring-orange-400 ring-offset-2 rounded z-10 scale-100 border-none' : ''">
    <div class="mb-1">
      <span class="text-xs font-bold uppercase tracking-widest"
        :class="isToday ? 'text-zinc-900' : 'text-zinc-400'">{{ day }}</span>
      <span class="text-xs text-zinc-300 ml-1">{{ date }}</span>
    </div>

    <CalendarEvent v-for="(event, i) in events" :key="i" :event="event" />

    <div v-if="events.length === 0" class="flex-1" />
  </div>
</template>
