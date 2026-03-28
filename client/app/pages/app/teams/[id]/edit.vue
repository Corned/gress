<script setup lang="ts">
import { ArrowLeftIcon, PlusIcon, Trash2Icon } from 'lucide-vue-next'
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

// Add roster player
const newRosterName = ref('')
const newRosterHero = ref('Ana')
const newRosterRole = computed(() => heroData[newRosterHero.value as keyof typeof heroData]?.role ?? '')

const addRosterPlayer = () => {
  if (!newRosterName.value.trim()) return
  roster.value.push({ name: newRosterName.value.trim(), hero: newRosterHero.value as keyof typeof heroData, role: newRosterRole.value })
  newRosterName.value = ''
  newRosterHero.value = 'Ana'
}

// Add staff member
const newStaffName = ref('')
const newStaffHero = ref('Ana')
const newStaffRole = computed(() => heroData[newStaffHero.value as keyof typeof heroData]?.role ?? '')

const addStaffMember = () => {
  if (!newStaffName.value.trim()) return
  staff.value.push({ name: newStaffName.value.trim(), hero: newStaffHero.value as keyof typeof heroData, role: newStaffRole.value })
  newStaffName.value = ''
  newStaffHero.value = 'Ana'
}

// Add schedule event
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const eventTypes = [
  { label: 'Scrim', value: 'scrim' },
  { label: 'Match', value: 'match' },
  { label: 'Coaching', value: 'coaching' },
]

const newEventDay = ref('Mon')
const newEventType = ref<'scrim' | 'match' | 'coaching'>('scrim')
const newEventTimeStart = ref('')
const newEventTimeEnd = ref('')
const newEventOpponent = ref('')

const addEvent = () => {
  if (!newEventTimeStart.value || !newEventTimeEnd.value) return
  schedule.value.push({
    date: newEventDay.value,
    type: newEventType.value,
    timeStart: newEventTimeStart.value,
    timeEnd: newEventTimeEnd.value,
    ...(newEventOpponent.value.trim() ? { opponent: newEventOpponent.value.trim() } : {}),
  })
  newEventTimeStart.value = ''
  newEventTimeEnd.value = ''
  newEventOpponent.value = ''
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
  router.push(`/app/teams/${team.value.slug}`)
}

const typeClass = (type: 'scrim' | 'match' | 'coaching') => ({
  scrim: 'bg-zinc-900 text-white',
  match: 'bg-orange-600 text-white',
  coaching: 'bg-blue-100 text-blue-900',
}[type])
</script>

