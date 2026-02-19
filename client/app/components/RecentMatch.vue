<script setup lang="ts">
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
];
</script>

<template>
  <div class="p-2 bg-gray-100 rounded-xl w-fit flex flex-col gap-[4px]">

    <p class="text-lg font-bold">MRG Garnet vs xxx</p>

    <div v-for="(match, index) in testData" :key="index"
      class="grid grid-cols-[auto_1fr_auto] gap-3 items-center rounded-sm bg-white p-2 pr-4" :class="{
        'rounded-t-lg': index === 0,
        'rounded-b-lg': index === testData.length - 1,
      }">
      <img :src="mapData[match.map].thumbnail" alt="map" class="aspect-[2/1] object-cover h-8 rounded" />
      <p class="text-lg font-semibold">{{ mapData[match.map].displayName }}</p>
      <p class="text-lg font-semibold ml-4">{{ match.team1Score }} - {{ match.team2Score }}</p>
    </div>

  </div>
</template>