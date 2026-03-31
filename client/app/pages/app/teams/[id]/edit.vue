<script setup lang="ts">
import { heroData } from '~/lib/heroData'
import type { RosterPlayer, ScheduledEvent } from '~/composables/useTeams'

const route = useRoute()
const router = useRouter()
const { getTeam, updateTeam } = useTeams()
const team = computed(() => getTeam(route.params.id as string))

const name = ref('')
const rank = ref('')
const roster = ref<RosterPlayer[]>([])
const staff = ref<RosterPlayer[]>([])
const schedule = ref<ScheduledEvent[]>([])

watch(team, (t) => {
  if (!t) return
  name.value = t.name
  rank.value = t.rank
  roster.value = t.roster.map(p => ({ ...p }))
  staff.value = t.staff.map(p => ({ ...p }))
  schedule.value = t.schedule.map(e => ({ ...e }))
}, { immediate: true })

const heroOptions = Object.keys(heroData).sort().map(key => ({
  label: heroData[key as keyof typeof heroData].displayName,
  value: key,
}))

// Roster
const newRosterName = ref('')
const newRosterHero = ref('Ana')
const newRosterRole = computed(() => heroData[newRosterHero.value as keyof typeof heroData]?.role ?? '')

const addRosterPlayer = () => {
  if (!newRosterName.value.trim()) return
  roster.value.push({ name: newRosterName.value.trim(), hero: newRosterHero.value as keyof typeof heroData, role: newRosterRole.value })
  newRosterName.value = ''
  newRosterHero.value = 'Ana'
}

// Staff
const newStaffName = ref('')
const newStaffHero = ref('Ana')
const newStaffRole = computed(() => heroData[newStaffHero.value as keyof typeof heroData]?.role ?? '')

const addStaffMember = () => {
  if (!newStaffName.value.trim()) return
  staff.value.push({ name: newStaffName.value.trim(), hero: newStaffHero.value as keyof typeof heroData, role: newStaffRole.value })
  newStaffName.value = ''
  newStaffHero.value = 'Ana'
}

// Schedule
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const eventTypes = [
  { label: 'Scrim', value: 'scrim' },
  { label: 'Match', value: 'match' },
  { label: 'Coaching', value: 'coaching' },
]

const expandedDay = ref<string | null>(null)
const newEventType = ref<'scrim' | 'match' | 'coaching'>('scrim')
const newEventTimeStart = ref('20:00')
const newEventTimeEnd = ref('22:00')

const openDayForm = (day: string) => {
  expandedDay.value = day
  newEventType.value = 'scrim'
  newEventTimeStart.value = '20:00'
  newEventTimeEnd.value = '22:00'
}

const addEventToDay = (day: string) => {
  if (!newEventTimeStart.value || !newEventTimeEnd.value) return
  schedule.value.push({
    day,
    type: newEventType.value,
    timeStart: newEventTimeStart.value,
    timeEnd: newEventTimeEnd.value,
  })
  expandedDay.value = null
}

const removeEvent = (day: string, index: number) => {
  const dayEvents = schedule.value.filter(e => e.day === day)
  const target = dayEvents[index]
  schedule.value = schedule.value.filter(e => e !== target)
}


const save = () => {
  if (!team.value) return
  updateTeam(team.value.id, {
    name: name.value.trim(),
    rank: rank.value.trim(),
    roster: roster.value,
    staff: staff.value,
    schedule: schedule.value,
  })
  router.back()
}

const roleVariant = (role: string) => ({
  Tank: 'solid',
  Damage: 'subtle',
  Support: 'outline',
}[role] ?? 'outline') as 'solid' | 'subtle' | 'outline'

const typeVariant = (type: 'scrim' | 'match' | 'coaching') => ({
  match: 'solid',
  scrim: 'subtle',
  coaching: 'outline',
}[type]) as 'solid' | 'subtle' | 'outline'
</script>

