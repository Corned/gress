<script setup>
const props = defineProps({
  team1Score: {
    type: Number,
    required: true
  },
  team2Score: {
    type: Number,
    required: true
  },
  winningTeam: {
    type: Number,
    required: true
  }
})


const bgColor = computed(() => {
  if (props.winningTeam === 0) {
    return 'bg-green-600'
  } else if (props.winningTeam === 1) {
    return 'bg-red-500'
  } else {
    return 'bg-gray-500'
  }
})
</script>

<template>
  <p :class="bgColor" class="uppercase z-20 relative text-white font-bold font-mono! p-2 text rounded">
    {{ team1Score }}-{{ team2Score }}
  </p>
</template>
