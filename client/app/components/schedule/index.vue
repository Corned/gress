<script setup lang="ts">
import { Dumbbell } from 'lucide-vue-next'

defineProps<{
  schedule: Array<{
    day: string
    type: 'scrim' | 'match' | 'coaching'
    timeStart: string
    timeEnd: string
    opponent?: string
  }>
  editable?: boolean
}>()

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
</script>

<template>
  <div class="grid grid-cols-7 gap-2">
    <div v-for="day in days" :key="day" class="flex flex-col gap-1.5">
      <span class="text-xs font-semibold text-center"
        :class="schedule.find(s => s.day === day) ? 'text-zinc-900' : 'text-zinc-300'">
        {{ day }}
      </span>
      <template v-if="schedule.filter(e => e.day === day).length">
        <ScheduleBlock v-for="event in schedule.filter(e => e.day === day)" :key="event.timeStart" :event="event"
          :editable="editable" />
      </template>
      <div v-else class="rounded-xl py-3 border-2 border-dashed border-zinc-200 grid place-items-center">
        <Dumbbell class="size-3.5 text-zinc-300" />
      </div>
    </div>
  </div>
</template>
