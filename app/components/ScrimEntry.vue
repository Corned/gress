<script setup>
  import { ref } from "vue";
  import { mapTypeIcons } from "~/lib/mapData";

  defineProps({
    map: {
      type: Object,
      required: true,
    },
    heroBans: {
      type: Array,
      required: true,
    },
    results: {
      type: Array,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    winningTeam: {
      type: Number,
      required: true,
    },
  });

  const isOpen = ref(false);
  const toggleOpen = () => {
    //isOpen.value = !isOpen.value;
  };
</script>


<template>
  <div :class="[isOpen ? 'h-auto' : 'h-16', 'overflow-hidden min-w-[640px]']">
    <div
      :class="[
        isOpen ? 'rounded-t-lg' : 'rounded-lg',
        'overflow-hidden relative flex flex-row gap-3 items-center h-16 p-4 z-20 select-none',
      ]"
      @click="toggleOpen"
    >
      <div
        class="bg-gradient-to-r from-black/60 via-black/40 to-transparent absolute inset-0 z-10 h-16"
      ></div>
      <img
        :src="map.thumbnail"
        alt="Map Type Icon"
        class="absolute object-cover w-full z-0 left-0 scale-105 blur-[1px]"
      />
      <img
        :src="mapTypeIcons[map.type]"
        alt="Map Type Icon"
        class="z-20 h-full drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]"
      />
      <p
        class="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)] font-bold text-xl uppercase text-center text-white z-20"
      >
        {{ map.displayName }}
      </p>
      <div class="flex-grow"></div>
      <!-- HERO BANS -->
      <div class="flex flex-row gap-2 z-20">
        <img
          v-for="hero in heroBans"
          :key="hero.name"
          :src="hero.thumbnail"
          :alt="hero.name"
          class="h-12 z-20 relative rounded-lg border-2 border-red-500 saturate-40"
        />
      </div>
      <p
        v-if="winningTeam === 0"
        class="uppercase bg-green-600 z-20 relative text-white font-bold font-mono! p-2 text rounded"
      >
        {{ results.join("-") }}
      </p>
      <p
        v-else-if="winningTeam === 1"
        class="uppercase bg-red-500 z-20 relative text-white font-bold font-mono! p-2 text rounded"
      >
        {{ results.join("-") }}
      </p>
      <p
        v-else-if="winningTeam === 2"
        class="uppercase bg-gray-500 z-20 relative text-white font-bold font-mono! p-2 text rounded"
      >
        {{ results.join("-") }}
      </p>
      <p
        class="uppercase bg-orange-500 z-20 relative text-white font-bold font-mono! p-2 text rounded"
      >
        {{ code }}
      </p>
    </div>
    <div class="h-32 bg-[#f0f0f0] rounded-b-lg flex items-center justify-center">
      <p>hello world</p>
    </div>
  </div>
</template>

