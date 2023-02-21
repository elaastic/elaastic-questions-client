<template>
  <app-page
    :status="status"
    loading-message="Loading assignment..."
    :error="error"
  >
    <assignment-summary v-if="status === 'success'" :assignment="assignment" />
  </app-page>
</template>

<script setup lang="ts">
import AssignmentSummary from "src/features/assignment/AssignmentSummary.vue";
import { useAssignmentDetail } from "src/features/assignment/assignment.query";
import AppPage from "src/features/app/AppPage.vue";

const props = defineProps({
  assignmentId: {
    type: Number,
    required: true,
  },
});

// TODO We should handle the case where we already have the AssignmentSummary but the full Assignment yet
const { status, error, data } = useAssignmentDetail(props.assignmentId);

const assignment = data;
</script>
