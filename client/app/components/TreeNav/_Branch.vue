<script setup>
import Leaf from './_Leaf.vue'
import Branch from './_Branch.vue'

const props = defineProps({
  label: String,
  disabled: Boolean,
  children: {
    type: Array,
    default: () => []
  }
})

const isOpen = ref(false)

</script>

<template>
  <div class="flex flex-col">
    <button class="flex items-center justify-start rounded-[4px]" :disabled="disabled"
      :class="disabled ? 'text-black/20' : 'hover:text-black hover:underline cursor-pointer'" @click="isOpen = !isOpen">
      <p class="font-semibold">{{ label }}</p>
    </button>

    <div class="flex flex-row">

      <div class="w-[1px] bg-black/20 ml-1 mr-3 h-[calc(100%-0px)] self-center"></div>

      <div v-if="isOpen" class="flex flex-col w-full">
        <template v-for="(child, index) in children" :key="index">
          <div class="flex flex-col w-full">
            <Branch v-if="child.children" :label="child.label" :children="child.children" :disabled="child.disabled" />
            <Leaf v-else :label="child.label" :disabled="child.disabled" />
          </div>
        </template>

      </div>
    </div>
  </div>
</template>