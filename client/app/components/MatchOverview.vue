<script setup lang="ts">
import { mapData } from "~/lib/mapData";
import { Swords } from 'lucide-vue-next';
import type { Match } from '~/composables/useMatches';

const props = defineProps<{ match: Match }>()

const wins = computed(() => props.match.maps.filter(m => m.team1Score > m.team2Score).length)
const losses = computed(() => props.match.maps.filter(m => m.team1Score < m.team2Score).length)
</script>

<template>
  <div class="flex flex-col gap-0.5">

    <!-- Header -->
    <div class="flex items-center justify-between gap-2 px-1 pb-2">
      <div class="flex flex-col min-w-0">
        <div class="flex items-center gap-1.5">
          <Swords class="size-4 text-zinc-400 shrink-0" />
          <p class="text-base font-black text-zinc-900 truncate">{{ match.opponent }}</p>
        </div>
        <p class="text-xs text-zinc-400 pl-0.5">{{ match.date }}</p>
      </div>
      <div class="flex items-center gap-1 shrink-0">
        <span class="text-base font-black tabular-nums text-zinc-900">{{ wins }}</span>
        <span class="text-sm font-bold text-zinc-300">–</span>
        <span class="text-base font-black tabular-nums text-zinc-300">{{ losses }}</span>
      </div>
    </div>

    <!-- Map rows -->
    <div v-for="(map, index) in match.maps" :key="index"
      class="relative overflow-hidden h-12 flex items-center rounded-lg">
      <img :src="mapData[map.map].thumbnail" alt="map" class="absolute inset-0 w-full h-full object-cover"
        :class="map.team1Score > map.team2Score ? '' : 'grayscale'" />
      <div class="absolute inset-0 bg-linear-to-r from-zinc-900/60 via-zinc-900/40 to-zinc-900/20" />
      <div class="absolute inset-0 bg-linear-to-r  "
        :class="map.team1Score > map.team2Score ? 'from-green-600/20 to-transparent' : 'from-red-600/30 to-transparent'" />
      <div v-if="map.team1Score <= map.team2Score" class="absolute inset-0 bg-zinc-900/50" />
      <div class="relative flex items-center justify-between w-full px-3 gap-2">
        <div class="flex flex-col min-w-0">
          <p class="text-sm font-semibold truncate"
            :class="map.team1Score > map.team2Score ? 'text-white' : 'text-white/70'"
            style="text-shadow: 0 1px 3px rgba(0,0,0,0.8)">{{ mapData[map.map].displayName }}</p>
          <p class="text-xs text-white/70 truncate" style="text-shadow: 0 1px 3px rgba(0,0,0,0.8)">
            <span class="text-white/40">bans:</span> {{ map.team1Ban }}<span class="text-white/40">,</span> {{
              map.team2Ban }}
          </p>
        </div>
        <div class="flex flex-col items-end shrink-0">
          <p class="text-sm font-black tabular-nums"
            :class="map.team1Score > map.team2Score ? 'text-white' : 'text-white/70'"
            style="text-shadow: 0 1px 3px rgba(0,0,0,0.8)">{{ map.team1Score }}–{{ map.team2Score }}</p>
        </div>
      </div>
    </div>

  </div>
</template>
