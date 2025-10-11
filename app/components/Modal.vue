<script setup lang="ts">
const open = ref(true)

</script>

<template>
  <button @click="open = true">Open Modal</button>
  <transition name="fade">
    <div
      v-if="open"
      @click="open = false"
      class="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-50 flex items-center justify-center"
    >
      <transition appear name="transition">
        <div class="bg-[#f0f0f0] rounded-xl shadow-lg w-fit p-3 relative" @click.stop>
          <slot />
        </div>
      </transition>
    </div>
  </transition>
</template>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }


  .transition-enter-active,
  .transition-leave-active {
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .transition-enter-to,
  .transition-leave-from {
    transform: translateY(0px)
  }

  .transition-enter-from,
  .transition-leave-to {
    transform: translateY(30px)
  }
</style>