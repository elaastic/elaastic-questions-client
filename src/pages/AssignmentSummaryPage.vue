<template>
  <q-page v-if="assignment">
    <assignment-summary :assignment="assignment" />
  </q-page>
</template>

<script setup lang="ts">
import { computed, watchEffect } from "vue";
import { useAssignmentStore } from "stores/assignment-store";
import { Assignment } from "src/models/assignment.interface";
import AssignmentSummary from "components/assignment/AssignmentSummary.vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
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
