<script setup lang="ts">
interface Props {
  size?: string
}

withDefaults(defineProps<Props>(), {
  size: 'text-3xl'
})
</script>

<template>
  <div class="flex items-baseline">
    <span :class="[size, 'font-bold text-zinc-300']">pro</span>
    <span :class="[size, 'font-bold text-zinc-950']">gress</span>
  </div>
</template>
