<script setup lang="ts">
const props = defineProps({
  triggerText: {
    type: String,
    default: "Open Modal"
  }
})
const open = ref(false)

const close = () => {
  open.value = false;
}

defineExpose({
  close
})
</script>

<template>
  <div @click="open = true" class="w-fit h-fit">
    <slot name="trigger">
      <button>{{ triggerText }}</button>
    </slot>
  </div>
  <transition name="fade">
    <div v-if="open" @click="open = false"
      class="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-50 flex items-center justify-center">
      <transition appear name="transition">
        <div class="" @click.stop>
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