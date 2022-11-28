<template>
  <base-todo v-if="assignment" name="Play page" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAssignmentStore } from "stores/assignment-store";
import BaseTodo from "components/dev/BaseTodo.vue";
const assignmentStore = useAssignmentStore();

const props = defineProps({
  assignmentId: {
    type: Number,
    required: true,
  },
});

const assignment = computed(() => assignmentStore.get(props.assignmentId));
</script>

<style scoped></style>
