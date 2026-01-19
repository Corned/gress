<script setup>
const props = defineProps({
  hasOverlay: {
    type: Boolean,
    required: true
  },
  code: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])

const copyCode = (code) => {
  navigator.clipboard.writeText(code)
  copyCodeButtonText.value = 'Copied! 📋'
  setTimeout(() => {
    copyCodeButtonText.value = 'Copy Code'
  }, 2000)
}

const copyCodeButtonText = ref('Copy Code')
</script>

<template>
  <div v-if="hasOverlay"
    class="absolute left-0 top-0 w-full h-full flex flex-row items-center justify-center gap-5 opacity-0 hover:opacity-100 transition z-50 backdrop-blur-[3px] backdrop-brightness-90 backdrop-saturate-10 bg-black/10">
    <!-- Edit Button -->
    <button @click="$emit('edit')"
      class="px-4 py-2 flex items-center justify-center bg-orange-500 text-white rounded-full shadow hover:bg-orange-600 cursor-pointer "
      title="Edit Entry">
      🖋️ Edit
    </button>
    <!-- Delete Button -->
    <button @click="$emit('delete')"
      class="px-4 py-2 flex items-center justify-center bg-red-500 text-white rounded-full shadow hover:bg-red-600 cursor-pointer"
      title="Delete Entry">
      🗑️ Delete
    </button>

    <button @click="copyCode(code)"
      class="px-4 py-2 flex items-center justify-center bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 cursor-pointer"
      title="Copy Code">
      {{ copyCodeButtonText }}
    </button>
  </div>

</template>