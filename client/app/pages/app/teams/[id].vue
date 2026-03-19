<script setup lang="ts">
import { AppleIcon, ChartColumnStackedIcon } from 'lucide-vue-next';
import MatchOverview from '~/components/MatchOverview.vue';

const route = useRoute()
const id = route.params.id
</script>

<template>
  <h1 class="text-3xl font-bold text-zinc-900 mb-8">{{ "MRG Garnet" }}</h1>

  <section class="mb-8">
    <SectionHeader title="Roster" />
    <div id="team__players" class="flex flex-row gap-2 h-10 mb-2">
      <HeroLabelButton label="Poke" hero="Reinhardt" />
      <HeroLabelButton label="Tempo" hero="Sojourn" />
      <HeroLabelButton label="Ceisses" hero="Tracer" />
      <HeroLabelButton label="Kritzkrieg" hero="Kiriko" />
      <HeroLabelButton label="Ruby" hero="Lucio" />
    </div>
    <div id="team__staff" class="flex flex-row gap-2 h-10">
      <HeroLabelButton label="MoodyRat" hero="Ana" />
      <HeroLabelButton label="Dumda" hero="WreckingBall" />
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
