<template>
  <div class="q-ma-sm sequences">
    <sequence-summary
      v-for="(sequence, index) in sequences"
      :key="sequence.id"
      :sequence="sequence"
      :num="index + 1"
    />
  </div>
</template>

<script setup lang="ts">
import SequenceSummary from 'components/assignment/SequenceSummary.vue';
import { computed, PropType } from 'vue';
import { Assignment } from 'src/models/assignment.interface';
import { useAssignmentStore } from 'stores/assignment-store';
import {Sequence} from 'src/models/sequence.interface';

const props = defineProps({
  assignment: {
    type: Object as PropType<Assignment>,
    required: true,
  },
});

const assignmentStore = useAssignmentStore();
const sequences = computed((): Sequence[] | undefined => {
  if (props.assignment.sequences === 'NotLoadedYet') {
    assignmentStore.loadSequences(props.assignment.id);
    return undefined;
  } else {
    return props.assignment.sequences;
  }
});
</script>

<style scoped>
.sequences {
  border: solid 1px gray;
  border-radius: 4px;
}
</style>
