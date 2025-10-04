<template>
  <section>
    <div class="flex flex-col gap-2 max-w-[650px] transparent p-2">
      <div class="flex flex-row justify-between items-center">
        <div class="flex flex-col gap-0">
          <p
            class="text-3xl text-white font-black drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]"
          >
            {{ myTeamName }}
          </p>
          <p
            class="text-2xl text-white font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]"
          >
            vs. {{ enemyTeamName }}
          </p>
        </div>
        <div>
          <p
            class="text-6xl text-white font-black drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]"
          >
            {{ myTeamSR }}
          </p>
        </div>
      </div>

      <ScrimEntry
        v-for="(entry, i) in testMatchData"
        :key="i"
        :map="entry.map"
        :hero-bans="entry.heroBans"
        :results="entry.results"
        :code="entry.code"
        :winning-team="entry.winningTeam"
      />

      <p
        class="w-full text-center text-white font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]"
      >
        gress.tmp.ooo
      </p>
    </div>

    <button
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    >
      Download as PNG
    </button>
  </section>
</template>

<script setup>
  import { ref } from "vue";
  import { mapData } from "~/lib/mapData";
  import { heroData } from "~/lib/heroData";

  const myTeamName = ref("My Team");
  const enemyTeamName = ref("Enemy Team");
  const myTeamSR = ref(4200);

  const testMatchData = [
    {
      map: mapData.AntarcticPeninsula,
      heroBans: [heroData.Reinhardt, heroData.Brigitte],
      results: [2, 1],
      code: "ABCDEF",
      winningTeam: 0,
    },
    {
      map: mapData.KingsRow,
      heroBans: [heroData.Dva, heroData.Lucio],
      results: [3, 3],
      code: "ABCDEF",
      winningTeam: 2,
    },
    {
      map: mapData.Route66,
      heroBans: [heroData.Zarya, heroData.Tracer],
      results: [3, 3],
      code: "ABCDEF",
      winningTeam: 0,
    },
    {
      map: mapData.Runasapi,
      heroBans: [heroData.WreckingBall, heroData.Wuyang],
      results: [1, 0],
      code: "ABCDEF",
      winningTeam: 0,
    },
    {
      map: mapData.NewJunkCity,
      heroBans: [heroData.Kiriko, heroData.Sigma],
      results: [2, 3],
      code: "ABCDEF",
      winningTeam: 1,
    },
  ];
</script>
