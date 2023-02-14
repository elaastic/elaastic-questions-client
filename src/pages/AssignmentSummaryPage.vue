<template>
  <q-page v-if="assignment">
    <assignment-summary :assignment="assignment" />
  </q-page>
</template>

<script setup lang="ts">
import { computed, watchEffect } from "vue";
import { useAssignmentStore } from "stores/assignment-store";
import AssignmentSummary from "components/assignment/AssignmentSummary.vue";
import { useQuasar } from "quasar";
import { useQuery } from "@tanstack/vue-query";
import { fetchAssignmentContent, fetchAssignmentSummary } from "src/services/assignment-service";

const quasar = useQuasar();
const assignmentStore = useAssignmentStore();

const props = defineProps({
  assignmentId: {
    type: Number,
    required: true,
  },
});

// TODO *** Mais en fait je l'ai déjà le summary (quand j'ai récupéré la liste...)
const { status, data, error } = useQuery({
  queryKey: ["assignment", props.assignmentId],
  queryFn: () => (fetchAssignmentSummary(props.assignmentId)),
});

const assignment = computed(() => assignmentStore.get(props.assignmentId));

const loading = computed(() => {
  if (assignmentStore.metadata.loading) {
    return { message: "Loading assignments..." };
  } else if (assignment.value?.sequences?.status === "Loading") {
    return { message: "Loading sequences..." };
  } else {
    return false;
  }
});

watchEffect(() => {
  if (loading.value) {
    quasar.loading.show(loading.value);
  } else {
    quasar.loading.hide();
  }
});
</script>

<style scoped></style>
