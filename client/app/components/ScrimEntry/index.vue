<script setup>
import { ref } from "vue";
import { mapTypeIcons } from "~/lib/mapData";

import Score from "./_Score.vue"
import ReplayCode from "./_ReplayCode.vue"
import OptionsOverlay from "./_OptionsOverlay.vue"
import BannedHero from "./_BannedHero.vue"


defineProps({
  map: {
    type: Object,
    required: true,
  },
  team1Ban: {
    type: String,
    required: true,
  },
  team2Ban: {
    type: String,
    required: true,
  },
  team1Score: {
    type: Number,
    required: true,
  },
  team2Score: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  winningTeam: {
    type: Number,
    required: true,
  },
  hasOverlay: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['edit', 'delete']);
</script>


<template>
  <div class="h-16 overflow-hidden w-full rounded-lg relative group">
    <OptionsOverlay :hasOverlay="hasOverlay" :code="code" @edit="$emit('edit')" @delete="$emit('delete')" />
    <div class="overflow-hidden relative flex flex-row gap-3 items-center h-16 p-3 z-20 select-none">
      <div class="bg-gradient-to-r from-black/60 via-black/40 to-transparent absolute inset-0 z-10 h-16"></div>
      <img :src="map.thumbnail" alt="Map Type Icon"
        class="absolute object-cover w-full z-0 left-0 scale-105 blur-[1px]" />
      <img :src="mapTypeIcons[map.type]" alt="Map Type Icon"
        class="z-20 h-full drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]" />
      <p class="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)] font-bold text-xl uppercase text-center text-white z-20">
        {{ map.displayName }}
      </p>
      <div class="flex-grow"></div>
      <!-- HERO BANS -->
      <div class="flex flex-row gap-2 z-20">
        <BannedHero :hero="team1Ban" />
        <BannedHero :hero="team2Ban" />
      </div>

      <Score :team1Score="team1Score" :team2Score="team2Score" :winningTeam="winningTeam" />
      <ReplayCode :code="code" />
    </div>
  </div>
</template>
