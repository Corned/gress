<script setup lang="ts">
import { heroData } from "~/lib/heroData";

interface Props {
  label: string;
  hero: keyof typeof heroData;
}

const props = defineProps<Props>();
</script>

<template>
  <button class="btn-base flex flex-row gap-2 border rounded-full pl-1 pr-3 py-1 items-center border-zinc-200 select-none bg-white
           hover:border-zinc-300">
    <img :src="heroData[props.hero].thumbnail" alt="" class="h-full rounded-full bg-zinc-300">
    <p class="font-semibold">{{ label }}</p>
  </button>
</template>
