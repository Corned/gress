<script setup lang="ts">
defineProps<{
  members: Array<{
    name: string
    role: string
    hero: string
  }>
}>()
</script>

<template>
  <div class="grid grid-cols-5 gap-2">
    <RosterCard v-for="member in members" :key="member.name" :member="member" />
  </div>
</template>
