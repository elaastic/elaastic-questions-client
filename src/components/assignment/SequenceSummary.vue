<template>
  <q-card>
    <q-card-section>{{ sequence.statement.title }}</q-card-section>
    <q-card-section>
      {{ sequence.statement.content }}
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Sequence } from 'src/models/assignment.interface';

defineProps({
  sequence: {
    type: Object as PropType<Sequence>,
    required: true,
  },
});
</script>

<style scoped></style>
