<script setup lang="ts">
import { heroData } from '~/lib/heroData'
import { mapData } from '~/lib/mapData'

const username = 'Tempo'

const rankedRoles = [
  { label: 'Tank', sr: 3194, rank: 'Diamond 4' },
  { label: 'Damage', sr: 3605, rank: 'Master 4' },
  { label: 'Support', sr: 3548, rank: 'Master 5' },
]

const rankedHeroes = [
  { hero: 'Reinhardt' as keyof typeof heroData, timePlayed: '42h', winRate: 66 },
  { hero: 'Sojourn' as keyof typeof heroData, timePlayed: '31h', winRate: 61 },
  { hero: 'Ana' as keyof typeof heroData, timePlayed: '18h', winRate: 63 },
  { hero: 'Sigma' as keyof typeof heroData, timePlayed: '28h', winRate: 58 },
]

const myTeams = [
  { name: 'MRG Garnet', slug: 'mrg-garnet', rank: 'GM5' },
  { name: 'MRG Agate', slug: 'mrg-agate', rank: 'GM5' },
]

const scrimRecord = { wins: 18, losses: 7, draws: 4 }

const scrimHeroes = [
  { hero: 'Reinhardt' as keyof typeof heroData, scrims: 22, winRate: 68 },
  { hero: 'Dva' as keyof typeof heroData, scrims: 14, winRate: 54 },
  { hero: 'Tracer' as keyof typeof heroData, scrims: 19, winRate: 58 },
  { hero: 'Kiriko' as keyof typeof heroData, scrims: 17, winRate: 62 },
]

const scrimMaps = [
  { map: 'KingsRow' as keyof typeof mapData, wins: 10, played: 14 },
  { map: 'Ilios' as keyof typeof mapData, wins: 8, played: 11 },
  { map: 'Eichenwalde' as keyof typeof mapData, wins: 7, played: 10 },
  { map: 'Nepal' as keyof typeof mapData, wins: 6, played: 9 },
  { map: 'BlizzardWorld' as keyof typeof mapData, wins: 5, played: 8 },
]
</script>

<template>
  <div class="mb-10">
    <p class="text-sm font-semibold text-zinc-400 mb-1">Welcome back</p>
    <h1 class="text-3xl font-bold">Hello, {{ username }}!</h1>
  </div>

  <!-- Ranked -->
  <section class="mb-10">
    <SectionHeader title="Ranked" class="mb-5" />

    <div class="grid grid-cols-3 gap-4">
      <div v-for="role in rankedRoles" :key="role.label" class="rounded-xl border border-zinc-200 px-5 py-4">
        <p class="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1">{{ role.label }}</p>
        <p class="text-3xl font-bold tabular-nums leading-none">{{ role.sr }}</p>
        <p class="text-sm text-zinc-400 mt-1">{{ role.rank }}</p>
      </div>
    </div>
  </section>

  <!-- Teams -->
  <section class="mb-10">
    <SectionHeader title="Your Teams" class="mb-5" />

    <div class="flex gap-3">
      <ClickableCard v-for="team in myTeams" :key="team.slug" :to="`/app/teams/${team.slug}`"
        class="flex items-center gap-3 px-4 py-3">
        <div class="w-7 h-7 rounded-md bg-zinc-200 flex items-center justify-center shrink-0">
          <span class="text-xs font-bold text-zinc-700">{{ team.name.charAt(0) }}</span>
        </div>
        <span class="text-sm font-semibold">{{ team.name }}</span>
        <span class="text-xs font-semibold text-zinc-400 tabular-nums">{{ team.rank }}</span>
      </ClickableCard>
    </div>
  </section>

  <!-- Scrims -->
  <section>
    <SectionHeader title="Scrims" class="mb-5" />

    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="rounded-xl border border-zinc-200 px-5 py-4">
        <p class="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1">Wins</p>
        <p class="text-3xl font-bold tabular-nums leading-none">{{ scrimRecord.wins }}</p>
      </div>
      <div class="rounded-xl border border-zinc-200 px-5 py-4">
        <p class="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1">Losses</p>
        <p class="text-3xl font-bold tabular-nums leading-none">{{ scrimRecord.losses }}</p>
      </div>
      <div class="rounded-xl border border-zinc-200 px-5 py-4">
        <p class="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1">Draws</p>
        <p class="text-3xl font-bold tabular-nums leading-none">{{ scrimRecord.draws }}</p>
      </div>
    </div>

    <p class="text-sm font-semibold text-zinc-500 mb-3">Best Maps</p>
    <div class="grid grid-cols-2 gap-2">
      <div v-for="entry in scrimMaps" :key="entry.map"
        class="flex items-center gap-3 rounded-xl border border-zinc-200 px-3 py-2.5 hover:bg-zinc-50 transition-colors">
        <img :src="mapData[entry.map].thumbnail" :alt="mapData[entry.map].displayName"
          class="w-14 h-10 object-cover shrink-0 rounded-md" />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold truncate">{{ mapData[entry.map].displayName }}</p>
          <p class="text-xs text-zinc-400">{{ entry.wins }}W – {{ entry.played - entry.wins }}L</p>
        </div>
        <p class="text-sm font-bold tabular-nums shrink-0">
          {{ Math.round(entry.wins / entry.played * 100) }}%
        </p>
      </div>
    </div>
  </section>
</template>
