<template>
  <q-page v-if="assignment">
    <assignment-summary :assignment="assignment" />
  </q-page>
</template>

<script setup lang="ts">
import { computed, watchEffect } from "vue";
import { useAssignmentStore } from "stores/assignment-store";
import { useRoute } from "vue-router";
import { parseIntFromUrlParam } from "src/util/url";
import { Assignment } from "src/models/assignment.interface";
import AssignmentSummary from "components/assignment/AssignmentSummary.vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
const assignmentStore = useAssignmentStore();
const route = useRoute();

const assignment = computed((): Assignment | undefined => {
  if (!assignmentStore.metadata.initialized) {
    return undefined;
  }

  const assignmentId = parseIntFromUrlParam(route.params.assignmentId);
  const assignment = assignmentStore.get(assignmentId);

  if (!assignment) {
    throw Error(`There is no assignment with id=${assignmentId}`); // TODO 404
  }

  return assignment;
});

const loading = computed(() => {
  if(assignmentStore.metadata.loading) {
    return { message: "Loading assignments..." }
  }
  else if(assignment.value?.sequences === "Loading") {
    return  { message: "Loading sequences..." }
  }
  else {
    return false
  }
});

watchEffect(() => {
  if (loading.value) {
    $q.loading.show(loading.value);
  } else {
    $q.loading.hide();
  }
});
</script>

<style scoped></style>
