<script setup lang="ts">
import { BarChart2, Users, Trophy, Swords, Map, TrendingUp, Shield } from 'lucide-vue-next'
</script>

<template>
  <section class="w-full min-h-screen flex flex-col items-center justify-center px-8 py-24">

    <!-- Hero -->
    <div class="flex flex-col items-center gap-5 text-center w-full max-w-2xl">
      <AppLogo size="text-[6rem]" />

      <p class="text-xl text-zinc-600 leading-relaxed font-medium">
        The scrim tracker built for Overwatch 2.
      </p>

      <!-- Feature pills -->
      <div class="flex items-center gap-2 flex-wrap justify-center">
        <FeaturePill label="Match history" :icon="BarChart2" />
        <FeaturePill label="Team scrims" :icon="Users" />
        <FeaturePill label="Rank tracking" :icon="Trophy" />
        <FeaturePill label="Map stats" :icon="Map" />
      </div>

      <!-- Auth buttons -->
      <div class="flex items-center justify-center gap-2 w-full max-w-lg mt-2">
        <NavButton label="Login with Battle.net" bg="bg-[#009ae7]" textColor="text-white" to="/dashboard" />
      </div>
    </div>

    <!-- Mode grid -->
    <!--
    <div class="w-full max-w-md mt-14">
      <p class="text-xs font-semibold text-zinc-400 tracking-widest uppercase text-center mb-4">Explore</p>
      <div class="grid grid-cols-2 gap-3">
        <CategoryButton label="5v5" background="kings_row" :disabled="true" />
        <CategoryButton label="Stadium" background="redwood_dam" :disabled="true" />
        <CategoryButton to="/entry" label="Scrims" background="lijiang_tower" :disabled="false" />
        <CategoryButton label="6v6" background="hanamura" :disabled="true" />
      </div>
    </div>
    -->

  </section>
</template>
