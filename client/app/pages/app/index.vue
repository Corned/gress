<script setup lang="ts">
import { AppleIcon, ChartColumnStackedIcon } from 'lucide-vue-next';
import MatchOverview from '~/components/MatchOverview.vue';

</script>

<template>
  <h1 class="text-3xl font-bold mb-4">Dashboard</h1>

  <div id="team__players" class="flex flex-row gap-2 h-10 mb-2">
    <HeroLabelButton label="Poke" hero="Reinhardt" />
    <HeroLabelButton label="Tempo" hero="Sojourn" />
    <HeroLabelButton label="Ceisses" hero="Tracer" />
    <HeroLabelButton label="Kritzkrieg" hero="Kiriko" />
    <HeroLabelButton label="Ruby" hero="Lucio" />
  </div>
  <div id="team__staff" class="flex flex-row gap-2 h-10 mb-8">
    <HeroLabelButton label="MoodyRat" hero="Ana" />
    <HeroLabelButton label="Dumda" hero="WreckingBall" />
  </div>

  <h2 class="text-2xl font-semibold mb-4">Recent matches</h2>

  <div class="mb-2">
    <div class="flex flex-row gap-2 mb-2 items-center">
      <IconLabelButton label="Simple" :icon="AppleIcon" />
      <IconLabelButton label="Detailed" :icon="ChartColumnStackedIcon" />
      <div class="w-px h-6 bg-zinc-200 hidden"></div>
    </div>

    <div class="flex flex-row gap-2">
      <MatchOverview />
      <MatchOverview />
      <MatchOverview />
    </div>
  </div>
</template>