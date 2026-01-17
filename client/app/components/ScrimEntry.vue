<script setup>
import { ref } from "vue";
import { mapTypeIcons } from "~/lib/mapData";

defineProps({
  map: {
    type: Object,
    required: true,
  },
  heroBans: {
    type: Array,
    required: true,
  },
  results: {
    type: Array,
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
    <div v-if="hasOverlay"
      class="absolute left-0 top-0 w-full h-full flex flex-row items-center justify-center gap-5 opacity-0 group-hover:opacity-100 transition z-50 backdrop-blur-[3px] backdrop-brightness-90 backdrop-saturate-10 bg-black/10">
      <!-- Edit Button -->
      <button @click="$emit('edit')"
        class="px-4 py-2 flex items-center justify-center bg-orange-500 text-white rounded-full shadow hover:bg-orange-600 cursor-pointer "
        title="Edit Entry">
        🖋️ Edit
      </button>
      <!-- Delete Button -->
      <button @click="$emit('delete')"
        class="px-4 py-2 flex items-center justify-center bg-red-500 text-white rounded-full shadow hover:bg-red-600 cursor-pointer"
        title="Delete Entry">
        🗑️ Delete
      </button>
    </div>

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
        <img v-for="hero in heroBans" :key="hero.name" :src="hero.thumbnail" :alt="hero.name"
          class="h-12 z-20 relative rounded-lg border-2 border-red-500 saturate-40" />
      </div>
      <p v-if="winningTeam === 0"
        class="uppercase bg-green-600 z-20 relative text-white font-bold font-mono! p-2 text rounded">
        {{ results.join("-") }}
      </p>
      <p v-else-if="winningTeam === 1"
        class="uppercase bg-red-500 z-20 relative text-white font-bold font-mono! p-2 text rounded">
        {{ results.join("-") }}
      </p>
      <p v-else-if="winningTeam === 2"
        class="uppercase bg-gray-500 z-20 relative text-white font-bold font-mono! p-2 text rounded">
        {{ results.join("-") }}
      </p>
      <p class="uppercase bg-orange-500 z-20 relative text-white font-bold font-mono! p-2 text rounded h-full">
        <span v-if="code">{{ code }}</span>
        <span v-else class="opacity-50">gr3ss</span>
      </p>
    </div>
  </div>
</template>
