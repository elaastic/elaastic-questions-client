<template>
  <page-title icon="book" :title="assignment.title" />

  <q-banner class="bg-negative" v-if="assignment.sequences.length === 0">
    There is no sequence in this assignment.
  </q-banner>

  <template v-else>
    <assignment-summary :assignment="assignment" />
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAssignmentStore } from 'stores/assignment-store';
import { useRoute } from 'vue-router';
import { parseIntFromUrlParam } from 'src/util/url';
import { Assignment } from 'src/models/assignment.interface';
import PageTitle from 'components/commons/PageTitle.vue';
import AssignmentSummary from 'components/assignment/AssignmentSummary.vue';
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
