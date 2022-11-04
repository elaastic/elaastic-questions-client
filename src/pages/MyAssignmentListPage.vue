<template>
  <div class="q-pa-md">
    <div
      v-for="assignment in myAssignmentList"
      :key="`assignment-${assignment.id}`"
      class="assignment row items-center non-selectable relative-position cursor-pointer"
      v-ripple.early
      @click="
        $router.push({
          name: 'assignment',
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
  </div>
</template>

<script setup lang="ts">
import { useAssignmentStore } from 'stores/assignment-store';
import { formatDate } from 'src/util/date';

const assignmentStore = useAssignmentStore();
const myAssignmentList = assignmentStore.myAssignmentList;
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
