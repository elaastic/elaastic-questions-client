<template>
  <sequence-player
    v-if="assignment"
    :assignment="assignment"
    :sequence-index="sequenceIndex - 1"
  />
</template>

<script setup lang="ts">
import SequencePlayer from "components/assignment/SequencePlayer.vue";
import { Ref } from "vue";
import { Assignment } from "src/models/assignment.interface";
import { useAssignmentDetail } from "src/services/assignment.query";

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
</script>
