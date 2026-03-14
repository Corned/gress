<script setup lang="ts">
defineOptions({ inheritAttrs: false })

defineProps<{ to: string; label: string }>()
</script>

<template>
  <NuxtLink :to="to">
    <AppButton v-bind="$attrs" :label="label" />
  </NuxtLink>
</template>
