<script setup lang="ts">
import type { EventType } from './types'
import { EVENT_TYPES, DAY_LONG } from './constants'
import { fmtRange } from './utils'

const props = defineProps<{
  draft: { start: Date; end: Date }
}>()

const emit = defineEmits<{
  close:   []
  confirm: [spec: { title: string; type: EventType; start: Date; end: Date }]
}>()

const title    = ref('')
const type     = ref<EventType>('scrim')
const inputRef = ref<HTMLInputElement>()

onMounted(() => nextTick(() => inputRef.value?.focus()))

function onKeyDown(ev: KeyboardEvent) {
  if (ev.key === 'Escape') emit('close')
  if (ev.key === 'Enter') submit()
}
onMounted(() => window.addEventListener('keydown', onKeyDown))
onUnmounted(() => window.removeEventListener('keydown', onKeyDown))

function submit() {
  if (!title.value.trim()) return
  emit('confirm', { title: title.value.trim(), type: type.value, start: props.draft.start, end: props.draft.end })
}

const dayLabel = computed(() => {
  const dow = (props.draft.start.getDay() + 6) % 7
  return `${DAY_LONG[dow]} · ${fmtRange(props.draft.start, props.draft.end)}`
})
</script>

<template>
  <div class="fixed inset-0 z-[50]" @click="emit('close')" />
  <div
    class="fixed z-[51] w-64 bg-white rounded-xl border border-zinc-200 p-3"
    style="top: 50%; left: 50%; transform: translate(-50%, -50%); box-shadow: 0 16px 40px -10px oklch(0 0 0 / 0.2);"
    @click.stop
  >
    <div class="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2.5">
      New · {{ dayLabel }}
    </div>

    <input
      ref="inputRef"
      v-model="title"
      type="text"
      placeholder="Event title"
      class="w-full border border-zinc-200 rounded-md px-2 py-1.5 text-[13px] outline-none mb-2.5 font-[inherit]"
      style="transition: border-color 0.1s, box-shadow 0.1s;"
      @focus="($event.target as HTMLInputElement).style.cssText += '; border-color: oklch(0.6 0.2 25); box-shadow: 0 0 0 2px oklch(0.6 0.2 25 / 0.15);'"
      @blur="($event.target as HTMLInputElement).style.cssText += '; border-color: #e4e4e7; box-shadow: none;'"
    />

    <div class="grid grid-cols-2 gap-1 mb-2.5">
      <button
        v-for="(t, k) in EVENT_TYPES" :key="k"
        class="flex flex-col items-center gap-1 border rounded-md p-2 text-[11px] font-medium"
        :class="type === k
          ? 'border-zinc-800 text-zinc-800 bg-zinc-50'
          : 'border-zinc-200 text-zinc-400 bg-white hover:bg-zinc-50'"
        @click="type = k as EventType"
      >
        <span class="w-2.5 h-2.5 rounded-sm" :style="{ background: t.fill }" />
        {{ t.label }}
      </button>
    </div>

    <div class="flex gap-1.5">
      <button
        class="flex-1 px-3 py-1.5 rounded-lg border border-zinc-200 text-[13px] font-medium text-zinc-600 hover:bg-zinc-50"
        @click="emit('close')"
      >Cancel</button>
      <button
        class="flex-1 px-3 py-1.5 rounded-lg text-[13px] font-medium text-white"
        :class="title.trim() ? 'bg-zinc-900 hover:bg-zinc-700' : 'bg-zinc-300 cursor-not-allowed'"
        @click="submit"
      >Add</button>
    </div>
  </div>
</template>
