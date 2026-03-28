<script setup lang="ts">
import { AppleIcon, ChartColumnStackedIcon } from 'lucide-vue-next';
import MatchOverview from '~/components/MatchOverview.vue';
import { heroData } from '~/lib/heroData';

const route = useRoute()
const { getTeam } = useTeams()
const team = computed(() => getTeam(route.params.id as string))

const scrimDays = [
  { label: 'Mon', active: false },
  { label: 'Tue', active: false },
  { label: 'Wed', active: true },
  { label: 'Thu', active: false },
  { label: 'Fri', active: true },
  { label: 'Sat', active: false },
  { label: 'Sun', active: true },
]
</script>

<template>
  <h1 class="text-3xl font-bold mb-8">{{ team?.name }}</h1>

  <section class="mb-8">
    <SectionHeader title="Scrim schedule" />
    <div class="grid grid-cols-7 gap-2">
      <div v-for="day in scrimDays" :key="day.label" class="flex flex-col gap-1.5">
        <span class="text-xs font-semibold uppercase text-center"
          :class="day.active ? 'text-zinc-900' : 'text-zinc-300'">
          {{ day.label }}
        </span>
        <div class="rounded-xl grow flex flex-col items-center justify-center py-4"
          :class="day.active ? 'bg-zinc-900' : 'bg-zinc-100'">
          <template v-if="day.active">
            <span class="text-sm font-bold text-white leading-none">20:00</span>
            <span class="text-[9px] font-semibold text-zinc-500 leading-none mt-1">CET</span>
          </template>
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
        <MatchOverview />
        <MatchOverview />
        <MatchOverview />
        <MatchOverview />
        <MatchOverview />
        <MatchOverview />
      </div>
    </div>
  </section>
</template>
