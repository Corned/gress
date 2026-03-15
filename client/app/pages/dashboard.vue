<script setup lang="ts">
import { heroData } from '~/lib/heroData';
import { AppleIcon, UserIcon, AwardIcon, Calendar, ChartColumnStackedIcon, CrossIcon, SwordsIcon, ThumbsDownIcon, LayoutDashboardIcon, UsersIcon, TrophyIcon, BarChart2Icon, ClockIcon, SettingsIcon, Sword, Sidebar } from 'lucide-vue-next';
import MatchOverview from '~/components/MatchOverview.vue';

</script>

<template>
  <section id="page-container" class="w-full h-full grid grid-cols-[250px_auto] grid-rows-[80px_1fr] bg-zinc-100">
    <header class="grid place-items-center">
      <AppLogo class="select-none" size="text-[2rem]" />

    </header>
    <nav class="w-full h-full flex items-center justify-between py-4 pr-4 ">
      <div class="flex items-center h-full gap-4 ml-auto">
        <p class="text-lg font-semibold">Tempo#XXXXX</p>
        <img src="/assets/icon.png" alt="icon" class="h-full rounded" />
      </div>
    </nav>
    <aside class="flex flex-col gap-4 px-2">

      <div class="flex flex-col">
        <SidebarButton label="Dashboard" :icon="LayoutDashboardIcon" />
        <SidebarButton label="Teams" :icon="UsersIcon" />
        <SidebarButton label="Matches" :icon="SwordsIcon" />
        <SidebarButton label="Rankings" :icon="TrophyIcon" />
        <SidebarButton label="Stats" :icon="BarChart2Icon" />
        <SidebarButton label="History" :icon="ClockIcon" />
      </div>

      <div class="flex flex-col">
        <SidebarButton label="Profile" :icon="UserIcon" />
        <SidebarButton label="Settings" :icon="SettingsIcon" />
      </div>

      <!--<input class="w-full rounded-md bg-zinc-200 px-3 py-1" placeholder="filter" />-->
      <!--<TreeNav />-->

      <footer class="w-full mt-auto flex justify-center items-center p-2">
        <p class="text-center text-sm font-semibold text-zinc-400">made with spite and hatred</p>
      </footer>
    </aside>



    <main class="col-span-1 row-span-2 bg-white p-6 rounded-tl-2xl  border-zinc-200">

      <h1 class="text-3xl font-bold mb-4">Dashboard</h1>
      <div id="team__players" class="flex flex-row gap-2 h-10 mb-2">
        <HeroLabelButton label="Poke" hero="Reinhardt" />
        <HeroLabelButton label="Tempo" hero="Sojourn" />
        <HeroLabelButton label="Ceisses" hero="Tracer" />
        <HeroLabelButton label="Kritzkrieg" hero="Kiriko" />
        <HeroLabelButton label="Ruby" hero="Lucio" />
      </div>
      <div id="team__staff" class="flex flex-row gap-2 h-10 mb-8">
        <HeroLabelButton label="MoodyRat" hero="Ana" />
        <HeroLabelButton label="Dumda" hero="WreckingBall" />
      </div>

      <h2 class="text-2xl font-semibold mb-4">Recent matches</h2>

      <!--  -->

      <div class="mb-2">
        <div class="flex flex-row gap-2 mb-2 items-center">
          <IconLabelButton label="Simple" :icon="AppleIcon" />
          <IconLabelButton label="Detailed" :icon="ChartColumnStackedIcon" />
          <div class="w-px h-6 bg-zinc-200 hidden"></div>
        </div>

        <div class="flex flex-row gap-2">
          <MatchOverview />
          <MatchOverview />
          <MatchOverview />
        </div>
      </div>

    </main>
  </section>
</template>
