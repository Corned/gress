<script setup>
import { mapData } from '~/lib/mapData';
import { heroData } from '~/lib/heroData';

const props = defineProps({
  passFormState: {
    type: Function,
    required: true,
  },
})



const map = ref(mapData['LijiangTower']);
const heroBans = ref([heroData.Lucio, heroData.Dva]);
const results = ref([0, 0]);
const code = ref("");
const winningTeam = ref(0);
const modalRef = ref(null);

watch(results, (newVal) => {
  if (newVal[0] > newVal[1]) {
    winningTeam.value = 0;
  } else if (newVal[0] < newVal[1]) {
    winningTeam.value = 1;
  } else {
    winningTeam.value = 2;
  }
}, { deep: true });

const handleSubmit = () => {
  props.passFormState({
    map: map.value,
    heroBans: [...heroBans.value],
    results: [...results.value],
    code: code.value,
    winningTeam: winningTeam.value,
  });
  modalRef.value?.close();
};
</script>

<template>
  <section>

    <Modal ref="modalRef">
      <template #trigger>
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-bold shadow-md cursor-pointer">
          Add Scrim Entry
        </button>
      </template>

      <div class="flex flex-col gap-4 p-4 bg-white rounded-lg shadow">


        <ScrimEntry :map="map" :heroBans="heroBans" :results="results" :code="code || 'TXCXX'"
          :winningTeam="winningTeam" />

        <!-- Map Selection -->
        <div class="flex flex-col gap-1">
          <label class="text-sm font-bold text-gray-700">Map</label>
          <select v-model="map" class="p-2 border rounded">
            <option v-for="m in mapData" :key="m.name" :value="m">
              {{ m.displayName }}
            </option>
          </select>
        </div>

        <!-- Hero Bans Selection -->
        <div class="flex flex-col gap-1">
          <label class="text-sm font-bold text-gray-700">Hero Bans</label>
          <div class="flex gap-2">
            <select v-model="heroBans[0]" class="p-2 border rounded w-full">
              <option v-for="h in heroData" :key="h.name" :value="h">
                {{ h.displayName }}
              </option>
            </select>
            <select v-model="heroBans[1]" class="p-2 border rounded w-full">
              <option v-for="h in heroData" :key="h.name" :value="h">
                {{ h.displayName }}
              </option>
            </select>
          </div>
        </div>

        <!-- Code Input -->
        <div class="flex flex-col gap-1">
          <label class="text-sm font-bold text-gray-700">Code</label>
          <input type="text" v-model="code" class="p-2 border rounded w-full" />
        </div>

        <!-- Score Input -->
        <div class="flex flex-col gap-1">
          <label class="text-sm font-bold text-gray-700">Score (Us - Enemy)</label>
          <div class="flex gap-2 items-center">
            <input type="number" v-model="results[0]" class="p-2 border rounded w-20" min="0" />
            <span class="font-bold">-</span>
            <input type="number" v-model="results[1]" class="p-2 border rounded w-20" min="0" />
          </div>
        </div>

        <!-- Winning Team Selection -->
        <div class="flex flex-col gap-1">
          <label class="text-sm font-bold text-gray-700">Winning Team</label>
          <div class="flex gap-4">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" :value="0" v-model="winningTeam" />
              <span class="text-green-600 font-bold">Us</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" :value="1" v-model="winningTeam" />
              <span class="text-red-600 font-bold">Enemy</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" :value="2" v-model="winningTeam" />
              <span class="text-gray-600 font-bold">Draw</span>
            </label>
          </div>
        </div>

        <div class="mt-4 flex justify-end">
          <button @click="handleSubmit"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-bold">
            Submit
          </button>
        </div>

      </div>

    </Modal>


  </section>
</template>
