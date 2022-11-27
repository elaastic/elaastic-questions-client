<template>
  <div class="q-ma-sm sequences" style="position: relative">
    <q-inner-loading :showing="assignment.sequences === 'Loading'">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>

    <sequence-summary
      v-for="(sequence, index) in sequences"
      :key="sequence.id"
      :sequence="sequence"
      :num="index + 1"
      @click="openSequence(index)"
    />
  </div>
</template>

<script setup lang="ts">
import SequenceSummary from "components/assignment/SequenceSummary.vue";
import { computed, PropType } from "vue";
import { Assignment } from "src/models/assignment.interface";
import { useAssignmentStore } from "stores/assignment-store";
import { Sequence } from "src/models/sequence.interface";
import { useRouter } from "vue-router";

const props = defineProps({
  assignment: {
    type: Object as PropType<Assignment>,
    required: true,
  },
});

const assignmentStore = useAssignmentStore();
const router = useRouter();

const sequences = computed((): Sequence[] | undefined => {
  switch (props.assignment.sequences) {
    case "NotLoadedYet":
      assignmentStore.loadSequences(props.assignment.id);
      return undefined;

    case "Loading":
      return undefined;

    default:
      return props.assignment.sequences;
  }
});

function openSequence(sequenceIndex: number) {
  router.push({
    name: "play-sequence",
    params: {
      assignmentId: props.assignment.id,
      sequenceIndex: sequenceIndex + 1,
    },
  });
}
</script>

<style scoped>
.sequences {
  border: solid 1px gray;
  border-radius: 4px;
}
</style>
