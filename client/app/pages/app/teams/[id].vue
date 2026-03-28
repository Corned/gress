<script setup lang="ts">
import { AppleIcon, ChartColumnStackedIcon, Dumbbell } from 'lucide-vue-next';
import MatchOverview from '~/components/MatchOverview.vue';
import { heroData } from '~/lib/heroData';

const route = useRoute()
const { getTeam } = useTeams()
const team = computed(() => getTeam(route.params.id as string))

const { matches } = useMatches()

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const blockClass = (type: 'scrim' | 'match' | 'coaching') => ({
  scrim: 'bg-zinc-900 text-white',
  match: 'bg-orange-600 text-white ',
  coaching: 'bg-blue-100 text-blue-900',
}[type])

</script>

<template>
  <h1 class="text-3xl font-bold mb-8">{{ team?.name }}</h1>

  <section class="mb-8">
    <SectionHeader title="Schedule" />
    <div class="grid grid-cols-7 gap-2">
      <div v-for="day in days" :key="day" class="flex flex-col gap-1.5">
        <span class="text-xs font-semibold text-center"
          :class="team?.schedule.find(s => s.date === day) ? 'text-zinc-900' : 'text-zinc-300'">
          {{ day }}
        </span>
        <template v-if="team?.schedule.filter(e => e.date === day).length">
          <div v-for="event in team.schedule.filter(e => e.date === day)" :key="event.timeStart"
            class="rounded-xl flex flex-col p-2.5 gap-0.5" :class="blockClass(event.type)">
            <p class="text-xs font-bold capitalize">{{ event.type }}</p>
            <p class="text-xs opacity-60 tabular-nums">{{ event.timeStart }}–{{ event.timeEnd }}</p>
            <p v-if="event.opponent" class="text-xs opacity-80 truncate">vs {{ event.opponent }}</p>
          </div>
        </template>
        <div v-else class="rounded-xl py-3 border-2 border-dashed border-zinc-200 grid place-items-center">
          <Dumbbell class="size-3.5 text-zinc-300" />
        </div>
      </div>
    </div>
  </section>


  <section class="mb-8">
    <SectionHeader title="Roster" />
    <div class="grid grid-cols-5 gap-2">
      <div v-for="p in team?.roster" :key="p.name"
        class="relative overflow-hidden rounded-xl px-3 py-2 flex flex-col justify-end min-h-16">
        <img :src="heroData[p.hero].thumbnail" alt="" class="absolute inset-0 w-full h-full object-cover scale-150" />
        <div class="absolute inset-0 bg-linear-to-t from-zinc-900/80 to-zinc-900/20" />
        <div class="relative flex flex-col">
          <p class="font-semibold text-white text-sm leading-tight">{{ p.name }}</p>
          <span class="text-[10px] font-semibold uppercase tracking-wide text-zinc-300 leading-tight">{{ p.role
          }}</span>
        </div>
      </div>
    </div>
  </section>

  <section class="mb-8">
    <SectionHeader title="Staff" />
    <div class="grid grid-cols-5 gap-2">
      <div v-for="p in team?.staff" :key="p.name"
        class="relative overflow-hidden rounded-xl px-3 py-2 flex flex-col justify-end min-h-16">
        <img :src="heroData[p.hero].thumbnail" alt="" class="absolute inset-0 w-full h-full object-cover scale-150" />
        <div class="absolute inset-0 bg-linear-to-t from-zinc-900/80 to-zinc-900/20" />
        <div class="relative flex flex-col">
          <p class="font-semibold text-white text-sm leading-tight">{{ p.name }}</p>
          <span class="text-[10px] font-semibold uppercase tracking-wide text-zinc-300 leading-tight">{{ p.role
          }}</span>
        </div>
      </div>
    </div>
  </section>


  <section>
    <SectionHeader title="Recent matches" />

    <div class="mb-2">
      <div class="flex flex-row gap-2 mb-2 items-center hidden">
        <IconLabelButton label="Simple" :icon="AppleIcon" />
        <IconLabelButton label="Detailed" :icon="ChartColumnStackedIcon" />
        <div class="w-px h-6 bg-zinc-200 hidden"></div>
      </div>

      <div class="grid grid-cols-3 gap-2">
        <MatchOverview v-for="match in matches" :key="match.id" :match="match" />
      </div>
    </div>
  </section>
</template>
