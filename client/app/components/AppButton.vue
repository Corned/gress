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
  <button :class="[bg, textColor]" class=" w-full h-12 rounded-lg px-6 font-bold cursor-pointer select-none
           transition-all duration-150 hover:brightness-95 hover:-translate-y-0.5 grid place-items-center">
    <span>{{ label }}</span>
  </button>
</template>
