<template>
  <div>
<!--    TODO : get the phases -->
<!--    <sequence-steps :phases="sequence.phases" />-->
    <sequence-statement :statement="sequence.statement" />
    <abstract-phase v-if="currentPhase" :phase="currentPhase" />
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import AbstractPhase from "src/features/assignment/sequence/phase/AbstractPhase.vue";
import "semantic-ui-step/step.css";
import SequenceStatement from "src/features/assignment/sequence/SequenceStatement.vue";
import { getActivePhase } from "src/features/assignment/sequence/sequence.service";
import { ServerSequence } from "src/features/assignment/sequence/sequence.interface";

const props = defineProps({
  sequence: {
    type: Object as PropType<ServerSequence>,
    required: true,
  },
});

const currentPhase = computed(() => getActivePhase(props.sequence));
</script>
