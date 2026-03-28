<script setup lang="ts">
import { PlusIcon } from 'lucide-vue-next'
import { heroData } from '~/lib/heroData'

const { teams } = useTeams()

const modalOpen = ref(false)
</script>

<template>
  <div class="flex items-center justify-between mb-6">
    <h1 class="text-3xl font-bold">My Teams</h1>
    <button
      class="flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-colors"
      @click="modalOpen = true"
    >
      <PlusIcon class="size-3.5" />
      New Team
    </button>
  </div>

  <div class="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
    <ClickableCard v-for="team in teams" :key="team.slug" :to="`/app/teams/${team.slug}`" class="block overflow-hidden">

      <!-- Banner -->
      <div class="relative h-24 overflow-hidden rounded-t-xl">
        <img
          v-if="team.roster[0]"
          :src="heroData[team.roster[0].hero].thumbnail"
          alt=""
          class="absolute inset-0 w-full h-full object-cover scale-150 blur-sm brightness-75"
        />
        <div class="absolute inset-0 bg-linear-to-t from-zinc-900/80 to-zinc-900/10" />
        <div class="absolute inset-x-0 bottom-0 px-4 py-3 flex items-end justify-between">
          <p class="text-white font-bold text-lg leading-tight">{{ team.name }}</p>
          <span class="text-xs font-bold tabular-nums text-white/60">{{ team.rank }}</span>
        </div>
      </div>

      <!-- Record + roster -->
      <div class="px-4 py-3 flex items-center justify-between">
        <div class="flex gap-4">
          <div class="flex flex-col items-center">
            <span class="text-sm font-bold tabular-nums text-zinc-900">{{ team.record.wins }}</span>
            <span class="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">W</span>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-sm font-bold tabular-nums text-zinc-900">{{ team.record.losses }}</span>
            <span class="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">L</span>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-sm font-bold tabular-nums text-zinc-900">{{ team.record.draws }}</span>
            <span class="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">D</span>
          </div>
        </div>

        <div class="flex items-center">
          <img
            v-for="(player, i) in team.roster.slice(0, 5)"
            :key="player.name"
            :src="heroData[player.hero].thumbnail"
            :alt="player.name"
            :style="{ zIndex: team.roster.length - i }"
            class="w-6 h-6 rounded-full object-cover ring-2 ring-white -ml-1.5 first:ml-0 bg-zinc-200"
          />
          <span
            v-if="team.roster.length > 5"
            class="w-6 h-6 rounded-full ring-2 ring-white -ml-1.5 bg-zinc-100 text-[10px] font-semibold text-zinc-500 grid place-items-center"
          >+{{ team.roster.length - 5 }}</span>
        </div>
      </div>

    </ClickableCard>
  </div>

  <TeamFormModal v-model:open="modalOpen" />
</template>
