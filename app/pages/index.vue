
<template>
  <section>

    <div class="flex flex-col gap-10">
      <h1 class="text-7xl font-bold">gress</h1>
      <p class="text-lg text-gray-600">
        Built to track Overwatch rankings and scrimmage results.
      </p>

      <div class="grid grid-cols-3 gap-4">
        <CategoryButton label="5v5" background="kings_row" />
        <CategoryButton label="Stadium" background="redwood_dam" />
        <CategoryButton label="Scrims" background="lijiang_tower" />
        <CategoryButton label="6v6" background="hanamura" />
      </div>

    </div>

  </section>
</template>
