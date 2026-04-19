<script setup lang="ts">
</script>

<template>
  <UDashboardGroup>
    <AppSidebar />

    <UDashboardPanel>
      <div class="flex flex-col p-6 pt-8 overflow-y-auto h-full w-full">
        <div class="w-4xl h-full">
          <slot />
        </div>
      </div>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
