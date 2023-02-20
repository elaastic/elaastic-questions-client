<template>
  <sequence-player
    v-if="assignment"
    :assignment="assignment"
    :sequence-index="sequenceIndex - 1"
  />
</template>

<script setup lang="ts">
import SequencePlayer from "components/assignment/SequencePlayer.vue";
import { useQuery } from "@tanstack/vue-query";
import { fetchAssignment } from "src/services/assignment-service";
import { Ref } from "vue";
import { Assignment } from "src/models/assignment.interface";

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

const { data } = useQuery({
  queryKey: ["Assignment", "detail", props.assignmentId],
  queryFn: () => fetchAssignment(props.assignmentId),
});
const assignment: Ref<Assignment> | Ref<undefined> = data;
</script>
