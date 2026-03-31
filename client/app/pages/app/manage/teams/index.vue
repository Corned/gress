<script setup lang="ts">
import type { Team } from '~/composables/useTeams'

const { teams, deleteTeam } = useTeams()

const modalOpen = ref(false)

const confirmDelete = (team: Team) => {
  if (window.confirm(`Delete "${team.name}"? This cannot be undone.`)) {
    deleteTeam(team.id)
  }
}
</script>

<template>
  <div class="flex items-center justify-between mb-6">
    <h1 class="text-3xl font-bold">Teams</h1>
    <UButton color="neutral" variant="outline" icon="i-lucide-plus" @click="modalOpen = true">
      New Team
    </UButton>
  </div>

  <div v-if="teams.length" class="flex flex-col gap-2">
    <div v-for="team in teams" :key="team.id"
      class="flex items-center justify-between px-4 py-3 rounded-xl border border-zinc-200">
      <p class="font-semibold">{{ team.name }}</p>
      <div class="flex items-center gap-1.5">
        <span class="text-sm font-bold text-zinc-400 tabular-nums mr-1">{{ team.rank }}</span>
        <UButton size="xs" variant="ghost" color="neutral" icon="i-lucide-pencil"
          :to="`/app/teams/${team.slug}/edit`" />
        <UButton size="xs" variant="ghost" color="neutral" icon="i-lucide-trash-2" @click="confirmDelete(team)" />
      </div>
    </div>
  </div>

  <div v-else class="rounded-xl border-2 border-dashed border-zinc-200 px-8 py-12 text-center">
    <p class="text-sm font-semibold text-zinc-400">No teams yet.</p>
    <p class="text-sm text-zinc-400 mt-1">Create your first team to get started.</p>
  </div>

  <TeamFormModal v-model:open="modalOpen" />
</template>
