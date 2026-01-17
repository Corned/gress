<script setup>
import { mapData } from '~/lib/mapData';
import { heroData } from '~/lib/heroData';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  isEditing: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'cancel']);

// Watch for score changes to auto-set winning team
watch(() => props.modelValue.results, (newVal) => {
  if (newVal[0] > newVal[1]) {
    props.modelValue.winningTeam = 0;
  } else if (newVal[0] < newVal[1]) {
    props.modelValue.winningTeam = 1;
  } else {
    props.modelValue.winningTeam = 2;
  }
}, { deep: true });

const handleSubmit = () => {
  emit('submit');
};
</script>

<template>


  <div class="flex flex-col gap-3">

    <!-- Map Selection -->
    <div class="flex flex-col gap-1">
      <label class="text-xs font-bold text-gray-500 uppercase">Map</label>
      <select v-model="modelValue.map" class="p-2 border rounded text-sm bg-white">
        <option v-for="m in mapData" :key="m.name" :value="m">
          {{ m.displayName }}
        </option>
      </select>
    </div>

    <!-- Hero Bans Selection -->
    <div class="flex flex-col gap-1">
      <label class="text-xs font-bold text-gray-500 uppercase">Hero Bans (Ours - Theirs)</label>
      <div class="flex gap-2">
        <select v-model="modelValue.heroBans[0]" class="p-2 border rounded w-full text-sm bg-white">
          <option v-for="h in heroData" :key="h.name" :value="h">
            {{ h.displayName }}
          </option>
        </select>
        <select v-model="modelValue.heroBans[1]" class="p-2 border rounded w-full text-sm bg-white">
          <option v-for="h in heroData" :key="h.name" :value="h">
            {{ h.displayName }}
          </option>
        </select>
      </div>
    </div>

    <!-- Code Input -->
    <div class="flex flex-col gap-1">
      <label class="text-xs font-bold text-gray-500 uppercase">Code</label>
      <input type="text" v-model="modelValue.code" class="p-2 border rounded w-full text-sm bg-white" maxlength="7"
        placeholder="GR3SS" />
    </div>

    <!-- Score Input -->
    <div class="flex flex-col gap-1">
      <label class="text-xs font-bold text-gray-500 uppercase">Score (Us - Enemy)</label>
      <div class="flex gap-2 items-center">
        <input type="number" v-model="modelValue.results[0]" class="p-2 border rounded w-full text-sm bg-white"
          min="0" />
        <span class="font-bold text-gray-400">-</span>
        <input type="number" v-model="modelValue.results[1]" class="p-2 border rounded w-full text-sm bg-white"
          min="0" />
      </div>
    </div>

    <!-- Winning Team Selection -->
    <div class="flex flex-col gap-1">
      <label class="text-xs font-bold text-gray-500 uppercase">Winning Team</label>
      <div class="flex flex-wrap gap-2 text-sm">
        <label class="flex items-center gap-2 cursor-pointer bg-white border rounded px-3 py-1 hover:bg-gray-50">
          <input type="radio" :value="0" v-model="modelValue.winningTeam" />
          <span class="text-green-600 font-bold">Us</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer bg-white border rounded px-3 py-1 hover:bg-gray-50">
          <input type="radio" :value="1" v-model="modelValue.winningTeam" />
          <span class="text-red-600 font-bold">Enemy</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer bg-white border rounded px-3 py-1 hover:bg-gray-50">
          <input type="radio" :value="2" v-model="modelValue.winningTeam" />
          <span class="text-gray-600 font-bold">Draw</span>
        </label>
      </div>
    </div>

    <div class="mt-2 flex gap-2">
      <button @click="handleSubmit"
        :class="['flex-1 px-4 py-2 text-white rounded transition font-bold text-sm shadow cursor-pointer', isEditing ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700']">
        {{ isEditing ? 'Update Entry' : 'Add Entry' }}
      </button>

      <button v-if="isEditing" @click="$emit('cancel')"
        class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition font-bold text-sm shadow cursor-pointer">
        Cancel
      </button>
    </div>

  </div>
</template>
