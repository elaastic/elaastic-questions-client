<template>
  <q-page v-if="assignment">
    <q-inner-loading
      :showing="status === 'loading'"
      label="Loading assignment..."
      color="grey"
      label-class="text-grey"
    />

    <error-panel v-if="status === 'error'">
      {{ error }}
    </error-panel>

    <assignment-summary v-if="status === 'success'" :assignment="assignment" />
  </q-page>
</template>

<script setup lang="ts">
import AssignmentSummary from "components/assignment/AssignmentSummary.vue";
import { useQuery } from "@tanstack/vue-query";
import { fetchAssignment } from "src/services/assignment-service";
import ErrorPanel from "components/commons/ErrorPanel.vue";

const props = defineProps({
  assignmentId: {
    type: Number,
    required: true,
  },
});

// TODO We should handle the case where we already have the AssignmentSummary but the full Assignment yet
const { status, error, data } = useQuery({
  queryKey: ["Assignment", "detail", props.assignmentId],
  queryFn: () => fetchAssignment(props.assignmentId),
  staleTime: 1000 * 60 * 5, // 5 min
});

const assignment = data
</script>

<style scoped></style>
