<script setup lang="ts">
import type { Component } from "vue";

interface Props {
  label: string;
  icon: Component;
}

const props = defineProps<Props>();
</script>

<template>
  <button class="flex flex-row gap-2 border rounded-md bg-white pl-3 pr-3 items-center border-zinc-300 select-none h-10
           transition-all duration-200 ease-in-out
           hover:cursor-pointer hover:-translate-y-0.5 hover:border-zinc-400">
    <component :is="icon" stroke-width="2" class="size-4 shrink-0" />
    <p v-if="label" class="font-semibold text-sm">{{ label }}</p>
  </button>
</template>
