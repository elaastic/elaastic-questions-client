<template>
  <sequence-summary
    v-for="sequence in assignment.sequences"
    :key="sequence.id"
    :sequence="sequence"
  />
</template>

<script setup lang="ts">
import SequenceSummary from 'components/assignment/SequenceSummary.vue';
import { PropType } from 'vue';
import { Assignment } from 'src/models/assignment.interface';

defineProps({
  assignment: {
    type: Object as PropType<Assignment>,
    required: true,
  },
});
</script>

<style scoped></style>
