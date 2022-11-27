<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-overline">Question n°{{ index }}</div>
      <div class="text-h5 q-mt-sm q-mb-xs">{{ statement.title }}</div>
      <div class="text-caption text-grey" v-html="statement.content" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Statement } from 'src/models/sequence.interface';

defineProps({
  statement: Object as PropType<Statement>,
  index: Number,
});
</script>

<style scoped></style>
