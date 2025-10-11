<script setup>
  import { mapData } from '~/lib/mapData';
  import { heroData } from '~/lib/heroData';

  const props = defineProps({
    passFormState: {
      type: Function,
      required: true,
    },
  })

  props.passFormState({
    test: "test",
  });

  const map = ref(mapData['LijiangTower']);
  const heroBans = ref([heroData.Lucio, heroData.Dva]);
  const results = ref([0, 0]);
  const code = ref("ABCDEF");
  const winningTeam = ref(1);
</script>

<template>
  <section>
    
    <Modal>

      <ScrimEntry
        :map="map"
        :heroBans="heroBans"
        :results="results"
        :code="code"
        :winningTeam="winningTeam"
      />

      <UInput label="Test Input" v-model="code" />
      
    </Modal>

  </section>
</template>
