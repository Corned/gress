<script setup>
const props = defineProps({
  code: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <p class="uppercase bg-orange-500 z-20 relative text-white font-bold font-mono! p-2 text rounded h-full">
    <span v-if="code">{{ code }}</span>
    <span v-else class="opacity-50">gr3ss</span>
  </p>
</template>
