<script setup lang="ts">
import { heroData } from '~/lib/heroData'

defineProps<{
  member: {
    name: string
    role: string
    hero: string
  }
}>()
</script>

<template>
  <div class="relative overflow-hidden rounded-xl px-3 py-2 flex flex-col justify-end min-h-16">
    <img :src="heroData[member.hero].thumbnail" alt="" class="absolute inset-0 w-full h-full object-cover scale-150" />
    <div class="absolute inset-0 bg-linear-to-t from-zinc-900/80 to-zinc-900/20" />
    <div class="relative flex flex-col">
      <p class="font-semibold text-white text-sm leading-tight">{{ member.name }}</p>
      <span class="text-[10px] font-semibold uppercase tracking-wide text-zinc-300 leading-tight">{{ member.role }}</span>
    </div>
  </div>
</template>
