<script setup lang="ts">
import type { CalEvent } from './types'
import { DAY_NAMES, WEEK_DAYS, HOUR_H, DAY_COUNT, MIN_SNAP, MIN_DURATION } from './constants'
import { getDayEvents, toHours, snapMins, pad, todayDayIndex } from './utils'

const props = defineProps<{
  events: CalEvent[]
  weekStart: Date
  today: Date
}>()

const emit = defineEmits<{
  open:   [event: CalEvent, el: HTMLElement]
  update: [event: CalEvent]
  create: [draft: { start: Date; end: Date }]
}>()

// Auto-fit time range based on events
const timeRange = computed(() => {
  if (!props.events.length) return { startHour: 18, endHour: 24 }
  let minH = 24, maxH = 0
  props.events.forEach(e => {
    minH = Math.min(minH, toHours(e.start))
    maxH = Math.max(maxH, toHours(e.end, e.start))
  })
  return {
    startHour: Math.max(0, Math.floor(minH - 1)),
    endHour:   Math.ceil(maxH + 1),
  }
})

const hours      = computed(() => Array.from({ length: timeRange.value.endHour - timeRange.value.startHour + 1 }, (_, i) => timeRange.value.startHour + i))
const totalHours = computed(() => timeRange.value.endHour - timeRange.value.startHour)
const todayIdx   = computed(() => todayDayIndex(props.weekStart, props.today))

const nowLineTop = computed(() => {
  const h = toHours(props.today)
  if (h < timeRange.value.startHour || h > timeRange.value.endHour) return null
  return (h - timeRange.value.startHour) * HOUR_H
})

// Day header data
const dayHeaders = computed(() =>
  WEEK_DAYS.map(i => {
    const d = new Date(props.weekStart)
    d.setDate(d.getDate() + i)
    return { dayIdx: i, date: d.getDate(), isToday: i === todayIdx.value }
  })
)

// Column element refs for EventBlock drag
const colRefs = ref<(HTMLElement | null)[]>(Array(DAY_COUNT).fill(null))

// Ghost new-event slot
const ghost = ref<{ dayIdx: number; startMin: number; endMin: number } | null>(null)

function timeAtY(y: number, rect: DOMRect): number {
  const mins = Math.max(0, (y - rect.top) / (HOUR_H / 60))
  return snapMins(timeRange.value.startHour * 60 + mins, MIN_SNAP)
}

function handleColMouseDown(dayIdx: number, ev: MouseEvent) {
  if ((ev.target as HTMLElement).closest('.event-block')) return
  const col = colRefs.value[dayIdx]
  if (!col) return
  const mins = timeAtY(ev.clientY, col.getBoundingClientRect())
  ghost.value = { dayIdx, startMin: mins, endMin: mins + 60 }

  const onMove = (e: MouseEvent) => {
    const rect = colRefs.value[ghost.value!.dayIdx]?.getBoundingClientRect()
    if (!rect) return
    const m = timeAtY(e.clientY, rect)
    if (m > ghost.value!.startMin) ghost.value = { ...ghost.value!, endMin: m }
  }
  const onUp = () => {
    if (ghost.value) {
      const { dayIdx: di, startMin, endMin } = ghost.value
      const start = new Date(props.weekStart)
      start.setDate(start.getDate() + di)
      start.setHours(Math.floor(startMin / 60), startMin % 60, 0, 0)
      const end = new Date(start)
      const dur = endMin - startMin
      dur >= MIN_DURATION
        ? end.setMinutes(end.getMinutes() + dur)
        : end.setHours(end.getHours() + 1)
      emit('create', { start, end })
      ghost.value = null
    }
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
  }
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
}

function ghostStyle(dayIdx: number) {
  if (!ghost.value || ghost.value.dayIdx !== dayIdx) return null
  const { startMin, endMin } = ghost.value
  return {
    top:    `${(startMin - timeRange.value.startHour * 60) / 60 * HOUR_H}px`,
    height: `${Math.max(24, (endMin - startMin) / 60 * HOUR_H)}px`,
  }
}

function ghostLabel() {
  if (!ghost.value) return ''
  const { startMin, endMin } = ghost.value
  return `New · ${pad(Math.floor(startMin / 60))}:${pad(startMin % 60)}–${pad(Math.floor(endMin / 60))}:${pad(endMin % 60)}`
}

function dayEventCount(dayIdx: number) {
  const n = getDayEvents(props.events, props.weekStart, dayIdx).length
  return n ? `${n} event${n > 1 ? 's' : ''}` : '—'
}
</script>

