<template>
  <router-view />
</template>

<script setup lang="ts">

import {useAssignmentStore} from 'stores/assignment-store';

const assignmentStore = useAssignmentStore()

assignmentStore.loadData()
</script>
