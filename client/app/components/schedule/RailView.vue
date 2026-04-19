<script setup lang="ts">
import type { CalEvent } from './types'
import { EVENT_TYPES, DAY_NAMES, MONTHS, WEEK_DAYS } from './constants'
import { getDayEvents, toHours, fmtRange, pad, todayDayIndex } from './utils'

const props = defineProps<{
  events:    CalEvent[]
  weekStart: Date
  today:     Date
}>()

const emit = defineEmits<{
  open: [event: CalEvent, el: HTMLElement]
}>()

const H = 36 // px per hour

const timeRange = computed(() => {
  if (!props.events.length) return { startHour: 18, endHour: 24 }
  let minH = 24, maxH = 0
  props.events.forEach(e => {
    minH = Math.min(minH, toHours(e.start))
    maxH = Math.max(maxH, toHours(e.end))
  })
  return { startHour: Math.max(0, Math.floor(minH - 1)), endHour: Math.min(24, Math.ceil(maxH + 1)) }
})

const totalH    = computed(() => timeRange.value.endHour - timeRange.value.startHour)
const hourLines = computed(() => Array.from({ length: totalH.value + 1 }, (_, i) => i))
const todayIdx  = computed(() => todayDayIndex(props.weekStart, props.today))

const days = computed(() =>
  WEEK_DAYS.map(i => {
    const d = new Date(props.weekStart)
    d.setDate(d.getDate() + i)
    return {
      dayIdx: i,
      date: d.getDate(),
      month: MONTHS[d.getMonth()],
      isToday: i === todayIdx.value,
      isWeekend: i >= 5,
      events: getDayEvents(props.events, props.weekStart, i),
    }
  })
)

function evTop(ev: CalEvent) {
  return (toHours(ev.start) - timeRange.value.startHour) * H
}

function evHeight(ev: CalEvent) {
  return Math.max(18, (toHours(ev.end) - toHours(ev.start)) * H)
}
</script>

<template>
  <div class="rounded-xl border border-zinc-200 bg-white overflow-x-auto">
    <div class="min-w-[900px]">
      <!-- Day headers -->
      <div class="grid border-b border-zinc-200" :style="{ gridTemplateColumns: `repeat(7, 1fr)` }">
        <div
          v-for="day in days" :key="day.dayIdx"
          class="px-3.5 py-2 border-r border-zinc-200 last:border-r-0"
        >
          <div class="text-[10.5px] font-semibold uppercase tracking-wider text-zinc-400">{{ DAY_NAMES[day.dayIdx] }}</div>
          <div class="text-base font-bold leading-none mt-1" :class="day.isToday ? 'today-date' : 'text-zinc-800'">
            {{ day.month }} {{ day.date }}
          </div>
        </div>
      </div>

      <!-- Grid body -->
      <div
        class="grid relative"
        :style="{ gridTemplateColumns: `repeat(7, 1fr)`, height: `${totalH * H}px` }"
      >
        <div
          v-for="day in days" :key="day.dayIdx"
          class="relative border-r border-zinc-200 last:border-r-0"
          :class="{ 'weekend-col': day.isWeekend }"
        >
          <!-- Hour rules -->
          <div
            v-for="i in hourLines" :key="i"
            class="absolute inset-x-0 border-t border-dashed pointer-events-none"
            :class="i === 0 ? 'border-zinc-200' : 'border-zinc-100'"
            :style="{ top: `${i * H}px` }"
          >
            <span v-if="day.dayIdx === 0" class="absolute left-1 top-0 -translate-y-1/2 text-[10px] text-zinc-400 leading-none">
              {{ pad(timeRange.startHour + i) }}:00
            </span>
          </div>

          <!-- Events -->
          <div
            v-for="ev in day.events" :key="ev.id"
            class="absolute left-1.5 right-1.5 rounded-lg px-2 py-1.5 text-white cursor-pointer overflow-hidden"
            :class="ev.tentative ? 'tentative' : ''"
            :style="{
              top:        `${evTop(ev)}px`,
              height:     `${evHeight(ev)}px`,
              background: EVENT_TYPES[ev.type].fill,
            }"
            @click="emit('open', ev, $event.currentTarget as HTMLElement)"
          >
            <div class="text-[11.5px] font-semibold truncate">{{ ev.title }}</div>
            <div class="text-[10.5px] opacity-85 tabular-nums">{{ fmtRange(ev.start, ev.end) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.today-date { color: oklch(0.55 0.2 25); }
.weekend-col { background: oklch(0.985 0.003 240); }
.tentative::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background-image: repeating-linear-gradient(
    135deg,
    transparent 0, transparent 6px,
    oklch(1 0 0 / 0.12) 6px, oklch(1 0 0 / 0.12) 12px
  );
  pointer-events: none;
}
</style>
