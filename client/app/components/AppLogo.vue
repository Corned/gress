<script setup lang="ts">
interface Props {
  size?: string
}

withDefaults(defineProps<Props>(), {
  size: 'text-3xl'
})
</script>

<template>
  <div class="flex items-baseline select-none">
    <span :class="[size, 'font-bold text-zinc-300']">open</span>
    <span :class="[size, 'font-bold text-zinc-950']">Bench</span>
  </div>
</template>
