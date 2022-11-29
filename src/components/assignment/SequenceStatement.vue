<template>
  <div class="q-pa-xs row q-gutter-xs">
    <q-card class="player-block" flat bordered>
      <q-card-section>
        <div class="text-overline text-orange-9">Question</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ statement.title }}</div>
        <div class="text-caption text-grey" v-html="statement.content"></div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { Statement } from "src/models/sequence.interface";

defineProps({
  statement: {
    type: Object as PropType<Statement>,
    required: true,
  },
});
</script>

<style scoped></style>
