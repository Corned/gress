<script setup>
import { ref } from "vue";
import { mapData } from "~/lib/mapData";
import { heroData } from "~/lib/heroData";
import { toPng } from "html-to-image";

const myTeamName = ref("My Team");
const enemyTeamName = ref("Enemy Team");
const myTeamSR = ref(4200);

const testMatchData = ref([

]);

const addScrimEntry = (entry) => {
  testMatchData.value.push({
    map: entry.map,
    heroBans: [...entry.heroBans],
    results: [...entry.results],
    code: entry.code,
    winningTeam: entry.winningTeam,
  });
};

const downloadAsPng = async () => {
  const element = document.getElementById('scrimDisplay');
  if (!element) return;

  try {
    element.classList.toggle("transparent");
    const dataUrl = await toPng(element, { backgroundColor: null });
    element.classList.toggle("transparent");
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${myTeamName.value}_vs_${enemyTeamName.value}.png`;
    link.click();
  } catch (err) {
    console.error("Failed to download PNG", err);
  }
};
</script>


<template>
  <section class="flex flex-col gap-6">

    <!-- Team Name Inputs -->
    <div class="flex gap-4 mb-4">
      <div class="flex flex-col gap-1 w-full">
        <label class="text-sm font-bold text-gray-700">Your Team Name</label>
        <input type="text" v-model="myTeamName" class="p-2 border rounded w-full bg-white" />
      </div>

      <div class="flex flex-col gap-1 w-full">
        <label class="text-sm font-bold text-gray-700">Enemy Team Name</label>
        <input type="text" v-model="enemyTeamName" class="p-2 border rounded w-full bg-white" />
      </div>

      <div class="flex flex-col gap-1 w-full">
        <label class="text-sm font-bold text-gray-700">Scrim SR</label>
        <input type="text" v-model="myTeamSR" class="p-2 border rounded w-full bg-white" />
      </div>
    </div>

    <ScrimEntryBuilder :passFormState="addScrimEntry" />

    <div id="scrimDisplay" class="flex flex-col gap-2 w-fit transparent p-2">
      <div class="flex flex-row justify-between items-center">
        <div class="flex flex-col gap-0">
          <p class="text-3xl text-white font-black drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">
            {{ myTeamName }}
          </p>
          <p class="text-2xl text-white font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">
            vs. {{ enemyTeamName }}
          </p>
        </div>
        <div>
          <p class="text-6xl text-white font-black drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">
            {{ myTeamSR }}
          </p>
        </div>
      </div>

      <ScrimEntry v-for="(entry, i) in testMatchData" :key="i" :map="entry.map" :hero-bans="entry.heroBans"
        :results="entry.results" :code="entry.code" :winning-team="entry.winningTeam" />

      <p class="w-full text-center text-white font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">
        gress.tmp.ooo
      </p>
    </div>

    <button @click="downloadAsPng"
      class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-bold shadow-md cursor-pointer w-fit">
      Download as PNG
    </button>
  </section>
</template>
