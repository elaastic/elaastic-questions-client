<template>
  <q-page class="q-pa-md" style="max-width: 800px; margin: auto">
    <q-inner-loading
      :showing="status === 'loading'"
      label="Loading assignment..."
      color="grey"
      label-class="text-grey"
    />

    <error-panel v-if="status === 'error'">
      {{ error }}
    </error-panel>

    <sequence-player v-if="sequence" :sequence="sequence" />
  </q-page>
</template>

<script setup lang="ts">
import SequencePlayer from "src/features/assignment/sequence/SequencePlayer.vue";
import { computed, Ref } from "vue";
import { Assignment } from "src/features/assignment/assignment.interface";
import { useAssignmentDetail } from "src/features/assignment/assignment.query";
import { NotFoundError } from "src/features/error.interface";
import { useRoute } from "vue-router";
import ErrorPanel from "src/features/app/ErrorPanel.vue";

const props = defineProps({
  assignmentId: {
    type: Number,
    required: true,
  },
  sequenceIndex: {
    type: Number,
    required: true,
  },
});

const { status, data, error } = useAssignmentDetail(props.assignmentId);
const assignment: Ref<Assignment> | Ref<undefined> = data;

const sequence = computed(() => {
  if (!assignment.value) {
    return null;
  }

  if (
    props.sequenceIndex <= 0 ||
    props.sequenceIndex > assignment.value.sequences.length
  ) {
    throw new NotFoundError(
      `There is no sequence ${props.sequenceIndex} on this assignment`,
      useRoute().path
    );
  }

  return assignment.value.sequences[props.sequenceIndex - 1];
});
</script>
