<script setup lang="ts">
interface Props {
  label: string
  bg?: string
  textColor?: string
  to?: string
}

const props = withDefaults(defineProps<Props>(), {
  bg: 'bg-zinc-200/75',
  textColor: 'text-zinc-900',
})

const tag = computed(() => props.to ? resolveComponent('NuxtLink') : 'button')
</script>

<template>
  <component :is="tag" :to="props.to" :class="[bg, textColor]" class="w-full h-12 rounded-lg px-6 font-bold cursor-pointer select-none
           transition-all duration-150 hover:brightness-95 hover:-translate-y-px grid place-items-center">
    <span>{{ label }}</span>
  </component>
</template>
