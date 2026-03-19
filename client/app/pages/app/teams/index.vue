<script setup lang="ts">
import { heroData } from '~/lib/heroData'

const teams = [
  {
    name: 'MRG Garnet',
    slug: 'mrg-garnet',
    rank: 'GM5',
    record: { wins: 18, losses: 5, draws: 2 },
    roster: [
      { name: 'Poke', hero: 'Reinhardt' as keyof typeof heroData, role: 'Tank' },
      { name: 'Tempo', hero: 'Sojourn' as keyof typeof heroData, role: 'DPS' },
      { name: 'Ceisses', hero: 'Tracer' as keyof typeof heroData, role: 'DPS' },
      { name: 'Kritzkrieg', hero: 'Kiriko' as keyof typeof heroData, role: 'Support' },
      { name: 'Ruby', hero: 'Lucio' as keyof typeof heroData, role: 'Support' },
    ],
  },
  {
    name: 'MRG Agate',
    slug: 'mrg-agate',
    rank: 'GM5',
    record: { wins: 14, losses: 9, draws: 2 },
    roster: [
      { name: 'Aether', hero: 'Sigma' as keyof typeof heroData, role: 'Tank' },
      { name: 'Noctis', hero: 'Genji' as keyof typeof heroData, role: 'DPS' },
      { name: 'Wavefront', hero: 'Sojourn' as keyof typeof heroData, role: 'DPS' },
      { name: 'Kairos', hero: 'Ana' as keyof typeof heroData, role: 'Support' },
      { name: 'Zephyr', hero: 'Lucio' as keyof typeof heroData, role: 'Support' },
    ],
  },
]
</script>

<template>
  <h1 class="text-3xl font-bold mb-6">My Teams</h1>

  <div class="grid grid-cols-[repeat(2,300px)] gap-5">
    <NuxtLink v-for="team in teams" :key="team.slug" :to="`/app/teams/${team.slug}`"
      class="rounded-xl border border-zinc-200 hover:border-zinc-300 transition-colors overflow-hidden block">
      <div class="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
        <div>
          <p class="text-lg font-bold text-zinc-900">{{ team.name }}</p>
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
    </NuxtLink>
  </div>
</template>
