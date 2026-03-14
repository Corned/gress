<script setup lang="ts">
import { BookOpen, MapIcon, StarIcon, SwordsIcon } from "lucide-vue-next";
import { heroData } from "~/lib/heroData";
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
  {
    map: "Ilios",
    team1Ban: "Widowmaker",
    team2Ban: "Tracer",
    team1Score: 0,
    team2Score: 3,
  },
  {
    map: "KingsRow",
    team1Ban: "Bastion",
    team2Ban: "Reaper",
    team1Score: 3,
    team2Score: 2,
  },
  {
    map: "Dorado",
    team1Ban: "Ana",
    team2Ban: "Genji",
    team1Score: 1,
    team2Score: 3,
  },
  {
    map: "Runasapi",
    team1Ban: "Reinhardt",
    team2Ban: "Zarya",
    team1Score: 2,
    team2Score: 1,
  },
  {
    map: "NewJunkCity",
    team1Ban: "Cassidy",
    team2Ban: "Ashe",
    team1Score: 3,
    team2Score: 2,
  },
  {
    map: "CircuitRoyal",
    team1Ban: "Freja",
    team2Ban: "Sigma",
    team1Score: 2,
    team2Score: 3,
  },
];
</script>

<template>
  <div class=" bg-white border border-zinc-300 rounded-md w-[350px]">

    <div class="relative flex flex-col gap-0 items-center justify-between border-b border-zinc-300 px-4 py-4">
      <p class="text-xl font-semibold">MRG Garnet</p>
      <p class="text-md font-semibold text-zinc-500 mt-[-4px]">San Francisco Shock</p>
      <div class="flex flex-row gap-2 mt-2">
        <div class="aspect-square rounded-full h-2 bg-red-400"></div>
        <div class="aspect-square rounded-full h-2 bg-green-400"></div>
        <div class="aspect-square rounded-full h-2 bg-red-400"></div>
        <div class="aspect-square rounded-full h-2 bg-green-400"></div>
        <div class="aspect-square rounded-full h-2 bg-green-400"></div>
        <div class="aspect-square rounded-full h-2 bg-red-400"></div>
      </div>
    </div>

    <div class="p-2 flex flex-col gap-2">
      <div v-for="(match, index) in testData" :key="index"
        class="grid grid-cols-[60px_auto_1fr_auto] gap-2 items-center">
        <img :src="mapData[match.map].thumbnail" alt="map" class="aspect-2/1 object-cover h-8 rounded " />
        <p class="text-lg font-semibold">{{ mapData[match.map].displayName }}</p>
        <div class="w-full h-2 rounded-full bg-zinc-200/75 flex-1"></div>
        <div class="grid grid-cols-[16px_1fr_16px] gap-1">
          <p class="text-lg font-semibold text-center">{{ match.team1Score }}</p>
          <p class="text-lg font-semibold text-center">-</p>
          <p class="text-lg font-semibold text-center">{{ match.team2Score }}</p>
        </div>
      </div>
    </div>


  </div>
</template>