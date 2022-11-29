<template>
  <div v-if="sequence">
    <sequence-steps :phases="sequence.phases" />
    <sequence-statement :statement="sequence.statement" />

<!--    TODO rename interaction-->
    <abstract-phase v-if="currentPhase" :phase="currentPhase" />
  </div>
</template>

<script setup lang="ts">
import {computed, PropType} from "vue";
import {Assignment} from "src/models/assignment.interface";
import {DefaultSequence, Sequence} from "src/models/sequence.interface";
import {useAssignmentStore} from "stores/assignment-store";
import AbstractPhase from "components/assignment/phase/AbstractPhase.vue";
import SequenceSteps from "components/assignment/SequenceSteps.vue";
import "semantic-ui-step/step.css"
import SequenceStatement from "components/assignment/SequenceStatement.vue";

const props = defineProps({
  assignment: {
    type: Object as PropType<Assignment>,
    required: true
  },
  sequenceIndex: {
    type: Number,
    required: true
  }
})

const assignmentStore = useAssignmentStore()

if(props.assignment.sequences === "NotLoadedYet") {
  assignmentStore.loadSequences(props.assignment.id)
}

const sequence = computed<Sequence | undefined>(() => {
  switch (props.assignment.sequences) {
    case "NotLoadedYet":
    case "Loading":
      return undefined

    default:
      if(!props.assignment.sequences?.[props.sequenceIndex] ) {
        throw new Error("Incorrect sequence index") // TODO
      }

      return props.assignment.sequences[props.sequenceIndex]
  }
})

const currentPhase = computed(() => {
  if(sequence.value) {
    return new DefaultSequence(sequence.value).getActivePhase() // TODO use service instead of class
  }
  return null
})

</script>

<style scoped>

</style>
