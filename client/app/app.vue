<script setup>
const appConfig = useAppConfig()
console.log({ appConfig });


</script>

<template>
  <div>
    <!--     <nav
      class="m-10 flex gap-2 items-center h-16 rounded-lg bg-white p-2 pl-8 backdrop-blur-2xl shadow mx-auto max-w-[1000px]"
    >
      <p class="text-2xl font-bold">gress</p>

      <div class="flex-grow"></div>

      <div
        class="flex flex-row items-center rounded px-2 gap-1 h-full cursor-pointer hover:bg-gray-300 transition"
      >
        <p class="select-none font-semibold">Username#12345</p>
      </div>
      <img
        src="/assets/icon.png"
        alt="icon"
        class="h-full aspect-square rounded"
      />
    </nav> -->

    <NuxtPage class="max-w-2xl mx-auto mt-10" />
  </div>
</template>
