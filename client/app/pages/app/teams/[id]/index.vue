<script setup lang="ts">
import { AppleIcon, ChartColumnStackedIcon, PencilIcon } from 'lucide-vue-next';
import MatchOverview from '~/components/MatchOverview.vue';

const route = useRoute()
const { getTeam } = useTeams()
const team = computed(() => getTeam(route.params.id as string))

const { matches } = useMatches()
</script>

<template>
  <div class="flex items-center justify-between mb-8">
    <h1 class="text-3xl font-bold">{{ team?.name }}</h1>
    <NuxtLink v-if="team" :to="`/app/teams/${team.slug}/edit`"
      class="flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-colors">
      <PencilIcon class="size-3.5" />
      Edit
    </NuxtLink>
  </div>

  <section class="mb-8">
    <SectionHeader title="Schedule" />
    <Schedule v-if="team" :schedule="team.schedule" />
  </section>


  <section class="mb-8">
    <SectionHeader title="Roster" />
    <Roster v-if="team" :members="team.roster" />
  </section>

  <section class="mb-8">
    <SectionHeader title="Staff" />
    <Roster v-if="team" :members="team.staff" />
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
