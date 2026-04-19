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
    <div class="flex gap-2">
      <span class="text-xs font-semibold px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-500">
        {{ teams.length }} team{{ teams.length !== 1 ? 's' : '' }}
      </span>
      <span class="text-xs font-semibold px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-500">
        {{ scrimsThisWeek }} scrim{{ scrimsThisWeek !== 1 ? 's' : '' }} this week
      </span>
      <span class="text-xs font-semibold px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-500">
        {{ combinedRecord.wins }}W {{ combinedRecord.losses }}L
      </span>
    </div>
  </div>

</template>
