<template>
  <section class="w-full h-full flex flex-col justify-center">
    <div class="flex flex-col gap-10 mb-20">
      <h1 class="text-7xl font-bold text-[#0d1019] text-center mt-20">gress</h1>
      <p class="text-lg text-gray-600 text-center">
        Built to track Overwatch rankings and scrimmage results.
      </p>

      <div class="grid grid-cols-3 gap-4">
        <CategoryButton label="5v5" background="kings_row" :disabled="true" />
        <CategoryButton label="Stadium" background="redwood_dam" :disabled="true" />
        <CategoryButton to="/entry" label="Scrims" background="lijiang_tower" :disabled="false" />
        <CategoryButton label="6v6" background="hanamura" :disabled="true" />
      </div>
    </div>
  </section>
</template>