<template>
  <div class="rounded-xl border border-zinc-200 bg-white overflow-hidden">
    <!-- Header row -->
    <div
      class="grid border-b border-zinc-200 bg-white sticky top-0 z-10"
      :style="{ gridTemplateColumns: `56px repeat(${DAY_COUNT}, 1fr)` }"
    >
      <div class="border-r border-zinc-200" />
      <div
        v-for="{ dayIdx, date, isToday } in dayHeaders"
        :key="dayIdx"
        class="px-3 py-2.5 border-r border-zinc-200 last:border-r-0 flex flex-col gap-0.5"
      >
        <span class="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          {{ DAY_NAMES[dayIdx] }}
        </span>
        <span class="text-lg font-semibold leading-none" :class="isToday ? 'today-date' : 'text-zinc-800'">
          {{ date }}
        </span>
        <span v-if="isToday" class="today-pill text-[10.5px] font-bold self-start mt-0.5 px-1.5 py-0.5 rounded">
          Today
        </span>
        <span v-else class="text-[11px] text-zinc-400 mt-0.5">{{ dayEventCount(dayIdx) }}</span>
      </div>
    </div>

    <!-- Body -->
    <div
      class="grid relative"
      :style="{ gridTemplateColumns: `56px repeat(${DAY_COUNT}, 1fr)`, height: `${totalHours * HOUR_H}px` }"
    >
      <!-- Time gutter -->
      <div class="border-r border-zinc-200 relative">
        <div
          v-for="(h, i) in hours" :key="h"
          class="absolute right-0 pr-2 text-[11px] text-zinc-400 tabular-nums text-right"
          :style="{ top: `${i * HOUR_H - 7}px` }"
        >{{ pad(h % 24) }}:00</div>
      </div>

      <!-- Day columns -->
      <div
        v-for="dayIdx in WEEK_DAYS" :key="dayIdx"
        :ref="(el) => { if (el) colRefs[dayIdx] = el as HTMLElement }"
        class="relative border-r border-zinc-200 last:border-r-0 select-none"
        :class="{
          'today-col': dayIdx === todayIdx,
          'weekend-col': dayIdx >= 5,
        }"
        @mousedown="handleColMouseDown(dayIdx, $event)"
      >
        <!-- Hour / half-hour lines -->
        <template v-for="(_, i) in hours" :key="i">
          <div class="absolute inset-x-0 border-t border-zinc-100 pointer-events-none" :style="{ top: `${i * HOUR_H}px` }" />
          <div class="absolute inset-x-0 border-t border-dashed border-zinc-50 pointer-events-none" :style="{ top: `${i * HOUR_H + HOUR_H / 2}px` }" />
        </template>

        <!-- Now indicator -->
        <div
          v-if="dayIdx === todayIdx && nowLineTop !== null"
          class="now-line absolute inset-x-0 pointer-events-none z-[3]"
          :style="{ top: `${nowLineTop}px` }"
        />

        <!-- Events -->
        <ScheduleBlock
          v-for="ev in getDayEvents(events, weekStart, dayIdx)"
          :key="ev.id"
          :event="ev"
          :start-hour="timeRange.startHour"
          :hour-h="HOUR_H"
          :col-refs="colRefs"
          :week-start="weekStart"
          :day-count="DAY_COUNT"
@open="(e, el) => emit('open', e, el)"
          @update="ev => emit('update', ev)"
        />

        <!-- Ghost slot -->
        <div
          v-if="ghost?.dayIdx === dayIdx"
          class="ghost absolute left-1 right-1 rounded-xl pointer-events-none z-[4] text-[11px] text-zinc-400 font-medium px-2 py-1.5"
          :style="ghostStyle(dayIdx)!"
        >{{ ghostLabel() }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.today-date { color: oklch(0.55 0.2 25); }
.today-pill { background: oklch(0.6 0.22 25); color: white; }
.today-col  { background: linear-gradient(180deg, oklch(0.98 0.015 25 / 0.5), oklch(0.99 0.005 25 / 0.25)); }
.weekend-col { background: oklch(0.985 0.003 240); }
.now-line {
  height: 0;
  border-top: 2px solid oklch(0.6 0.22 25);
}
.now-line::before {
  content: '';
  position: absolute;
  left: -5px; top: -5px;
  width: 10px; height: 10px;
  border-radius: 50%;
  background: oklch(0.6 0.22 25);
  box-shadow: 0 0 0 3px oklch(0.6 0.22 25 / 0.2);
}
.ghost {
  background: oklch(0.85 0.02 240 / 0.4);
  border: 1.5px dashed oklch(0.55 0.01 240);
}
</style>