<template>
  <div v-if="team">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center gap-3">
        <button class="p-1.5 rounded-lg border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-colors cursor-pointer"
          @click="router.back()">
          <UIcon name="i-lucide-arrow-left" class="size-4 text-zinc-500" />
        </button>
        <div>
          <p class="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Editing</p>
          <h1 class="text-2xl font-bold leading-tight">{{ team.name }}</h1>
        </div>
      </div>
      <UButton color="neutral" @click="save">Save Changes</UButton>
    </div>

    <!-- General -->
    <div class="rounded-xl border border-zinc-200 overflow-hidden mb-5">
      <div class="px-5 py-3 border-b border-zinc-100 bg-zinc-50">
        <p class="text-xs font-semibold text-zinc-500 uppercase tracking-wider">General</p>
      </div>
      <div class="px-5 py-4 flex gap-3">
        <div class="flex flex-col gap-1.5 flex-1">
          <label class="text-xs font-medium text-zinc-400">Team Name</label>
          <UInput v-model="name" placeholder="e.g. MRG Garnet" />
        </div>
        <div class="flex flex-col gap-1.5 w-28">
          <label class="text-xs font-medium text-zinc-400">Rank</label>
          <UInput v-model="rank" placeholder="e.g. GM5" />
        </div>
      </div>
    </div>

    <!-- Schedule -->
    <div class="rounded-xl border border-zinc-200 overflow-hidden mb-5">
      <div class="px-5 py-3 border-b border-zinc-100 bg-zinc-50">
        <p class="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Schedule</p>
      </div>

      <!-- Weekly recurring -->
      <div class="px-5 py-4">
        <div class="grid grid-cols-7 gap-1.5">
          <div v-for="day in days" :key="day" class="flex flex-col gap-1">
            <!-- Day label -->
            <p class="text-[11px] font-semibold text-center mb-0.5"
              :class="schedule.some(e => e.day === day) ? 'text-zinc-700' : 'text-zinc-300'">
              {{ day }}
            </p>

            <!-- Existing events -->
            <div
              v-for="(event, idx) in schedule.filter(e => e.day === day).sort((a, b) => a.timeStart.localeCompare(b.timeStart))"
              :key="idx"
              :class="['relative rounded-lg p-1.5 text-center group select-none', event.type === 'match' ? 'bg-zinc-200 text-zinc-600' : event.type === 'scrim' ? 'bg-orange-500 text-white' : 'bg-red-500 text-white']">
              <p class="text-[10px] font-bold capitalize leading-tight">{{ event.type }}</p>
              <p class="text-[10px] opacity-60 tabular-nums leading-tight">{{ event.timeStart }}–{{ event.timeEnd }}</p>
              <button
                class="absolute -top-1 -right-1 size-4 rounded-full bg-zinc-500 text-white opacity-0 group-hover:opacity-100 transition-opacity grid place-items-center cursor-pointer"
                @click="removeEvent(day, idx)">
                <UIcon name="i-lucide-x" class="size-2.5" />
              </button>
            </div>

            <!-- Inline add form -->
            <div v-if="expandedDay === day" class="flex flex-col gap-1">
              <USelect v-model="newEventType" :items="eventTypes" size="xs" />
              <UInput v-model="newEventTimeStart" type="time" step="300" size="xs" />
              <UInput v-model="newEventTimeEnd" type="time" step="300" size="xs" />
              <div class="flex gap-1">
                <UButton size="xs" color="neutral" class="flex-1" @click="addEventToDay(day)">Add</UButton>
                <UButton size="xs" color="neutral" variant="ghost" icon="i-lucide-x" @click="expandedDay = null" />
              </div>
            </div>

            <!-- Add button -->
            <button v-else
              class="rounded-lg py-2.5 border border-dashed border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-colors grid place-items-center cursor-pointer"
              @click="openDayForm(day)">
              <UIcon name="i-lucide-plus" class="size-3 text-zinc-300" />
            </button>
          </div>
        </div>
      </div>

    </div>

    <!-- Roster + Staff -->
    <div class="flex flex-col gap-5 mb-5 pb-12">
      <!-- Roster -->
      <div class="rounded-xl border border-zinc-200 overflow-hidden">
        <div class="px-5 py-3 border-b border-zinc-100 bg-zinc-50">
          <p class="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Roster</p>
        </div>
        <div class="divide-y divide-zinc-100">
          <div v-if="!roster.length" class="px-5 py-4 text-sm text-zinc-400">No players yet.</div>
          <div v-for="(player, i) in roster" :key="i" class="flex items-center gap-3 px-5 py-3">
            <img :src="heroData[player.hero].thumbnail" :alt="player.name"
              class="w-8 h-8 rounded-full object-cover bg-zinc-200 shrink-0" />
            <span class="text-sm font-semibold flex-1">{{ player.name }}</span>
            <UBadge :label="player.role" color="neutral" :variant="roleVariant(player.role)" size="sm" />
            <button class="text-zinc-300 hover:text-zinc-500 transition-colors ml-1 cursor-pointer"
              @click="roster.splice(i, 1)">
              <UIcon name="i-lucide-x" class="size-3.5" />
            </button>
          </div>
        </div>
        <div class="px-5 py-4 border-t border-zinc-100 bg-zinc-50 flex gap-2">
          <UInput v-model="newRosterName" placeholder="Player name" class="flex-1" @keydown.enter="addRosterPlayer" />
          <USelect v-model="newRosterHero" :items="heroOptions" class="w-36" />
          <UButton variant="outline" color="neutral" icon="i-lucide-plus" @click="addRosterPlayer" />
        </div>
      </div>

      <!-- Staff -->
      <div class="rounded-xl border border-zinc-200 overflow-hidden">
        <div class="px-5 py-3 border-b border-zinc-100 bg-zinc-50">
          <p class="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Staff</p>
        </div>
        <div class="divide-y divide-zinc-100">
          <div v-if="!staff.length" class="px-5 py-4 text-sm text-zinc-400">No staff yet.</div>
          <div v-for="(member, i) in staff" :key="i" class="flex items-center gap-3 px-5 py-3">
            <img :src="heroData[member.hero].thumbnail" :alt="member.name"
              class="w-8 h-8 rounded-full object-cover bg-zinc-200 shrink-0" />
            <span class="text-sm font-semibold flex-1">{{ member.name }}</span>
            <span class="text-xs text-zinc-400">{{ member.role }}</span>
            <button class="text-zinc-300 hover:text-zinc-500 transition-colors ml-1 cursor-pointer"
              @click="staff.splice(i, 1)">
              <UIcon name="i-lucide-x" class="size-3.5" />
            </button>
          </div>
        </div>
        <div class="px-5 py-4 border-t border-zinc-100 bg-zinc-50 flex gap-2">
          <UInput v-model="newStaffName" placeholder="Staff name" class="flex-1" @keydown.enter="addStaffMember" />
          <USelect v-model="newStaffHero" :items="heroOptions" class="w-36" />
          <UButton variant="outline" color="neutral" icon="i-lucide-plus" @click="addStaffMember" />
        </div>
      </div>
    </div>

  </div>
</template>
