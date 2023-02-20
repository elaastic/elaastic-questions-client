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
import AssignmentSummary from "src/features/assignment/AssignmentSummary.vue";
import ErrorPanel from "components/commons/ErrorPanel.vue";
import { useAssignmentDetail } from "src/features/assignment/assignment.query";

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
