<script setup lang="ts">
import type { Team } from '~/composables/useTeams'
import type { CalEvent, EventType, ViewLayout } from './types'
import { EVENT_TYPES, DAY_IDX, TYPE_MAP } from './constants'
import { getWeekStart, getWeekLabel } from './utils'

const props = defineProps<{ teams: Team[] }>()

const weekOffset = ref(0)
const weekStart = computed(() => getWeekStart(weekOffset.value))
const today = ref(new Date())
const layout = ref<ViewLayout>('week')

let clockInterval: ReturnType<typeof setInterval>
onMounted(() => { clockInterval = setInterval(() => { today.value = new Date() }, 60_000) })
onUnmounted(() => clearInterval(clockInterval))

function buildEvents(ws: Date): CalEvent[] {
  return props.teams.flatMap(team => {
    const roster = team.roster.map(p => ({
      id: p.name.toLowerCase().replace(/\s+/g, '-'),
      name: p.name,
      role: p.role.toLowerCase(),
      initials: p.name.slice(0, 2).toUpperCase(),
    }))
    return team.schedule.map(ev => {
      const dayIdx = DAY_IDX[ev.day] ?? 0
      const start = new Date(ws)
      start.setDate(start.getDate() + dayIdx)
      const [sh, sm = 0] = ev.timeStart.split(':').map(Number)
      start.setHours(sh, sm, 0, 0)
      const end = new Date(start)
      const [eh, em = 0] = ev.timeEnd.split(':').map(Number)
      end.setHours(eh, em, 0, 0)
      const type = (TYPE_MAP[ev.type] ?? 'scrim') as EventType
      return {
        id: `${team.id}-${ev.day}-${ev.timeStart}`,
        start, end, type,
        title: type === 'scrim' ? 'Scrim' : type === 'coaching' ? 'Coaching' : 'Match',
        opponent: ev.opponent,
        recurrence: 'weekly' as const,
        rsvps: {},
        roster,
      } satisfies CalEvent
    })
  })
}

const events = ref<CalEvent[]>(buildEvents(weekStart.value))
watch(weekStart, ws => { events.value = buildEvents(ws) })

const openEvent = ref<{ event: CalEvent; rect: DOMRect } | null>(null)
const createDraft = ref<{ start: Date; end: Date } | null>(null)

function updateEvent(ev: CalEvent) {
  const i = events.value.findIndex(e => e.id === ev.id)
  if (i >= 0) events.value[i] = ev
  if (openEvent.value?.event.id === ev.id) openEvent.value = { ...openEvent.value, event: ev }
}

function deleteEvent(id: string) {
  events.value = events.value.filter(e => e.id !== id)
  if (openEvent.value?.event.id === id) openEvent.value = null
}

function confirmCreate(spec: { title: string; type: EventType; start: Date; end: Date }) {
  events.value = [...events.value, {
    id: crypto.randomUUID(),
    start: spec.start, end: spec.end,
    type: spec.type, title: spec.title,
    rsvps: {},
  }]
  createDraft.value = null
}

const weekLabel = computed(() => getWeekLabel(weekStart.value))
const year = computed(() => weekStart.value.getFullYear())

const VIEWS: ViewLayout[] = ['week', 'agenda']
</script>

<template>
  <div>
    <!-- Toolbar -->
    <div class="flex items-center justify-between flex-wrap gap-y-2.5 pb-3 border-b border-zinc-200 mb-4">
      <div class="flex items-center gap-3 flex-wrap">
        <div class="flex items-center gap-1.5">
          <button
            class="w-7 h-7 flex items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-400 hover:bg-zinc-50 hover:text-zinc-600"
            @click="weekOffset--">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
              stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            class="px-2.5 py-1 border border-zinc-200 bg-white rounded-md text-xs font-medium text-zinc-700 hover:bg-zinc-50"
            @click="weekOffset = 0">
            Today
          </button>
          <button
            class="w-7 h-7 flex items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-400 hover:bg-zinc-50 hover:text-zinc-600"
            @click="weekOffset++">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
              stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
          <span class="text-sm font-semibold text-zinc-900 ml-1">
            {{ weekLabel }}<span class="text-xs font-normal text-zinc-400 ml-1.5">{{ year }}</span>
          </span>
        </div>
      </div>

      <div class="flex items-center gap-3 flex-wrap">
        <div class="flex items-center gap-3 text-xs text-zinc-500">
          <span v-for="(t, k) in EVENT_TYPES" :key="k" class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-sm flex-shrink-0" :style="{ background: t.fill }" />
            {{ t.label }}
          </span>
        </div>
        <div class="flex border border-zinc-200 rounded-lg p-0.5 bg-white">
          <button v-for="v in VIEWS" :key="v"
            class="px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-colors"
            :class="layout === v ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'"
            @click="layout = v">{{ v }}</button>
        </div>
      </div>
    </div>

    <!-- Views -->
    <ScheduleWeekGrid v-if="layout === 'week'" :events="events" :week-start="weekStart" :today="today"
      @open="(ev, el) => openEvent = { event: ev, rect: el.getBoundingClientRect() }" @update="updateEvent"
      @create="d => createDraft = d" />
    <ScheduleAgendaView v-else :events="events" :week-start="weekStart" :today="today"
      @open="(ev, el) => openEvent = { event: ev, rect: el.getBoundingClientRect() }" />

    <Teleport to="body">
      <ScheduleEventPopover v-if="openEvent" :event="openEvent.event" :anchor-rect="openEvent.rect"
        @close="openEvent = null" @update="updateEvent" @delete="deleteEvent" />
      <ScheduleCreatePopover v-if="createDraft" :draft="createDraft" @close="createDraft = null"
        @confirm="confirmCreate" />
    </Teleport>
  </div>
</template>
