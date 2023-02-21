<template>
  <app-page
    :status="status"
    loading-message="Loading assignments..."
    :error="error"
  >
    <div
      v-for="assignment in myAssignmentList"
      :key="`assignment-${assignment.id}`"
      class="assignment row items-center non-selectable relative-position cursor-pointer"
      v-ripple.early
      @click="
        $router.push({
          name: 'assignment-summary',
          params: { assignmentId: assignment.id },
        })
      "
    >
      <div class="col assignment-content">
        <span class="assignment-title">{{ assignment.title }}</span
        ><br />
        <span class="assignment-lastUpdated">{{
          formatDate(assignment.lastUpdate)
        }}</span>
      </div>
      <div class="col-auto">
        <q-icon name="arrow_forward_ios" size="sm" color="grey-6" />
      </div>
    </div>
  </app-page>
</template>

<script setup lang="ts">
import { formatDate } from "src/util/date";
import { useMyAssignments } from "src/features/assignment/assignment.query";
import AppPage from "src/features/app/AppPage.vue";

const { status, data, error } = useMyAssignments();

const myAssignmentList = data;
</script>

<style scoped lang="scss">
.assignment {
  padding: 12px;
  margin-top: 16px;
  border: 1px solid $grey-5;
  border-radius: 5px;
  box-shadow: -1px 3px 9px #b8bfc490;
  background-color: white;
}

.assignment-content {
  color: $grey-8;
  font-size: medium;
}

.assignment-title {
  font-weight: bolder;
}

.assignment-lastUpdated {
  font-weight: 400;
}
</style>
