<template>
  <sequence-player v-if="sequence" :sequence="sequence" />
</template>

<script setup lang="ts">
import SequencePlayer from "src/features/assignment/sequence/SequencePlayer.vue";
import { computed, Ref } from "vue";
import { Assignment } from "src/features/assignment/assignment.interface";
import { useAssignmentDetail } from "src/features/assignment/assignment.query";

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

const { data } = useAssignmentDetail(props.assignmentId);
const assignment: Ref<Assignment> | Ref<undefined> = data;

const sequence = computed(() =>
  assignment.value ? assignment.value.sequences[props.sequenceIndex - 1] : null
);
</script>
