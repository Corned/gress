<script setup lang="ts">
import type { CalEvent, EventType, RsvpStatus } from './types'
import { EVENT_TYPES, DAY_LONG, MONTHS } from './constants'
import { fmtTime, pad } from './utils'

const props = defineProps<{
  event:      CalEvent
  anchorRect: DOMRect
}>()

const emit = defineEmits<{
  close:  []
  update: [event: CalEvent]
  delete: [id: string]
}>()

const popRef = ref<HTMLElement>()
const pos    = ref({ top: 0, left: 0 })

onMounted(() => positionPop())
watch(() => props.anchorRect, positionPop)

function positionPop() {
  nextTick(() => {
    const popW = 320
    const popH = popRef.value?.offsetHeight ?? 400
    const { right, left, top } = props.anchorRect
    const margin = 8
    let l = right + margin
    let t = top + window.scrollY
    if (l + popW > window.innerWidth - 16) l = left - popW - margin
    if (l < 16) l = 16
    if (t + popH > window.innerHeight - 16 + window.scrollY) t = Math.max(16, window.innerHeight - popH - 16 + window.scrollY)
    pos.value = { top: t, left: l }
  })
}

// Close on Escape (when not in an input)
function onKeyDown(ev: KeyboardEvent) {
  if (ev.key === 'Escape' && !(document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement))
    emit('close')
}
onMounted(() => window.addEventListener('keydown', onKeyDown))
onUnmounted(() => window.removeEventListener('keydown', onKeyDown))

// Editing helpers
function set<K extends keyof CalEvent>(key: K, value: CalEvent[K]) {
  emit('update', { ...props.event, [key]: value })
}

function setStart(d: Date) {
  const dur = props.event.end.getTime() - props.event.start.getTime()
  emit('update', { ...props.event, start: d, end: new Date(d.getTime() + dur) })
}

function setEnd(d: Date) {
  if (d.getTime() - props.event.start.getTime() < 15 * 60000) return
  emit('update', { ...props.event, end: d })
}

function setRsvp(pid: string, status: RsvpStatus) {
  const cur = props.event.rsvps?.[pid]
  const next = cur === status ? null : status
  const rsvps = { ...(props.event.rsvps ?? {}) }
  if (next == null) delete rsvps[pid]; else rsvps[pid] = next
  emit('update', { ...props.event, rsvps })
}

// Type picker state
const typeOpen = ref(false)
const popEl    = ref<HTMLElement>()

function clickOutsideType(ev: MouseEvent) {
  if (typeOpen.value && !popEl.value?.contains(ev.target as Node)) typeOpen.value = false
}
onMounted(() => document.addEventListener('click', clickOutsideType))
onUnmounted(() => document.removeEventListener('click', clickOutsideType))

// Inline editing state per field
const editing = reactive<Record<string, boolean>>({})
const drafts  = reactive<Record<string, string>>({})

function startEdit(field: string, initial: string) {
  drafts[field]  = initial
  editing[field] = true
  nextTick(() => {
    const el = document.getElementById(`ef-${field}`)
    if (el) { (el as HTMLInputElement).focus(); (el as HTMLInputElement).select?.() }
  })
}

function commitEdit(field: string, transform?: (v: string) => unknown) {
  editing[field] = false
  const raw = drafts[field]?.trim() ?? ''
  const val = transform ? transform(raw) : (raw || null)
  emit('update', { ...props.event, [field]: val } as CalEvent)
}

function cancelEdit(field: string, original: string) {
  editing[field]  = false
  drafts[field]   = original
}

function parseTime(raw: string, base: Date): Date | null {
  const m = raw.trim().match(/^(\d{1,2})[:.]?(\d{2})?$/)
  if (!m) return null
  const h = Math.max(0, Math.min(23, parseInt(m[1])))
  const min = m[2] ? Math.max(0, Math.min(59, parseInt(m[2]))) : 0
  const d = new Date(base)
  d.setHours(h, min, 0, 0)
  return d
}

// Display helpers
const dateStr = computed(() => {
  const dow = (props.event.start.getDay() + 6) % 7
  return `${DAY_LONG[dow]}, ${MONTHS[props.event.start.getMonth()]} ${props.event.start.getDate()}`
})

const rsvpCounts = computed(() => {
  const counts = { yes: 0, maybe: 0, no: 0 }
  Object.values(props.event.rsvps ?? {}).forEach(s => { if (s in counts) counts[s as RsvpStatus]++ })
  return counts
})

const typeConfig = computed(() => EVENT_TYPES[props.event.type])

const RSVP_OPTIONS: Record<RsvpStatus, string> = { yes: 'In', maybe: '?', no: 'Out' }

function rsvpActiveStyle(status: RsvpStatus): Record<string, string> {
  const bg = status === 'yes' ? 'oklch(0.55 0.16 145)' : status === 'maybe' ? 'oklch(0.65 0.14 70)' : 'oklch(0.55 0.2 25)'
  return { background: bg, color: 'white' }
}
</script>

