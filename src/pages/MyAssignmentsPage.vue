<template>
  <q-list>
    <q-item
      v-for="assignment in myAssignmentList"
      :key="`assignment-${assignment.id}`"
    >
      {{ assignment.title }}
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { useAssignmentStore } from 'stores/assignment-store';

const assignmentStore = useAssignmentStore();
const myAssignmentList = assignmentStore.myAssignmentList;
</script>

<style scoped></style>
