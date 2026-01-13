<script setup>
const form = defineModel({ required: false })
</script>

<template>
  <div
    class="bg-gray-50 p-3 rounded-lg shadow-sm border border-gray-200 flex flex-wrap gap-4 items-end justify-between w-full max-w-5xl sticky top-4 z-40">

    <div class="flex items-end gap-3 flex-grow">
      <div class="flex flex-col gap-1 flex-1 min-w-[140px]">
        <label class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Your Team Name</label>
        <input type="text" v-model="form.myTeamName" class="p-2 border rounded w-full bg-white text-sm" />
      </div>

      <div class="flex flex-col gap-1 flex-1 min-w-[140px]">
        <label class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Enemy Team Name</label>
        <input type="text" v-model="form.enemyTeamName" class="p-2 border rounded w-full bg-white text-sm" />
      </div>

      <div class="flex flex-col gap-1 w-24">
        <label class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Skill Level</label>
        <input type="text" v-model="form.skillLevel" class="p-2 border rounded w-full bg-white text-sm" />
      </div>
    </div>
  </div>
</template>