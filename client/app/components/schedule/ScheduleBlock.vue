<script setup lang="ts">
const props = defineProps<{
  event: {
    type: 'scrim' | 'match' | 'coaching'
    timeStart: string
    timeEnd: string
    opponent?: string
  }
  editable?: boolean
}>()

const emit = defineEmits<{
  edit: []
}>()

const blockClass = () => ({
  scrim: 'bg-zinc-100 text-zinc-700',
  match: 'bg-zinc-900 text-white',
  coaching: 'bg-zinc-200 text-zinc-600',
}[props.event.type])

const editEvent = () => {
  if (!props.editable) return
  emit('edit')
}

const editableClass = () => props.editable ? 'cursor-pointer transition-all hover:brightness-90' : ''
</script>

<template>
  <div class="select-none relative rounded-xl flex flex-col p-2.5 gap-0.5 group"
    :class="[blockClass(), editableClass()]" @click="editEvent">
    <p class="text-xs font-bold capitalize">{{ event.type }}</p>
    <p class="text-xs opacity-60 tabular-nums">{{ event.timeStart }}–{{ event.timeEnd }}</p>
    <p v-if="event.opponent" class="text-xs opacity-80 truncate">vs {{ event.opponent }}</p>
  </div>
</template>