<template>
  <div class="fixed inset-0 z-[50]" @click="emit('close')" />
  <div
    ref="popRef"
    class="absolute z-[51] w-80 bg-white rounded-xl border border-zinc-300 text-[13px] text-zinc-800"
    style="box-shadow: 0 16px 40px -8px oklch(0 0 0 / 0.18), 0 2px 6px oklch(0 0 0 / 0.06); padding: 16px;"
    :style="{ top: `${pos.top}px`, left: `${pos.left}px` }"
    @click.stop
  >
    <!-- Header -->
    <div class="flex items-start gap-2.5 mb-2.5">
      <div class="flex-1 min-w-0">
        <!-- Title -->
        <div class="flex items-center gap-2 mb-1">
          <span class="w-2.5 h-2.5 rounded-sm flex-shrink-0" :style="{ background: typeConfig.fill }" />
          <input
            v-if="editing.title"
            id="ef-title"
            v-model="drafts.title"
            class="flex-1 text-[15px] font-bold bg-white border border-zinc-300 rounded px-1 outline-none"
            style="box-shadow: 0 0 0 2px oklch(0.6 0.2 25 / 0.15);"
            @blur="commitEdit('title')"
            @keydown.enter="commitEdit('title')"
            @keydown.escape="cancelEdit('title', event.title)"
          />
          <span
            v-else
            class="text-[15px] font-bold truncate cursor-text rounded px-1 -mx-1 hover:bg-zinc-50"
            @click="startEdit('title', event.title)"
          >{{ event.title }}</span>
        </div>

        <!-- Sub controls: type · tentative · recurrence -->
        <div class="flex items-center gap-1 text-[12px] text-zinc-500 flex-wrap">
          <!-- Type picker -->
          <div class="relative" ref="popEl">
            <span
              class="inline-flex items-center gap-1 cursor-pointer rounded px-1 py-0.5 hover:bg-zinc-100"
              @click="typeOpen = !typeOpen"
            >
              <span class="w-2 h-2 rounded-sm" :style="{ background: typeConfig.fill }" />
              {{ typeConfig.label }}
            </span>
            <div
              v-if="typeOpen"
              class="absolute top-full left-0 mt-1 z-[60] bg-white border border-zinc-200 rounded-lg shadow-lg p-1 min-w-[140px] flex flex-col gap-0.5"
            >
              <button
                v-for="(t, k) in EVENT_TYPES" :key="k"
                class="flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] text-zinc-800 hover:bg-zinc-50 w-full text-left"
                :class="event.type === k ? 'bg-zinc-50 font-semibold' : ''"
                @click="set('type', k as EventType); typeOpen = false"
              >
                <span class="w-2 h-2 rounded-sm" :style="{ background: t.fill }" />
                {{ t.label }}
              </button>
            </div>
          </div>

          <span class="text-zinc-300">·</span>

          <span
            class="cursor-pointer rounded px-1 py-0.5 hover:bg-zinc-100"
            @click="set('tentative', !event.tentative)"
          >{{ event.tentative ? 'Tentative' : 'Confirmed' }}</span>

          <span class="text-zinc-300">·</span>

          <span
            class="cursor-pointer rounded px-1 py-0.5 hover:bg-zinc-100"
            @click="set('recurrence', event.recurrence === 'weekly' ? undefined : 'weekly')"
          >{{ event.recurrence === 'weekly' ? 'Repeats weekly' : 'One-time' }}</span>
        </div>
      </div>

      <button class="text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded p-1 flex-shrink-0" @click="emit('close')">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>

    <!-- Time & details section -->
    <div class="border-t border-zinc-100 pt-2.5 pb-1 space-y-1.5">
      <!-- Date & time -->
      <div class="flex items-center gap-2 text-zinc-600">
        <svg class="text-zinc-400 flex-shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span>{{ dateStr }} ·&nbsp;</span>
        <!-- Start time -->
        <input
          v-if="editing.startTime"
          id="ef-startTime"
          v-model="drafts.startTime"
          class="w-12 text-center border border-zinc-300 rounded px-1 outline-none tabular-nums"
          style="box-shadow: 0 0 0 2px oklch(0.6 0.2 25 / 0.15);"
          @blur="() => { const d = parseTime(drafts.startTime, event.start); if (d) setStart(d); editing.startTime = false }"
          @keydown.enter="() => { const d = parseTime(drafts.startTime, event.start); if (d) setStart(d); editing.startTime = false }"
          @keydown.escape="cancelEdit('startTime', fmtTime(event.start))"
        />
        <span
          v-else
          class="cursor-text rounded px-0.5 hover:bg-zinc-100 tabular-nums"
          @click="startEdit('startTime', fmtTime(event.start))"
        >{{ fmtTime(event.start) }}</span>
        <span>–</span>
        <!-- End time -->
        <input
          v-if="editing.endTime"
          id="ef-endTime"
          v-model="drafts.endTime"
          class="w-12 text-center border border-zinc-300 rounded px-1 outline-none tabular-nums"
          style="box-shadow: 0 0 0 2px oklch(0.6 0.2 25 / 0.15);"
          @blur="() => { const d = parseTime(drafts.endTime, event.end); if (d) setEnd(d); editing.endTime = false }"
          @keydown.enter="() => { const d = parseTime(drafts.endTime, event.end); if (d) setEnd(d); editing.endTime = false }"
          @keydown.escape="cancelEdit('endTime', fmtTime(event.end))"
        />
        <span
          v-else
          class="cursor-text rounded px-0.5 hover:bg-zinc-100 tabular-nums"
          @click="startEdit('endTime', fmtTime(event.end))"
        >{{ fmtTime(event.end) }}</span>
      </div>

      <!-- Opponent -->
      <div class="flex items-center gap-2 text-zinc-600">
        <svg class="text-zinc-400 flex-shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="2" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        <span class="text-zinc-400">vs&nbsp;</span>
        <input
          v-if="editing.opponent"
          id="ef-opponent"
          v-model="drafts.opponent"
          placeholder="opponent"
          class="flex-1 border border-zinc-300 rounded px-1 outline-none"
          style="box-shadow: 0 0 0 2px oklch(0.6 0.2 25 / 0.15);"
          @blur="commitEdit('opponent')"
          @keydown.enter="commitEdit('opponent')"
          @keydown.escape="cancelEdit('opponent', event.opponent ?? '')"
        />
        <span
          v-else
          class="cursor-text rounded px-0.5 hover:bg-zinc-100"
          :class="event.opponent ? 'font-semibold' : 'italic text-zinc-400'"
          @click="startEdit('opponent', event.opponent ?? '')"
        >{{ event.opponent || 'add opponent' }}</span>
      </div>

      <!-- Notes -->
      <div class="flex items-start gap-2 text-zinc-600">
        <svg class="text-zinc-400 flex-shrink-0 mt-0.5" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        <textarea
          v-if="editing.notes"
          id="ef-notes"
          v-model="drafts.notes"
          rows="3"
          placeholder="add notes…"
          class="flex-1 border border-zinc-300 rounded px-1.5 py-1 outline-none resize-none text-[13px] font-[inherit]"
          style="box-shadow: 0 0 0 2px oklch(0.6 0.2 25 / 0.15);"
          @blur="commitEdit('notes')"
          @keydown.ctrl.enter="commitEdit('notes')"
          @keydown.meta.enter="commitEdit('notes')"
          @keydown.escape="cancelEdit('notes', event.notes ?? '')"
        />
        <span
          v-else
          class="cursor-text rounded px-0.5 hover:bg-zinc-100 flex-1"
          :class="event.notes ? 'text-zinc-500' : 'italic text-zinc-400'"
          @click="startEdit('notes', event.notes ?? '')"
        >{{ event.notes || 'add notes…' }}</span>
      </div>
    </div>

    <!-- Attendance section -->
    <div v-if="event.roster?.length" class="border-t border-zinc-100 pt-2.5 pb-1">
      <div class="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">
        Attendance
        <span class="normal-case tracking-normal font-semibold ml-1" style="color: oklch(0.55 0.16 145)">{{ rsvpCounts.yes }} in</span>
        <span v-if="rsvpCounts.maybe" class="normal-case tracking-normal font-normal ml-1" style="color: oklch(0.65 0.14 70)">· {{ rsvpCounts.maybe }}?</span>
        <span v-if="rsvpCounts.no" class="normal-case tracking-normal font-normal ml-1" style="color: oklch(0.55 0.2 25)">· {{ rsvpCounts.no }} out</span>
      </div>
      <div class="space-y-1.5">
        <div v-for="p in event.roster" :key="p.id" class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center text-[11px] font-bold text-zinc-600 flex-shrink-0">
            {{ p.initials }}
          </div>
          <span class="flex-1 text-[13px]">{{ p.name }}</span>
          <span class="text-[11px] uppercase font-semibold text-zinc-400 tracking-wide mr-1">{{ p.role }}</span>
          <div class="flex border border-zinc-200 rounded-md overflow-hidden">
            <button
              v-for="(label, status) in RSVP_OPTIONS" :key="status"
              class="px-2 py-0.5 text-[11px] border-r border-zinc-200 last:border-r-0"
              :style="event.rsvps?.[p.id] === status ? rsvpActiveStyle(status) : { color: 'oklch(0.55 0.01 240)' }"
              @click="setRsvp(p.id, status)"
            >{{ label }}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="border-t border-zinc-100 pt-2.5">
      <button
        class="flex items-center gap-1.5 w-full justify-center px-3 py-1.5 rounded-lg border text-[12.5px] font-medium"
        style="color: oklch(0.55 0.2 25); border-color: oklch(0.85 0.05 25);"
        @click="emit('delete', event.id); emit('close')"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
        Delete event
      </button>
    </div>
  </div>
</template>
