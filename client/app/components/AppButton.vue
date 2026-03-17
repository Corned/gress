<script setup lang="ts">
interface Props {
  label: string
  bg?: string
  textColor?: string
}

withDefaults(defineProps<Props>(), {
  bg: 'bg-zinc-200',
  textColor: 'text-zinc-900',
})
</script>

<template>
  <button :class="[bg, textColor]" class="btn-base w-full h-12 rounded-lg px-6 font-bold select-none grid place-items-center">
    <span>{{ label }}</span>
  </button>
</template>
