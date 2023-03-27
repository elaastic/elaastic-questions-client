<template>
  <app-page
    :status="status"
    :loading-message="$t('assignment.loading', 1)"
    :error="error"
  >
    <assignment-summary v-if="status === 'success'" :assignment="assignment" />
  </app-page>
</template>

<script setup lang="ts">
import AssignmentSummary from "src/features/assignment/AssignmentSummary.vue";
import { useAssignment } from "src/features/assignment/assignment.query";
import AppPage from "src/features/app/AppPage.vue";
import { Ref } from "vue";
import { Assignment } from "src/features/assignment/assignment.interface";

const props = defineProps({
  assignmentId: {
    type: Number,
    required: true,
  },
});

const { status, error, data } = useAssignment(props.assignmentId);
const assignment: Ref<Assignment> | Ref<undefined> = data;
</script>
