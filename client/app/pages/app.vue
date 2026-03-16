<script setup lang="ts">

definePageMeta({ layout: "app" });

const route = useRoute()

const breadcrumbs = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  return segments.map((segment, i) => ({
    label: segment.charAt(0).toUpperCase() + segment.slice(1),
    to: i < segments.length - 1 ? '/' + segments.slice(0, i + 1).join('/') : undefined,
  }))
})

</script>

<template>
  <!--
    <div class="border-b border-zinc-300 pb-4 mb-4">
      <UBreadcrumb :items="breadcrumbs" />
    </div>
  -->
  <NuxtPage />
</template>
