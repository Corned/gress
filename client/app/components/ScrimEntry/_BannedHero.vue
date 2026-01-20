<script setup>
defineProps({
  hero: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <img :src="hero.thumbnail" :alt="hero.name"
    class="h-12 z-20 relative rounded-lg border-2 border-red-500 saturate-40" />
</template>