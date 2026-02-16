<script setup>

const props = defineProps({
  label: String,
  disabled: Boolean
})

const emit = defineEmits(['click'])

</script>

<template>
  <button class="flex items-center justify-start rounded-[4px]" :disabled="disabled"
    :class="disabled ? 'text-black/20' : 'hover:text-black hover:underline cursor-pointer'" @click="emit('click')">
    <p class="font-semibold">{{ label }}</p>
  </button>
</template>