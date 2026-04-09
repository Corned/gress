<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import type { Team, ScheduledEvent } from '~/composables/useTeams'

const props = defineProps<{
  teams: Team[]
}>()

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const weekOffset = ref(0)

const todayName = new Date().toLocaleDateString('en-US', { weekday: 'short' })
const today = computed(() => weekOffset.value === 0 ? todayName : '')

const weekStart = computed(() => {
  const now = new Date()
  const day = now.getDay()
  const mondayOffset = day === 0 ? -6 : 1 - day
  const monday = new Date(now)
  monday.setDate(now.getDate() + mondayOffset + weekOffset.value * 7)
  return monday
})

const weekLabel = computed(() => {
  const start = weekStart.value
  const end = new Date(start)
  end.setDate(start.getDate() + 6)

  const startMonth = start.toLocaleDateString('en-US', { month: 'long' })
  const endMonth = end.toLocaleDateString('en-US', { month: 'long' })
  const year = end.getFullYear()

  if (startMonth === endMonth) {
    return `${startMonth} ${start.getDate()}–${end.getDate()}, ${year}`
  }
  return `${startMonth} ${start.getDate()} – ${endMonth} ${end.getDate()}, ${year}`
})

function dateForDay(index: number): string {
  const d = new Date(weekStart.value)
  d.setDate(d.getDate() + index)
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}`
}

function eventsForDay(day: string) {
  return props.teams.flatMap(team =>
    team.schedule
      .filter(e => e.day === day)
      .map(e => ({ ...e, teamName: team.name }))
  )
}

const eventCardClass = (type: ScheduledEvent['type']) => ({
  scrim: 'bg-orange-500',
  match: 'bg-zinc-800',
  coaching: 'bg-red-500',
}[type])

const eventTimeClass = (type: ScheduledEvent['type']) => ({
  scrim: 'text-orange-200',
  match: 'text-zinc-400',
  coaching: 'text-red-200',
}[type])

function shortTime(t: string) {
  return t.split(':')[0]
}
</script>

<template>
  <div>
    <!-- Week navigation -->
    <div class="flex items-center justify-between mb-3">
      <p class="text-sm font-semibold text-zinc-500">{{ weekLabel }}</p>
      <div class="flex items-center gap-1">
        <button class="p-1.5 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-400 hover:text-zinc-700"
          @click="weekOffset--">
          <ChevronLeft class="size-4" />
        </button>
        <button
          class="text-xs font-semibold px-2.5 py-1 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-400 hover:text-zinc-700"
          @click="weekOffset = 0">
          Today
        </button>
        <button class="p-1.5 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-400 hover:text-zinc-700"
          @click="weekOffset++">
          <ChevronRight class="size-4" />
        </button>
      </div>
    </div>

    <!-- Calendar -->
    <div class="rounded-xl border border-zinc-200 bg-zinc-50">
      <div class="grid grid-cols-7 divide-x divide-zinc-200">
        <div v-for="(day, i) in days" :key="day" class="p-2.5 flex flex-col gap-2"
          :class="day === today ? 'bg-white ring-2 ring-orange-400 ring-offset-2 rounded z-10 scale-100 border-none' : ''">
          <div class="mb-1">
            <span class="text-xs font-bold uppercase tracking-widest"
              :class="day === today ? 'text-zinc-900' : 'text-zinc-400'">{{ day }}</span>
            <span class="text-xs text-zinc-300 ml-1">{{ dateForDay(i) }}</span>
          </div>

          <div v-for="(event, i) in eventsForDay(day)" :key="i"
            class="rounded-lg px-2 py-1.5 flex flex-col gap-0.5 text-white"
            :class="eventCardClass(event.type)">
            <div class="flex items-center justify-between gap-1 min-w-0">
              <span class="text-[10px] font-bold uppercase tracking-wide truncate min-w-0">{{ event.type }}</span>
              <span class="text-[10px] tabular-nums shrink-0" :class="eventTimeClass(event.type)">{{ shortTime(event.timeStart) }}–{{ shortTime(event.timeEnd) }}</span>
            </div>
            <span class="text-[10px] truncate leading-tight" :class="eventTimeClass(event.type)">{{ event.teamName }}</span>
          </div>

          <div v-if="eventsForDay(day).length === 0" class="flex-1 flex items-center justify-center">
            <span class="text-xs text-zinc-200 select-none">empty</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
