<template>
  <button class="relative rounded-lg overflow-hidden cursor-pointer p-3">
    <img :src="`/assets/images/maps/${background}.webp`" :alt="`${background}-${label}`"
      class="object-cover absolute z-0 top-0 left-0 w-full h-full scale-110 brightness-110" />
    <div class="text-center font-medium text-white text-2xl relative backdrop-blur-md bg-black/10 rounded-md p-4">
      <p class="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{{ label }}</p>
    </div>
  </button>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  background: {
    type: String,
    required: true
  }
})
</script>