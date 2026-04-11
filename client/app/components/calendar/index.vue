<script setup lang="ts">
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

function eventsForDay(day: string): (ScheduledEvent & { teamName: string })[] {
  return props.teams.flatMap(team =>
    team.schedule
      .filter(e => e.day === day)
      .map(e => ({ ...e, teamName: team.name }))
  )
}
</script>

<template>
  <div>
    <CalendarNav
      :week-label="weekLabel"
      @prev="weekOffset--"
      @next="weekOffset++"
      @today="weekOffset = 0"
    />

    <div class="rounded-xl border border-zinc-200 bg-zinc-50">
      <div class="grid grid-cols-7 divide-x divide-zinc-200">
        <CalendarDay
          v-for="(day, i) in days"
          :key="day"
          :day="day"
          :date="dateForDay(i)"
          :is-today="day === today"
          :events="eventsForDay(day)"
        />
      </div>
    </div>
  </div>
</template>
