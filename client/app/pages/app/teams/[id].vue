<script setup lang="ts">
import { AppleIcon, ChartColumnStackedIcon } from 'lucide-vue-next';
import MatchOverview from '~/components/MatchOverview.vue';

const route = useRoute()
const { getTeam } = useTeams()
const team = computed(() => getTeam(route.params.id as string))

const { matches } = useMatches()
</script>

<template>
  <h1 class="text-3xl font-bold mb-8">{{ team?.name }}</h1>

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
