<script setup lang="ts">
import { heroData } from '~/lib/heroData'
import type { Team, RosterPlayer } from '~/composables/useTeams'

const props = defineProps<{
  open: boolean
  team?: Team
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const { createTeam, updateTeam } = useTeams()

const isEditing = computed(() => !!props.team)

const name = ref('')
const rank = ref('')
const roster = ref<RosterPlayer[]>([])

const newPlayerName = ref('')
const newPlayerHero = ref<string>('Ana')

const heroOptions = Object.keys(heroData).sort().map(key => ({
  label: heroData[key as keyof typeof heroData].displayName,
  value: key,
}))

const newPlayerRole = computed(() => heroData[newPlayerHero.value as keyof typeof heroData]?.role ?? '')

watch(() => props.open, (open) => {
  if (!open) return
  if (props.team) {
    name.value = props.team.name
    rank.value = props.team.rank
    roster.value = props.team.roster.map(p => ({ ...p }))
  } else {
    name.value = ''
    rank.value = ''
    roster.value = []
  }
  newPlayerName.value = ''
  newPlayerHero.value = 'Ana'
})

const addPlayer = () => {
  if (!newPlayerName.value.trim()) return
  roster.value.push({
    name: newPlayerName.value.trim(),
    hero: newPlayerHero.value as keyof typeof heroData,
    role: newPlayerRole.value,
  })
  newPlayerName.value = ''
  newPlayerHero.value = 'Ana'
}

const removePlayer = (index: number) => {
  roster.value.splice(index, 1)
}

const save = () => {
  if (!name.value.trim()) return
  if (isEditing.value && props.team) {
    updateTeam(props.team.id, { name: name.value.trim(), rank: rank.value.trim(), roster: roster.value })
  } else {
    createTeam({ name: name.value.trim(), rank: rank.value.trim(), roster: roster.value })
  }
  emit('update:open', false)
}
</script>

<template>
  <UModal :open="open" @update:open="$emit('update:open', $event)">
    <template #content>
      <div class="p-6 flex flex-col gap-5">
        <h2 class="text-xl font-bold">{{ isEditing ? 'Edit Team' : 'New Team' }}</h2>

        <!-- Team info -->
        <div class="flex flex-col gap-3">
          <div>
            <label class="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1.5">Team Name</label>
            <UInput v-model="name" placeholder="e.g. MRG Garnet" />
          </div>
          <div>
            <label class="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1.5">Rank</label>
            <UInput v-model="rank" placeholder="e.g. GM5" />
          </div>
        </div>

        <!-- Roster -->
        <div>
          <p class="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">Roster</p>

          <div v-if="roster.length" class="flex flex-col gap-1.5 mb-2.5">
            <div v-for="(player, i) in roster" :key="i"
              class="flex items-center gap-3 px-3 py-2 rounded-lg border border-zinc-100 bg-zinc-50">
              <img :src="heroData[player.hero].thumbnail" :alt="heroData[player.hero].displayName"
                class="w-6 h-6 rounded-full object-cover shrink-0" />
              <span class="text-sm font-semibold flex-1">{{ player.name }}</span>
              <span class="text-xs text-zinc-400 w-14 text-right">{{ player.role }}</span>
              <button @click="removePlayer(i)"
                class="text-zinc-300 hover:text-zinc-500 transition-colors cursor-pointer ml-1">
                <UIcon name="i-lucide-x" class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div class="flex gap-2">
            <UInput v-model="newPlayerName" placeholder="Player name" class="flex-1"
              @keydown.enter="addPlayer" />
            <USelect v-model="newPlayerHero" :items="heroOptions" class="w-44" />
            <UButton variant="outline" color="neutral" icon="i-lucide-plus" @click="addPlayer" />
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-2 pt-2 border-t border-zinc-100">
          <UButton variant="ghost" color="neutral" @click="$emit('update:open', false)">Cancel</UButton>
          <UButton color="neutral" @click="save">{{ isEditing ? 'Save Changes' : 'Create Team' }}</UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
