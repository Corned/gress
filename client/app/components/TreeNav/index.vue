<script setup>

import Branch from './_Branch.vue'
import Leaf from './_Leaf.vue'

const props = defineProps({

})

const emit = defineEmits([

])


const testData = [
  {
    label: 'Recent',
    disabled: true,
  },
  {
    label: 'Favorites',
    disabled: true,
  },
  {
    label: "Tournaments",
    children: [
      {
        label: "Crown Cup S4",
        children: [
          {
            label: "Don't Cross the Line",
          },
          {
            label: "APL Veneris",
          },
        ],
      },
      {
        label: "OWCS 2026",
        children: [
          {
            label: "Spacestation Gaming",
          },
          {
            label: "Virtus.Pro",
          },
        ],
      },
      {
        label: "CGL 2026",
        children: [
          {
            label: "MRG Garnet",
          },
          {
            label: "MRG Ruby",
          },
        ],
      },
    ]
  },
  {
    label: "Scrims",
    children: [
      {
        label: "2026",
        children: [
          {
            label: "January",
            children: [
              {
                label: "The First Order",
              },
              {
                label: "Birmingham Ballers",
              },
              {
                label: "Maccas Happymeals",
              },
            ],
          },
          {
            label: "February",
            children: [
              {
                label: "G. Warriors",
              },
              {
                label: "Skibidi Toilets",
              },
            ],
          },
        ],
      },
    ]
  },
]

</script>

<template>
  <div class="flex flex-col gap-1">
    <template v-for="(child, index) in testData" :key="index">
      <Branch v-if="child.children" :label="child.label" :children="child.children" :disabled="child.disabled" />
      <Leaf v-else :label="child.label" :disabled="child.disabled" />
    </template>
  </div>
</template>