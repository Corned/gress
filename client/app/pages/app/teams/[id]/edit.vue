<script setup lang="ts">
import { heroData } from '~/lib/heroData'
import type { RosterPlayer, ScheduledEvent, ScheduleException } from '~/composables/useTeams'

const route = useRoute()
const router = useRouter()
const { getTeam, updateTeam } = useTeams()
const team = computed(() => getTeam(route.params.id as string))

const name = ref('')
const rank = ref('')
const roster = ref<RosterPlayer[]>([])
const staff = ref<RosterPlayer[]>([])
const schedule = ref<ScheduledEvent[]>([])
const exceptions = ref<ScheduleException[]>([])

watch(team, (t) => {
  if (!t) return
  name.value = t.name
  rank.value = t.rank
  roster.value = t.roster.map(p => ({ ...p }))
  staff.value = t.staff.map(p => ({ ...p }))
  schedule.value = t.schedule.map(e => ({ ...e }))
  exceptions.value = t.exceptions.map(e => ({ ...e }))
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

const newEventDay = ref('Mon')
const newEventType = ref<'scrim' | 'match' | 'coaching'>('scrim')
const newEventTimeStart = ref('20:00')
const newEventTimeEnd = ref('22:00')
const newEventOpponent = ref('')

const addEvent = () => {
  if (!newEventTimeStart.value || !newEventTimeEnd.value) return
  schedule.value.push({
    day: newEventDay.value,
    type: newEventType.value,
    timeStart: newEventTimeStart.value,
    timeEnd: newEventTimeEnd.value,
    ...(newEventOpponent.value.trim() ? { opponent: newEventOpponent.value.trim() } : {}),
  })
  newEventTimeStart.value = '20:00'
  newEventTimeEnd.value = '22:00'
  newEventOpponent.value = ''
}

// Exceptions
const newExDate = ref('')
const newExType = ref<'scrim' | 'match' | 'coaching'>('scrim')
const newExTimeStart = ref('')
const newExTimeEnd = ref('')
const newExOpponent = ref('')
const newExNote = ref('')

const addException = () => {
  if (!newExDate.value || !newExTimeStart.value || !newExTimeEnd.value) return
  exceptions.value.push({
    date: newExDate.value,
    type: newExType.value,
    timeStart: newExTimeStart.value,
    timeEnd: newExTimeEnd.value,
    ...(newExOpponent.value.trim() ? { opponent: newExOpponent.value.trim() } : {}),
    ...(newExNote.value.trim() ? { note: newExNote.value.trim() } : {}),
  })
  newExDate.value = ''
  newExTimeStart.value = ''
  newExTimeEnd.value = ''
  newExOpponent.value = ''
  newExNote.value = ''
}

const save = () => {
  if (!team.value) return
  updateTeam(team.value.id, {
    name: name.value.trim(),
    rank: rank.value.trim(),
    roster: roster.value,
    staff: staff.value,
    schedule: schedule.value,
    exceptions: exceptions.value,
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
        <button class="p-1.5 rounded-lg border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-colors"
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
      <div class="px-5 py-4 border-b border-zinc-100">
        <p class="text-xs font-medium text-zinc-400 mb-3">Weekly</p>
        <Schedule v-if="schedule.length" :schedule="schedule" class="mb-4" editable />
        <p v-else class="text-sm text-zinc-400 mb-4">No recurring events.</p>
        <div class="flex gap-2">
          <USelect v-model="newEventDay" :items="days" class="w-24" />
          <USelect v-model="newEventType" :items="eventTypes" class="w-32" />
          <UInput v-model="newEventTimeStart" type="time" step="300" class="w-32" />
          <UInput v-model="newEventTimeEnd" type="time" step="300" class="w-32" />
          <UButton variant="outline" color="neutral" icon="i-lucide-plus" @click="addEvent" />
        </div>
      </div>

      <!-- Exceptions -->
      <div class="px-5 py-3 border-b border-zinc-100">
        <p class="text-xs font-medium text-zinc-400 mb-2">Exceptions</p>
        <div class="divide-y divide-zinc-100">
          <div v-if="!exceptions.length" class="py-2 text-sm text-zinc-400">No exceptions.</div>
          <div v-for="(ex, i) in exceptions" :key="i" class="flex items-center gap-3 py-2.5">
            <span class="text-xs font-bold text-zinc-500 shrink-0 tabular-nums">{{ ex.date }}</span>
            <UBadge :label="ex.type" color="neutral" :variant="typeVariant(ex.type)" size="sm"
              class="capitalize shrink-0" />
            <span class="text-xs tabular-nums text-zinc-500 shrink-0">{{ ex.timeStart }}–{{ ex.timeEnd }}</span>
            <span v-if="ex.opponent" class="text-xs text-zinc-400 truncate">vs {{ ex.opponent }}</span>
            <span v-if="ex.note" class="text-xs text-zinc-400 italic truncate flex-1">{{ ex.note }}</span>
            <span v-else class="flex-1" />
            <button class="text-zinc-300 hover:text-zinc-500 transition-colors" @click="exceptions.splice(i, 1)">
              <UIcon name="i-lucide-x" class="size-3.5" />
            </button>
          </div>
        </div>
      </div>
      <div class="px-5 py-3 bg-zinc-50 flex gap-2 flex-wrap">
        <UInput v-model="newExDate" placeholder="YYYY-MM-DD" class="w-36" />
        <USelect v-model="newExType" :items="eventTypes" class="w-32" />
        <UInput v-model="newExTimeStart" placeholder="20:00" class="w-24" />
        <UInput v-model="newExTimeEnd" placeholder="22:00" class="w-24" />
        <UInput v-model="newExOpponent" placeholder="Opponent" class="flex-1 min-w-28" />
        <UInput v-model="newExNote" placeholder="Note (optional)" class="flex-1 min-w-28" />
        <UButton variant="outline" color="neutral" icon="i-lucide-plus" @click="addException" />
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
            <button class="text-zinc-300 hover:text-zinc-500 transition-colors ml-1" @click="roster.splice(i, 1)">
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
            <button class="text-zinc-300 hover:text-zinc-500 transition-colors ml-1" @click="staff.splice(i, 1)">
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
