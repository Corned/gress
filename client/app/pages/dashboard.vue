<script setup lang="ts">

</script>

<template>
  <section id="page-container" class="w-full h-full grid grid-cols-[250px_auto] grid-rows-[80px_1fr]">
    <header class="self-center w-full px-4">
      <p class="text-3xl font-bold">gress</p>
    </header>
    <nav class="w-full h-full flex items-center justify-between py-4 pr-4">
      <input class="w-96 h-full rounded-xl bg-gray-200 px-6" placeholder="Search..." />
      <div class="flex items-center h-full gap-4">
        <p class="text-lg font-semibold">Tempo#XXXXX</p>
        <img src="/assets/icon.png" alt="icon" class="h-full rounded" />
      </div>
    </nav>

    <aside class="col-span-1 flex flex-col gap-3 px-4">
      <button
        class="w-full h-12 rounded-md text-lg bg-gray-200 px-6 font-bold cursor-pointer hover:bg-gray-300 transition-colors duration-100">Dashboard</button>

      <!--<input class="w-full rounded-md bg-gray-200 px-3 py-1" placeholder="filter" />-->
      <TreeNav />

      <footer class="w-full mt-auto flex justify-center items-center p-2">
        <p class="text-center text-sm font-semibold text-gray-400">made with spite and hatred</p>
      </footer>
    </aside>

    <main class="col-span-1 row-span-2 bg-white rounded-tl-xl px-6 pt-10">
      <h1 class="text-3xl font-bold mb-4">Dashboard</h1>
      <h2 class="text-2xl font-semibold mb-4">Your recent matches</h2>

      <div class="flex flex-row gap-2">


        <RecentMatch />
        <RecentMatch />

      </div>
    </main>
  </section>
</template>
