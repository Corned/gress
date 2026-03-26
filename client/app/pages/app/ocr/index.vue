<script setup lang="ts">
const isDragging = ref(false)
const imageUrl = ref<string | null>(null)
const imageBase64 = ref<string | null>(null)
const imageMediaType = ref('image/png')
const isProcessing = ref(false)
const result = ref<string | null>(null)
const error = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

function loadFile(file: File) {
  if (!file.type.startsWith('image/')) return
  result.value = null
  error.value = null
  imageMediaType.value = file.type || 'image/png'
  imageUrl.value = URL.createObjectURL(file)

  const reader = new FileReader()
  reader.onload = (e) => {
    const dataUrl = e.target?.result as string
    // strip "data:image/png;base64," prefix
    imageBase64.value = dataUrl.split(',')[1] ?? null
  }
  reader.readAsDataURL(file)
}

function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) loadFile(file)
}

function onDrop(e: DragEvent) {
  isDragging.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file) loadFile(file)
}

async function runOCR() {
  if (!imageBase64.value) return
  isProcessing.value = true
  result.value = null
  error.value = null

  try {
    const data = await $fetch<{ text: string; error?: string }>('/api/ocr', {
      method: 'POST',
      body: { image: imageBase64.value, mediaType: imageMediaType.value },
    })
    result.value = data.text
  } catch (e: any) {
    error.value = e?.data?.error ?? 'Something went wrong.'
  } finally {
    isProcessing.value = false
  }
}

function copyResult() {
  if (result.value) navigator.clipboard.writeText(result.value)
}

function reset() {
  imageUrl.value = null
  imageBase64.value = null
  result.value = null
  error.value = null
  isProcessing.value = false
  if (fileInput.value) fileInput.value.value = ''
}
</script>

<template>
  <div class="mb-8">
    <p class="text-sm font-semibold text-zinc-400 mb-1">Tools</p>
    <h1 class="text-3xl font-bold">OCR Test</h1>
  </div>

  <div class="grid grid-cols-2 gap-6">
    <!-- Left: upload -->
    <div class="flex flex-col gap-4">
      <div
        class="relative rounded-xl border-2 border-dashed transition-colors cursor-pointer flex flex-col items-center justify-center min-h-64 overflow-hidden"
        :class="isDragging ? 'border-zinc-400 bg-zinc-100' : 'border-zinc-300 bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-400'"
        @dragover.prevent="isDragging = true"
        @dragleave="isDragging = false"
        @drop.prevent="onDrop"
        @click="fileInput?.click()"
      >
        <template v-if="imageUrl">
          <img :src="imageUrl" alt="Uploaded" class="w-full h-full object-contain max-h-96" />
        </template>
        <template v-else>
          <div class="text-zinc-400 text-center px-6 select-none">
            <p class="text-sm font-semibold mb-1">Drop an image here</p>
            <p class="text-xs">or click to browse</p>
          </div>
        </template>

        <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onFileChange" />
      </div>

      <div class="flex gap-2">
        <button
          class="flex-1 rounded-lg bg-zinc-900 text-white text-sm font-semibold px-4 py-2.5 hover:bg-zinc-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          :disabled="!imageBase64 || isProcessing"
          @click="runOCR"
        >
          {{ isProcessing ? 'Reading…' : 'Read Text' }}
        </button>
        <button
          v-if="imageUrl"
          class="rounded-lg border border-zinc-200 text-sm font-semibold px-4 py-2.5 hover:bg-zinc-100 transition-colors"
          @click="reset"
        >
          Clear
        </button>
      </div>
    </div>

    <!-- Right: result -->
    <div class="flex flex-col gap-3">
      <div class="flex items-center justify-between">
        <p class="text-sm font-semibold text-zinc-500">Extracted Text</p>
        <button
          v-if="result"
          class="text-xs font-semibold text-zinc-400 hover:text-zinc-700 transition-colors"
          @click="copyResult"
        >
          Copy
        </button>
      </div>

      <div class="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 p-4 min-h-64">
        <template v-if="isProcessing">
          <div class="flex items-center justify-center h-full">
            <p class="text-sm text-zinc-400">Asking Claude…</p>
          </div>
        </template>
        <template v-else-if="error">
          <p class="text-sm text-red-500">{{ error }}</p>
        </template>
        <template v-else-if="result">
          <pre class="text-sm text-zinc-700 whitespace-pre-wrap font-sans">{{ result }}</pre>
        </template>
        <template v-else>
          <p class="text-sm text-zinc-400">Results will appear here.</p>
        </template>
      </div>
    </div>
  </div>
</template>
