<script setup>
import { ref } from "vue";
import { mapData } from "~/lib/mapData";
import { heroData } from "~/lib/heroData";
import { toPng } from "html-to-image";

const myTeamName = useState("scrim-my-team-name", () => "My Team");
const enemyTeamName = useState("scrim-enemy-team-name", () => "Enemy Team");
const skillLevel = useState("scrim-skill-level", () => "4200");

const testMatchData = useState("scrim-match-data", () => []);

// Initialize draft entry state
const draftEntry = ref({
  map: mapData['LijiangTower'],
  heroBans: [heroData.Lucio, heroData.Dva],
  results: [0, 0],
  code: '',
  winningTeam: 0 // 0: Us, 1: Enemy, 2: Draw
});

const editingIndex = ref(-1);
const isSnapshotting = ref(false);
const showEntryModal = ref(false);

const addScrimEntry = () => {
  if (editingIndex.value > -1) {
    // Update existing entry
    testMatchData.value[editingIndex.value] = {
      map: draftEntry.value.map,
      heroBans: [...draftEntry.value.heroBans],
      results: [...draftEntry.value.results],
      code: draftEntry.value.code,
      winningTeam: draftEntry.value.winningTeam,
    };
    cancelEdit();
  } else {
    // Add new entry
    testMatchData.value.push({
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
  draftEntry.value.results = [0, 0];
  draftEntry.value.code = '';
  draftEntry.value.winningTeam = 2; // draw
}

const startEdit = (index) => {
  const entry = testMatchData.value[index];
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
  testMatchData.value.splice(index, 1);
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
    // Temporarily hide delete buttons for screenshot if they are inside the element
    // With the new layout, delete buttons will be outside specific entries or handled via CSS classes if needed,
    // but here we are snapshotting #scrimDisplay. I'll ensure delete buttons are separate or hidden.
    const dataUrl = await toPng(element, { backgroundColor: null });
    element.classList.toggle("transparent");
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${myTeamName.value}_vs_${enemyTeamName.value}.png`;
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
    <div
      class="bg-gray-50 p-3 rounded-lg shadow-sm border border-gray-200 flex flex-wrap gap-4 items-end justify-between w-full max-w-5xl sticky top-4 z-40">

      <div class="flex items-end gap-3 flex-grow">
        <div class="flex flex-col gap-1 flex-1 min-w-[140px]">
          <label class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Your Team Name</label>
          <input type="text" v-model="myTeamName" class="p-2 border rounded w-full bg-white text-sm" />
        </div>

        <div class="flex flex-col gap-1 flex-1 min-w-[140px]">
          <label class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Enemy Team Name</label>
          <input type="text" v-model="enemyTeamName" class="p-2 border rounded w-full bg-white text-sm" />
        </div>

        <div class="flex flex-col gap-1 w-24">
          <label class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Skill Level</label>
          <input type="text" v-model="skillLevel" class="p-2 border rounded w-full bg-white text-sm" />
        </div>
      </div>

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

    </div>


    <!-- Main Preview Area -->
    <div id="scrimDisplay" class="flex flex-col gap-2 transparent p-2 relative w-[640px] rounded-lg">
      <div v-if="myTeamName || enemyTeamName || skillLevel" class="flex flex-row justify-between items-center">
        <div class="flex flex-col gap-0">
          <p v-if="myTeamName"
            class="text-3xl text-white font-black drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)] leading-tight">
            {{ myTeamName }}
          </p>
          <p v-if="enemyTeamName"
            class="text-2xl text-white font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)] leading-tight">
            {{ 'vs. ' + enemyTeamName }}
          </p>
        </div>
        <div>
          <p v-if="skillLevel" class="text-6xl text-white font-black drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">
            {{ skillLevel }}
          </p>
        </div>
      </div>

      <!-- Render Committed Entries -->

      <div v-for="(entry, i) in testMatchData" :key="i" class="relative group">
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
