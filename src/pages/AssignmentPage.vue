<template>
  <h1>{{ assignment.title }}</h1>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAssignmentStore } from 'stores/assignment-store';
import { useRoute } from 'vue-router';
import { parseIntFromUrlParam } from 'src/util/url';
import { Assignment } from 'src/domain/assignment.interface';
const assignmentStore = useAssignmentStore();
const route = useRoute();

const assignment = computed((): Assignment => {
  const assignmentId = parseIntFromUrlParam(route.params.assignmentId);
  const assignment = assignmentStore.get(assignmentId);

  if (!assignment) {
    throw Error(`There is no assignment with id=${assignmentId}`); // TODO 404
  }

  return assignment;
});
</script>

<style scoped></style>
