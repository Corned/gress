<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const close = () => {
  emit('update:modelValue', false)
}
</script>

<template>
  <transition name="fade">
    <div v-if="modelValue" @click="close"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <transition appear name="scale">
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden" @click.stop>
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