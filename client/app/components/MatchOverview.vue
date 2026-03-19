<script setup lang="ts">
import { mapData } from "~/lib/mapData";

type MapKey = keyof typeof mapData;

interface Match {
  map: MapKey;
  team1Ban: string;
  team2Ban: string;
  team1Score: number;
  team2Score: number;
}

const testData: Match[] = [
  { map: "Ilios", team1Ban: "Widowmaker", team2Ban: "Tracer", team1Score: 0, team2Score: 3 },
  { map: "KingsRow", team1Ban: "Bastion", team2Ban: "Reaper", team1Score: 3, team2Score: 2 },
  { map: "Dorado", team1Ban: "Ana", team2Ban: "Genji", team1Score: 1, team2Score: 3 },
  { map: "Runasapi", team1Ban: "Reinhardt", team2Ban: "Zarya", team1Score: 2, team2Score: 1 },
  { map: "NewJunkCity", team1Ban: "Cassidy", team2Ban: "Ashe", team1Score: 3, team2Score: 2 },
  { map: "CircuitRoyal", team1Ban: "Freja", team2Ban: "Sigma", team1Score: 2, team2Score: 3 },
  { map: "Nepal", team1Ban: "Mercy", team2Ban: "Sojourn", team1Score: 3, team2Score: 1 },
];

const wins = testData.filter(m => m.team1Score > m.team2Score).length
const losses = testData.filter(m => m.team1Score < m.team2Score).length
const draws = testData.filter(m => m.team1Score === m.team2Score).length
</script>

<template>
  <div class="bg-white border border-zinc-200 rounded-xl">

    <div class="flex items-center justify-between px-3 py-2.5 border-b border-zinc-100">
      <div class="min-w-0">
        <p class="text-sm font-bold text-zinc-900 truncate leading-tight">MRG Garnet</p>
        <p class="text-sm text-zinc-400 truncate leading-tight">vs San Francisco Shock</p>
      </div>
      <div class="flex gap-1 shrink-0 ml-2">
        <span v-for="(m, i) in testData" :key="i" class="w-1.5 h-1.5 rounded-full"
          :class="m.team1Score > m.team2Score ? 'bg-zinc-900' : m.team1Score < m.team2Score ? 'bg-zinc-300' : 'bg-zinc-400'" />
      </div>
    </div>

    <div class="px-2 py-2 flex flex-col gap-1">
      <div v-for="(match, index) in testData" :key="index" class="grid grid-cols-[36px_1fr_auto] gap-2 items-center">
        <img :src="mapData[match.map].thumbnail" alt="map" class="w-9 h-6 object-cover rounded" />
        <p class="text-sm font-semibold text-zinc-700 truncate">{{ mapData[match.map].displayName }}</p>
        <p class="text-sm font-bold tabular-nums"
          :class="match.team1Score > match.team2Score ? 'text-zinc-900' : 'text-zinc-400'">
          {{ match.team1Score }}&ndash;{{ match.team2Score }}
        </p>
      </div>
    </div>

  </div>
</template>
