<script setup lang="ts">
import { heroData } from "~/lib/heroData";

interface Props {
  label: string;
  hero: keyof typeof heroData;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="flex flex-row gap-2 border-2 rounded-full pl-1 pr-3 py-1 items-center border-zinc-200 select-none bg-white
           transition-all duration-200 ease-in-out
           hover:cursor-pointer hover:-translate-y-0.5 hover:shadow-md hover:border-zinc-300">
    <img :src="heroData[props.hero].thumbnail" alt="" class="h-full rounded-full bg-zinc-200">
    <p class="font-semibold">{{ label }}</p>
  </div>
</template>
