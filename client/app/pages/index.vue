<script setup>
import { ref } from "vue";
import { mapData } from "~/lib/mapData";
import { heroData } from "~/lib/heroData";
import { toPng } from "html-to-image";

// Scrim data
const scrimInfo = useState("scrim-info", () => ({
  myTeamName: "My Team",
  enemyTeamName: "Enemy Team",
  skillLevel: "4200",
}));

const matchEntries = useState("scrim-match-data", () => []);

// Form state
const draftEntry = useState(() => ({
  map: mapData['LijiangTower'],
  heroBans: [heroData.Lucio, heroData.Dva],
  results: [0, 0],
  code: '',
  winningTeam: 0 // 0: Us, 1: Enemy, 2: Draw
}));

const editingIndex = ref(-1);
const isSnapshotting = ref(false);
const showEntryModal = ref(false);

const addScrimEntry = () => {
  if (editingIndex.value > -1) {
    // Update existing entry
    matchEntries.value[editingIndex.value] = {
      map: draftEntry.value.map,
      heroBans: [...draftEntry.value.heroBans],
      results: [...draftEntry.value.results],
      code: draftEntry.value.code,
      winningTeam: draftEntry.value.winningTeam,
    };
    cancelEdit();
  } else {
    // Add new entry
    matchEntries.value.push({
      map: draftEntry.value.map,
      heroBans: [...draftEntry.value.heroBans],
      results: [...draftEntry.value.results],
      code: draftEntry.value.code,
      winningTeam: draftEntry.value.winningTeam,
    });

    // Reset draft
    resetDraft();
    showEntryModal.value = false;
  }
};

const resetDraft = () => {
  draftEntry.value.map = mapData['LijiangTower'];
  draftEntry.value.heroBans = [heroData.Lucio, heroData.Dva];
  draftEntry.value.results = [0, 0];
  draftEntry.value.code = '';
  draftEntry.value.winningTeam = 2; // draw
}

const startEdit = (index) => {
  const entry = matchEntries.value[index];
  draftEntry.value = {
    map: entry.map,
    heroBans: [...entry.heroBans],
    results: [...entry.results],
    code: entry.code,
    winningTeam: entry.winningTeam
  };
  editingIndex.value = index;
  showEntryModal.value = true;
};

const cancelEdit = () => {
  editingIndex.value = -1;
  resetDraft();
  showEntryModal.value = false;
};

const removeScrimEntry = (index) => {
  matchEntries.value.splice(index, 1);
  if (editingIndex.value === index) {
    cancelEdit();
  } else if (editingIndex.value > index) {
    editingIndex.value--;
  }
};

const downloadAsPng = async () => {
  const element = document.getElementById('scrimDisplay');
  if (!element) return;

  isSnapshotting.value = true;
  // Wait for Vue reactivity to update DOM
  await nextTick();

  try {
    element.classList.toggle("transparent");
    const dataUrl = await toPng(element, { backgroundColor: null });
    element.classList.toggle("transparent");

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${scrimInfo.value.myTeamName}_vs_${scrimInfo.value.enemyTeamName}.png`;
    link.click();
  } catch (err) {
    console.error("Failed to download PNG", err);
  } finally {
    isSnapshotting.value = false;
  }
};
</script>


<template>
  <section class="flex flex-col gap-6 items-center">

    <!-- Control Bar & Actions -->

    <ScrimInfoForm v-model="scrimInfo" />


    <div class="flex gap-2">
      <button @click="showEntryModal = true"
        class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-bold shadow-sm cursor-pointer text-sm flex items-center gap-2">
        <span>+</span> Add Entry
      </button>

      <button @click="downloadAsPng"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-bold shadow-sm cursor-pointer text-sm flex items-center gap-2">
        <span>💾</span> Save Image
      </button>
    </div>




    <!-- Main Preview Area -->
    <div id="scrimDisplay" class="flex flex-col gap-2 transparent p-2 relative w-[640px] rounded-lg">
      <div v-if="scrimInfo.myTeamName || scrimInfo.enemyTeamName || scrimInfo.skillLevel"
        class="flex flex-row justify-between items-center">
        <div class="flex flex-col gap-0">
          <p v-if="scrimInfo.myTeamName"
            class="text-3xl text-white font-black drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)] leading-tight">
            {{ scrimInfo.myTeamName }}
          </p>
          <p v-if="scrimInfo.enemyTeamName"
            class="text-2xl text-white font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)] leading-tight">
            {{ 'vs. ' + scrimInfo.enemyTeamName }}
          </p>
        </div>
        <div>
          <p v-if="scrimInfo.skillLevel"
            class="text-6xl text-white font-black drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">
            {{ scrimInfo.skillLevel }}
          </p>
        </div>
      </div>

      <!-- Render Committed Entries -->

      <div v-for="(entry, i) in matchEntries" :key="i" class="relative group">
        <!-- Render Entry -->
        <ScrimEntry :map="editingIndex === i ? draftEntry.map : entry.map"
          :hero-bans="editingIndex === i ? draftEntry.heroBans : entry.heroBans"
          :results="editingIndex === i ? draftEntry.results : entry.results"
          :code="editingIndex === i ? draftEntry.code : entry.code"
          :winning-team="editingIndex === i ? draftEntry.winningTeam : entry.winningTeam" :has-overlay="!isSnapshotting"
          @edit="startEdit(i)" @delete="removeScrimEntry(i)" />
      </div>

      <p class="w-full text-center text-white font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">
        gress.tmp.ooo
      </p>
    </div>

    <!-- Edit/Add Modal -->
    <Modal v-model="showEntryModal">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4 border-b pb-2">
          <h2 class="text-xl font-bold text-gray-800 cursor-pointer">
            {{ editingIndex > -1 ? 'Edit Entry' : 'Add Scrim Entry' }}
          </h2>
          <button @click="showEntryModal = false" class="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <div class="flex flex-col gap-6">
          <div class="">
            <h2 class="font-bold text-gray-400 uppercase tracking-wider block mb-1">Preview</h2>
            <ScrimEntry :map="draftEntry.map" :hero-bans="draftEntry.heroBans" :results="draftEntry.results"
              :code="draftEntry.code" :winning-team="draftEntry.winningTeam" />
          </div>

          <ScrimEntryBuilder v-model="draftEntry" :isEditing="editingIndex > -1" @submit="addScrimEntry"
            @cancel="cancelEdit" />
        </div>
      </div>
    </Modal>

  </section>
</template>
