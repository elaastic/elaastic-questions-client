<template>
  <base-todo v-if="assignment" name="Play page" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAssignmentStore } from "stores/assignment-store";
import { Assignment } from "src/models/assignment.interface";
import BaseTodo from "components/dev/BaseTodo.vue";
const assignmentStore = useAssignmentStore();

const props = defineProps({
  assignmentId: {
    type: Number,
    required: true,
  },
});


const assignment = computed((): Assignment | undefined => {
  if (!assignmentStore.metadata.initialized) {
    return undefined;
  }

  const assignment = assignmentStore.get(props.assignmentId);

  if (!assignment) {
    throw Error(`There is no assignment with id=${props.assignmentId}`); // TODO 404
  }

  return assignment;
});
</script>

<style scoped></style>
