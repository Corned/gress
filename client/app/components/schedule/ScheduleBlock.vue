<script setup lang="ts">
import type { CalEvent } from './types'
import { EVENT_TYPES, MIN_SNAP, MIN_DURATION } from './constants'
import { toHours, snapMins, fmtRange } from './utils'

const props = defineProps<{
  event:     CalEvent
  startHour: number
  hourH:     number
  colRefs:   (HTMLElement | null)[]
  weekStart: Date
  dayCount:  number
}>()

const emit = defineEmits<{
  open:   [event: CalEvent, el: HTMLElement]
  update: [event: CalEvent]
}>()

const blockEl = ref<HTMLElement>()

// Pixel position
const topPx    = computed(() => (toHours(props.event.start) - props.startHour) * props.hourH)
const heightPx = computed(() => Math.max(20, (toHours(props.event.end, props.event.start) - toHours(props.event.start)) * props.hourH))
const compact  = computed(() => heightPx.value < 48)
const tiny     = computed(() => heightPx.value < 32)

// Type config
const typeConfig = computed(() => EVENT_TYPES[props.event.type])

// Drag state
type DragMode = 'move' | 'resize-top' | 'resize-bottom'
const drag = ref<{
  mode: DragMode
  startY: number
  startX: number
  origStart: Date
  origEnd: Date
  dayIdx: number
} | null>(null)

function startDrag(mode: DragMode) {
  return (ev: MouseEvent) => {
    ev.stopPropagation()
    ev.preventDefault()
    const ws = props.weekStart
    const mondayOffset = Math.floor((props.event.start.getTime() - ws.getTime()) / 86400000)
    drag.value = {
      mode,
      startY: ev.clientY,
      startX: ev.clientX,
      origStart: new Date(props.event.start),
      origEnd:   new Date(props.event.end),
      dayIdx: Math.max(0, Math.min(props.dayCount - 1, mondayOffset)),
    }

    const onMove = (e: MouseEvent) => {
      if (!drag.value) return
      const dy = e.clientY - drag.value.startY
      const dMin = snapMins(Math.round((dy / props.hourH) * 60), MIN_SNAP)

      if (drag.value.mode === 'move') {
        let newDayIdx = drag.value.dayIdx
        for (let i = 0; i < props.dayCount; i++) {
          const rect = props.colRefs[i]?.getBoundingClientRect()
          if (rect && e.clientX >= rect.left && e.clientX <= rect.right) { newDayIdx = i; break }
        }
        const newStart = new Date(props.weekStart)
        newStart.setDate(newStart.getDate() + newDayIdx)
        newStart.setHours(drag.value.origStart.getHours(), drag.value.origStart.getMinutes() + dMin, 0, 0)
        const dur = drag.value.origEnd.getTime() - drag.value.origStart.getTime()
        const midnight = new Date(newStart); midnight.setDate(midnight.getDate() + 1); midnight.setHours(0, 0, 0, 0)
        const clampedEnd = new Date(newStart.getTime() + dur)
        if (clampedEnd > midnight) newStart.setTime(midnight.getTime() - dur)
        emit('update', { ...props.event, start: newStart, end: new Date(newStart.getTime() + dur) })

      } else if (drag.value.mode === 'resize-bottom') {
        const newEnd = new Date(drag.value.origEnd)
        newEnd.setMinutes(drag.value.origEnd.getMinutes() + dMin)
        const midnight = new Date(props.event.start); midnight.setDate(midnight.getDate() + 1); midnight.setHours(0, 0, 0, 0)
        if (newEnd > midnight) newEnd.setTime(midnight.getTime())
        if (newEnd.getTime() - props.event.start.getTime() >= MIN_DURATION * 60000)
          emit('update', { ...props.event, end: newEnd })

      } else {
        const newStart = new Date(drag.value.origStart)
        newStart.setMinutes(drag.value.origStart.getMinutes() + dMin)
        if (props.event.end.getTime() - newStart.getTime() >= MIN_DURATION * 60000)
          emit('update', { ...props.event, start: newStart })
      }
    }

    const onUp = () => {
      drag.value = null
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }
}

function handleClick(ev: MouseEvent) {
  ev.stopPropagation()
  if (!drag.value && blockEl.value) emit('open', props.event, blockEl.value)
}

const rsvpYes   = computed(() => Object.values(props.event.rsvps ?? {}).filter(s => s === 'yes').length)
const rsvpMaybe = computed(() => Object.values(props.event.rsvps ?? {}).filter(s => s === 'maybe').length)
const rsvpNo    = computed(() => Object.values(props.event.rsvps ?? {}).filter(s => s === 'no').length)
const hasRsvps  = computed(() => !tiny.value && (rsvpYes.value + rsvpMaybe.value + rsvpNo.value) > 0)
</script>

<template>
  <div
    ref="blockEl"
    class="event-block absolute left-1 right-1 rounded-[10px] px-2.5 py-2 flex flex-col gap-0.5 overflow-hidden z-[2] select-none"
    :class="[
      event.tentative ? 'tentative' : '',
      drag ? 'cursor-grabbing opacity-80 z-[10]' : 'cursor-grab',
    ]"
    :style="{
      top:       `${topPx}px`,
      height:    `${heightPx}px`,
      '--fill':  typeConfig.fill,
      '--ink':   typeConfig.ink,
      background: typeConfig.fill,
      color: 'white',
    }"
    @mousedown="startDrag('move')($event)"
    @click="handleClick"
  >
    <!-- Resize handle top -->
    <div class="resize-top absolute top-0 left-0 right-0 h-1.5 cursor-ns-resize z-[2]" @mousedown.stop="startDrag('resize-top')($event)" />

    <!-- Title row -->
    <div class="flex items-center gap-1.5 text-[12.5px] font-semibold leading-tight min-w-0">
      <span class="truncate">{{ event.title }}</span>
      <svg v-if="event.recurrence === 'weekly'" class="ml-auto flex-shrink-0 opacity-75" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>
        <polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
      </svg>
    </div>

    <!-- Opponent -->
    <div v-if="!tiny && event.opponent" class="text-[11px] opacity-85 truncate">vs {{ event.opponent }}</div>

    <!-- Time -->
    <div v-if="!tiny" class="text-[11px] opacity-85 tabular-nums">{{ fmtRange(event.start, event.end) }}</div>

    <!-- RSVP summary -->
    <div v-if="!compact && hasRsvps" class="text-[11px] opacity-80 mt-auto">
      <span v-if="rsvpYes">{{ rsvpYes }} in</span>
      <span v-if="rsvpMaybe"> · {{ rsvpMaybe }}?</span>
      <span v-if="rsvpNo"> · {{ rsvpNo }} out</span>
    </div>

    <!-- Resize handle bottom -->
    <div class="resize-bottom absolute bottom-0 left-0 right-0 h-1.5 cursor-ns-resize z-[2]" @mousedown.stop="startDrag('resize-bottom')($event)" />
  </div>
</template>

<style scoped>
.event-block {
  transition: box-shadow 0.15s, transform 0.08s;
}
.event-block:hover {
  box-shadow: 0 4px 14px oklch(0 0 0 / 0.12), 0 0 0 2px oklch(1 0 0 / 0.4) inset;
  z-index: 5;
}
.tentative::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    135deg,
    transparent 0, transparent 6px,
    oklch(1 0 0 / 0.12) 6px, oklch(1 0 0 / 0.12) 12px
  );
  pointer-events: none;
  border-radius: inherit;
}
</style>
