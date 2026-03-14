<script setup lang="ts">
import { heroData } from "~/lib/heroData";

interface Props {
  label: string;
  hero: keyof typeof heroData;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="flex flex-row gap-2 border rounded-full pl-1 pr-3 py-1 items-center border-zinc-300 select-none bg-white
           transition-all duration-200 ease-in-out
           hover:cursor-pointer hover:-translate-y-0.5 hover:border-zinc-400">
    <img :src="heroData[props.hero].thumbnail" alt="" class="h-full rounded-full bg-zinc-300">
    <p class="font-semibold">{{ label }}</p>
  </div>
</template>
