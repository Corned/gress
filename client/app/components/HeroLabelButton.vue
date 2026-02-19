<script setup lang="ts">
import { heroData } from "~/lib/heroData";

interface Props {
  label: string;
  hero: keyof typeof heroData;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="flex flex-row gap-2 border-2 rounded-full pl-1 pr-3 py-1 items-center border-gray-200 select-none">
    <img :src="heroData[props.hero].thumbnail" alt="" class="h-full rounded-full bg-gray-200">
    <p class="font-semibold">{{ label }}</p>
  </div>
</template>
