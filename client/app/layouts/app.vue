<script setup lang="ts">
import {
  LayoutDashboardIcon,
  UsersIcon,
  SwordsIcon,
  TrophyIcon,
  BarChart2Icon,
  ClockIcon,
  UserIcon,
  SettingsIcon,
} from "lucide-vue-next";
</script>

<template>
  <section id="page-container" class="w-full h-full grid grid-cols-[250px_auto] grid-rows-[80px_1fr] bg-zinc-100">
    <header class="grid place-items-center">
      <AppLogo class="select-none" size="text-[2rem]" />
    </header>

    <nav class="w-full h-full flex items-center justify-between py-4 pr-4">
      <slot name="breadcrumb" />
      <div class="flex items-center h-full gap-4 ml-auto">
        <p class="text-lg font-semibold">Tempo#XXXXX</p>
        <img src="/assets/icon.png" alt="icon" class="h-full rounded" />
      </div>
    </nav>

    <aside class="flex flex-col px-2">
      <div class="flex flex-col gap-px mb-4">
        <SidebarButton label="Dashboard" :icon="LayoutDashboardIcon" to="/app/dashboard" />
        <SidebarButton label="Teams" :icon="UsersIcon" to="/app/teams" />
        <SidebarButton label="Matches" :icon="SwordsIcon" to="/app/matches" />
        <SidebarButton label="Rankings" :icon="TrophyIcon" to="/app/rankings" />
        <SidebarButton label="Stats" :icon="BarChart2Icon" to="/app/stats" />
        <SidebarButton label="History" :icon="ClockIcon" to="/app/history" />
      </div>

      <div class="flex flex-col gap-px">
        <SidebarButton label="Profile" :icon="UserIcon" to="/app/profile" />
        <SidebarButton label="Settings" :icon="SettingsIcon" to="/app/settings" />
      </div>

      <footer class="w-full mt-auto flex justify-center items-center p-2">
        <p class="text-center text-sm font-semibold text-zinc-400">made with spite and hatred</p>
      </footer>
    </aside>

    <main class="col-span-1 row-span-2 bg-white p-6 rounded-tl-2xl border-zinc-200 pt-10">
      <slot />
    </main>
  </section>
</template>
