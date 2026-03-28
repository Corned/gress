<script setup lang="ts">
const mainNavItems = [
  { label: 'Dashboard', icon: 'i-lucide-layout-dashboard', to: '/app/dashboard' },
  { label: 'My Teams', icon: 'i-lucide-users-round', to: '/app/teams' },
  { label: 'Manager', icon: 'i-lucide-shield-check', to: '/app/manage' },
]

const { teams } = useTeams()

const bottomNavItems = [
  [
    { label: 'Profile', icon: 'i-lucide-user', to: '/app/profile' },
    { label: 'Settings', icon: 'i-lucide-settings', to: '/app/settings' },
  ],
]
</script>

<template>
  <UDashboardGroup>
    <UDashboardSidebar class="w-64" :ui="{ header: 'px-2 h-24', body: 'px-2 flex flex-col gap-4', footer: 'px-2' }">
      <template #header>
        <div class="w-full grid place-items-center">
          <AppLogo class="" size="text-[2rem]" />
        </div>
      </template>

      <UNavigationMenu orientation="vertical" variant="pill" color="neutral" :items="[mainNavItems]"
        :ui="{ linkLabel: 'font-semibold', childLinkLabel: 'font-semibold' }" />

      <div class="flex flex-col gap-0.5">
        <p class="px-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Teams</p>
        <NuxtLink v-for="team in teams" :key="team.slug" :to="`/app/teams/${team.slug}`"
          class="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-zinc-100 transition-colors"
          active-class="bg-zinc-100">
          <div class="w-7 h-7 rounded-md bg-zinc-200 flex items-center justify-center shrink-0">
            <span class="text-xs font-bold text-zinc-700">{{ team.name.charAt(0) }}</span>
          </div>
          <span class="text-sm font-semibold text-zinc-700 truncate flex-1">{{ team.name }}</span>
          <span class="text-xs font-semibold text-zinc-400 tabular-nums">{{ team.rank }}</span>
        </NuxtLink>
      </div>

      <div class="mt-auto">
        <UNavigationMenu orientation="vertical" variant="pill" color="neutral" :items="bottomNavItems"
          :ui="{ linkLabel: 'font-semibold', childLinkLabel: 'font-semibold' }" />
      </div>

      <template #footer>
        <div class="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 flex items-center gap-3">
          <img src="/assets/icon.png" alt="icon" class="w-8 h-8 rounded-md shrink-0" />
          <div class="flex flex-col min-w-0">
            <p class="text-sm font-semibold text-zinc-900 leading-tight truncate">Tempo</p>
            <p class="text-xs text-zinc-400 leading-tight truncate">#12345</p>
          </div>
        </div>
      </template>
    </UDashboardSidebar>

    <UDashboardPanel>
      <template #header>
        <UDashboardNavbar>
          <template #left>
            <slot name="breadcrumb" />
          </template>
        </UDashboardNavbar>
      </template>

      <div class="flex flex-col p-6 pt-10 items-center overflow-y-auto h-full w-full">
        <div class="w-3xl  h-full">
          <slot />
        </div>
      </div>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
