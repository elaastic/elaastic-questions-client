<template>
  <div v-if="sequence">
    {{ sequence.statement.title }}
  </div>
</template>

<script setup lang="ts">
import {computed, PropType} from "vue";
import {Assignment} from "src/models/assignment.interface";
import {Sequence} from "src/models/sequence.interface";
import {useAssignmentStore} from "stores/assignment-store";

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

</script>

<style scoped>

</style>
