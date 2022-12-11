<template>
  <page-title icon="menu_book" :title="assignment.title" />

  <q-banner class="bg-negative" v-if="assignment.nbSequence === 0">
    There is no sequence in this assignment.
  </q-banner>

  <div class="q-ma-sm sequences" v-if="sequences">
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
import PageTitle from "components/commons/PageTitle.vue";
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

if (props.assignment.sequences.status === "NotLoadedYet") {
  assignmentStore.loadSequences(props.assignment.id);
}

const sequences = computed((): Sequence[] | undefined => {
  switch (props.assignment.sequences.status) {
    case "NotLoadedYet":
    case "Loading":
      return undefined;

    default:
      return props.assignment.sequences.value;
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