<template>
  <div v-if="team">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center gap-3">
        <NuxtLink :to="`/app/teams/${team.slug}`"
          class="p-1.5 rounded-lg border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-colors">
          <ArrowLeftIcon class="size-4 text-zinc-500" />
        </NuxtLink>
        <h1 class="text-3xl font-bold">Edit Team</h1>
      </div>
      <button
        class="text-sm font-semibold px-4 py-1.5 rounded-lg bg-zinc-900 text-white hover:bg-zinc-700 transition-colors"
        @click="save">
        Save Changes
      </button>
    </div>

    <!-- General -->
    <section class="mb-8">
      <SectionHeader title="General" />
      <div class="flex gap-3">
        <div class="flex flex-col gap-1.5 flex-1">
          <label class="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Team Name</label>
          <UInput v-model="name" placeholder="e.g. MRG Garnet" />
        </div>
        <div class="flex flex-col gap-1.5 w-28">
          <label class="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Rank</label>
          <UInput v-model="rank" placeholder="e.g. GM5" />
        </div>
      </div>
    </section>

    <!-- Roster -->
    <section class="mb-8">
      <SectionHeader title="Roster" />
      <div class="flex flex-col gap-1.5 mb-3">
        <div v-for="(player, i) in roster" :key="i"
          class="flex items-center gap-3 px-3 py-2 rounded-xl border border-zinc-100 bg-zinc-50">
          <img :src="heroData[player.hero].thumbnail" :alt="player.name"
            class="w-7 h-7 rounded-full object-cover shrink-0 bg-zinc-200" />
          <span class="text-sm font-semibold flex-1">{{ player.name }}</span>
          <span class="text-xs text-zinc-400 w-16">{{ player.role }}</span>
          <button class="text-zinc-300 hover:text-zinc-500 transition-colors cursor-pointer"
            @click="roster.splice(i, 1)">
            <Trash2Icon class="size-3.5" />
          </button>
        </div>
      </div>
      <div class="flex gap-2">
        <UInput v-model="newRosterName" placeholder="Player name" class="flex-1" @keydown.enter="addRosterPlayer" />
        <USelect v-model="newRosterHero" :items="heroOptions" class="w-44" />
        <UButton variant="outline" color="neutral" @click="addRosterPlayer">
          <PlusIcon class="size-4" />
        </UButton>
      </div>
    </section>

    <!-- Staff -->
    <section class="mb-8">
      <SectionHeader title="Staff" />
      <div class="flex flex-col gap-1.5 mb-3">
        <div v-for="(member, i) in staff" :key="i"
          class="flex items-center gap-3 px-3 py-2 rounded-xl border border-zinc-100 bg-zinc-50">
          <img :src="heroData[member.hero].thumbnail" :alt="member.name"
            class="w-7 h-7 rounded-full object-cover shrink-0 bg-zinc-200" />
          <span class="text-sm font-semibold flex-1">{{ member.name }}</span>
          <span class="text-xs text-zinc-400 w-16">{{ member.role }}</span>
          <button class="text-zinc-300 hover:text-zinc-500 transition-colors cursor-pointer"
            @click="staff.splice(i, 1)">
            <Trash2Icon class="size-3.5" />
          </button>
        </div>
      </div>
      <div class="flex gap-2">
        <UInput v-model="newStaffName" placeholder="Staff name" class="flex-1" @keydown.enter="addStaffMember" />
        <USelect v-model="newStaffHero" :items="heroOptions" class="w-44" />
        <UButton variant="outline" color="neutral" @click="addStaffMember">
          <PlusIcon class="size-4" />
        </UButton>
      </div>
    </section>

    <!-- Schedule -->
    <section class="mb-8">
      <SectionHeader title="Schedule" />
      <div class="flex flex-col gap-1.5 mb-3">
        <div v-for="(event, i) in schedule" :key="i"
          class="flex items-center gap-3 px-3 py-2 rounded-xl border border-zinc-100 bg-zinc-50">
          <span class="text-xs font-bold w-8 text-zinc-500 shrink-0">{{ event.date }}</span>
          <span class="text-xs font-semibold px-2 py-0.5 rounded-md capitalize shrink-0" :class="typeClass(event.type)">
            {{ event.type }}
          </span>
          <span class="text-xs tabular-nums text-zinc-500 shrink-0">{{ event.timeStart }}–{{ event.timeEnd }}</span>
          <span v-if="event.opponent" class="text-xs text-zinc-400 flex-1 truncate">vs {{ event.opponent }}</span>
          <span v-else class="flex-1" />
          <button class="text-zinc-300 hover:text-zinc-500 transition-colors cursor-pointer"
            @click="schedule.splice(i, 1)">
            <Trash2Icon class="size-3.5" />
          </button>
        </div>
      </div>
      <div class="flex gap-2 flex-wrap">
        <USelect v-model="newEventDay" :items="days" class="w-24" />
        <USelect v-model="newEventType" :items="eventTypes" class="w-32" />
        <UInput v-model="newEventTimeStart" placeholder="20:00" class="w-24" />
        <UInput v-model="newEventTimeEnd" placeholder="22:00" class="w-24" />
        <UInput v-model="newEventOpponent" placeholder="Opponent (optional)" class="flex-1 min-w-36" />
        <UButton variant="outline" color="neutral" @click="addEvent">
          <PlusIcon class="size-4" />
        </UButton>
      </div>
    </section>
  </div>
</template>
