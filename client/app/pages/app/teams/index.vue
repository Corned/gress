<script setup lang="ts">
import { heroData } from '~/lib/heroData'

const { teams } = useTeams()

</script>

<template>
  <h1 class="text-3xl font-bold mb-6">My Teams</h1>

  <div class="grid grid-cols-[repeat(2,300px)] gap-5">
    <ClickableCard v-for="team in teams" :key="team.slug" :to="`/app/teams/${team.slug}`" class="overflow-hidden block">
      <div class="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
        <div>
          <p class="text-lg font-bold">{{ team.name }}</p>
          <p class="text-sm text-zinc-400">{{ team.record.wins }}W · {{ team.record.losses }}L · {{ team.record.draws
          }}D</p>
        </div>
        <span class="text-sm font-bold text-zinc-500 tabular-nums">{{ team.rank }}</span>
      </div>

      <div class="px-5 py-4">
        <p class="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-3">Roster</p>
        <div class="flex flex-col gap-2.5">
          <div v-for="player in team.roster" :key="player.name" class="flex items-center gap-3">
            <img :src="heroData[player.hero].thumbnail" :alt="heroData[player.hero].displayName"
              class="w-7 h-7 rounded-full bg-zinc-200 object-cover shrink-0" />
            <p class="text-sm font-semibold text-zinc-800 flex-1">{{ player.name }}</p>
            <p class="text-xs text-zinc-400">{{ player.role }}</p>
          </div>
        </div>
      </div>
    </ClickableCard>
  </div>
</template>
