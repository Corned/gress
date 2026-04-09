<script setup lang="ts">
import { heroData } from '~/lib/heroData'
import { mapData } from '~/lib/mapData'

const username = 'Tempo'

const { teams } = useTeams()

</script>

<template>
  <div class="mb-10">
    <h1 class="text-3xl font-bold">Hello, {{ username }}!</h1>
  </div>

  <section class="mb-10">
    <SectionHeader title="Here is your weekly calendar" class="mb-5" />
    <Calendar :teams="teams" />
  </section>

  <section class="mb-10">
    <SectionHeader title="Your Teams" class="mb-5" />

    <div class="flex gap-3">
      <ClickableCard v-for="team in teams" :key="team.slug" :to="`/app/teams/${team.slug}`"
        class="flex items-center gap-3 px-4 py-3">
        <div class="w-7 h-7 rounded-md bg-zinc-200 flex items-center justify-center shrink-0">
          <span class="text-xs font-bold text-zinc-700">{{ team.name.charAt(0) }}</span>
        </div>
        <span class="text-sm font-semibold">{{ team.name }}</span>
        <span class="text-xs font-semibold text-zinc-400 tabular-nums">{{ team.rank }}</span>
      </ClickableCard>
    </div>
  </section>
</template>
