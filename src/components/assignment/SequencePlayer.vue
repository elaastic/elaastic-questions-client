<template>
  <div v-if="sequence">
    <sequence-steps :phases="sequence.phases" />
    <sequence-statement :statement="sequence.statement" />
    <abstract-phase v-if="currentPhase" :phase="currentPhase" />
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import { Assignment } from "src/models/assignment.interface";
import AbstractPhase from "components/assignment/phase/AbstractPhase.vue";
import SequenceSteps from "components/assignment/SequenceSteps.vue";
import "semantic-ui-step/step.css";
import SequenceStatement from "components/assignment/SequenceStatement.vue";
import { getActivePhase } from "src/services/sequence-service";

const props = defineProps({
  assignment: {
    type: Object as PropType<Assignment>,
    required: true,
  },
  sequenceIndex: {
    type: Number,
    required: true,
  },
});

// TODO Handle index error
const sequence = computed(
  () => props.assignment.sequences[props.sequenceIndex]
);

const currentPhase = computed(() =>
  sequence.value ? getActivePhase(sequence.value) : null
);
</script>

<style scoped></style>
