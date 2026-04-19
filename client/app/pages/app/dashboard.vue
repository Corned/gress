<script setup lang="ts">
const username = 'Tempo'

const { teams } = useTeams()

const scrimsThisWeek = computed(() =>
  teams.flatMap(t => t.schedule).filter(e => e.type === 'scrim').length
)

const combinedRecord = computed(() =>
  teams.reduce((acc, t) => ({
    wins: acc.wins + t.record.wins,
    losses: acc.losses + t.record.losses,
  }), { wins: 0, losses: 0 })
)
</script>

<template>
  <div class="mb-10">
    <h1 class="text-3xl font-bold mb-4">Hello, {{ username }}!</h1>

  </div>

</template>
