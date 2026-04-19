<script setup lang="ts">
import type { CalEvent } from './types'
import { EVENT_TYPES, DAY_NAMES, DAY_LONG, MONTHS, WEEK_DAYS } from './constants'
import { getDayEvents, fmtRange, todayDayIndex } from './utils'

const props = defineProps<{
  events:    CalEvent[]
  weekStart: Date
  today:     Date
}>()

const emit = defineEmits<{
  open: [event: CalEvent, el: HTMLElement]
}>()

const todayIdx = computed(() => todayDayIndex(props.weekStart, props.today))

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
      events: getDayEvents(props.events, props.weekStart, i).sort((a, b) => a.start.getTime() - b.start.getTime()),
    }
  })
)
</script>

<template>
  <div class="rounded-xl border border-zinc-200 bg-white overflow-hidden">
    <div
      v-for="day in days"
      :key="day.dayIdx"
      class="grid border-b border-zinc-200 last:border-b-0 min-h-[84px]"
      style="grid-template-columns: 160px 1fr"
      :class="{ 'today-row': day.isToday, 'weekend-row': day.isWeekend && !day.isToday }"
    >
      <!-- Day label -->
      <div class="px-4 py-4 border-r border-zinc-200">
        <div class="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">{{ DAY_NAMES[day.dayIdx] }}</div>
        <div class="text-2xl font-bold tracking-tight leading-none mt-0.5" :class="day.isToday ? 'today-date' : 'text-zinc-800'">
          {{ day.date }}
        </div>
        <div class="text-[11px] text-zinc-400 mt-1">{{ day.month }}</div>
        <span v-if="day.isToday" class="inline-block mt-1 text-[10.5px] font-bold today-pill px-1.5 py-0.5 rounded">Today</span>
      </div>

      <!-- Events -->
      <div class="p-3 flex flex-wrap gap-2 content-start">
        <div
          v-if="!day.events.length"
          class="text-[12.5px] italic text-zinc-400 self-center px-1 py-3"
        >No sessions — rest day</div>

        <div
          v-for="ev in day.events"
          :key="ev.id"
          class="agenda-chip relative min-w-[180px] max-w-[260px] rounded-[10px] px-2.5 py-2 text-white cursor-pointer"
          :class="ev.tentative ? 'tentative' : ''"
          :style="{ '--fill': EVENT_TYPES[ev.type].fill, background: EVENT_TYPES[ev.type].fill }"
          @click="emit('open', ev, $event.currentTarget as HTMLElement)"
        >
          <div class="text-[12.5px] font-semibold">{{ ev.title }}</div>
          <div class="text-[11px] opacity-85 tabular-nums">{{ fmtRange(ev.start, ev.end) }} · {{ EVENT_TYPES[ev.type].label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.today-date { color: oklch(0.55 0.2 25); }
.today-pill { background: oklch(0.6 0.22 25); color: white; }
.today-row  { background: oklch(0.99 0.012 25 / 0.5); }
.weekend-row { background: oklch(0.985 0.003 240); }
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
