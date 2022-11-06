<template>

  <sequence-summary
    v-for="sequence in sequences"
    :key="sequence.id"
    :sequence="sequence"
  />
</template>

<script setup lang="ts">
import SequenceSummary from 'components/assignment/SequenceSummary.vue';
import {computed, PropType} from 'vue';
import {Assignment, Sequence} from 'src/models/assignment.interface';
import {useAssignmentStore} from 'stores/assignment-store';

const props = defineProps({
  assignment: {
    type: Object as PropType<Assignment>,
    required: true,
  },
});

const assignmentStore = useAssignmentStore()
const sequences = computed((): Sequence[] | undefined => {
  if(props.assignment.sequences === 'NotLoadedYet') {
    assignmentStore.loadSequences(props.assignment.id)
    return undefined
  }
  else {
    return props.assignment.sequences
  }
})
</script>

<style scoped></style>
