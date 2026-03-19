<script setup lang="ts">
import type { Team } from '~/composables/useTeams'
import { heroData } from '~/lib/heroData'

const { teams, deleteTeam } = useTeams()

const modalOpen = ref(false)
const editingTeam = ref<Team | undefined>()

const openCreate = () => {
  editingTeam.value = undefined
  modalOpen.value = true
}

const openEdit = (team: Team) => {
  editingTeam.value = team
  modalOpen.value = true
}

const confirmDelete = (team: Team) => {
  if (window.confirm(`Delete "${team.name}"? This cannot be undone.`)) {
    deleteTeam(team.id)
  }
}
</script>

<template>
  <div class="flex items-center justify-between mb-6">
    <h1 class="text-3xl font-bold">Manager</h1>
    <UButton color="neutral" variant="outline" icon="i-lucide-plus" @click="openCreate">
      New Team
    </UButton>
  </div>

  <div v-if="teams.length" class="grid grid-cols-[repeat(2,300px)] gap-5">
    <div v-for="team in teams" :key="team.id"
      class="rounded-xl border border-zinc-200 overflow-hidden">

      <div class="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
        <div>
          <p class="text-lg font-bold">{{ team.name }}</p>
          <p class="text-sm text-zinc-400">{{ team.record.wins }}W · {{ team.record.losses }}L · {{ team.record.draws }}D</p>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="text-sm font-bold text-zinc-400 tabular-nums mr-1">{{ team.rank }}</span>
          <UButton size="xs" variant="ghost" color="neutral" icon="i-lucide-pencil"
            @click="openEdit(team)" />
          <UButton size="xs" variant="ghost" color="neutral" icon="i-lucide-trash-2"
            @click="confirmDelete(team)" />
        </div>
      </div>

      <div class="px-5 py-4">
        <p class="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-3">Roster</p>
        <div v-if="team.roster.length" class="flex flex-col gap-2.5">
          <div v-for="player in team.roster" :key="player.name" class="flex items-center gap-3">
            <img :src="heroData[player.hero].thumbnail" :alt="heroData[player.hero].displayName"
              class="w-7 h-7 rounded-full bg-zinc-200 object-cover shrink-0" />
            <p class="text-sm font-semibold flex-1">{{ player.name }}</p>
            <p class="text-xs text-zinc-400">{{ player.role }}</p>
          </div>
        </div>
        <p v-else class="text-sm text-zinc-400">No players yet.</p>
      </div>
    </div>
  </div>

  <div v-else
    class="rounded-xl border-2 border-dashed border-zinc-200 px-8 py-12 text-center">
    <p class="text-sm font-semibold text-zinc-400">No teams yet.</p>
    <p class="text-sm text-zinc-400 mt-1">Create your first team to get started.</p>
  </div>

  <TeamFormModal v-model:open="modalOpen" :team="editingTeam" />
</template>
