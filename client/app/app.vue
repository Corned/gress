<script setup>
const appConfig = useAppConfig()
console.log({ appConfig });


</script>

<template>
  <div class="w-full h-screen">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
