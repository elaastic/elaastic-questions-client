<template>
  <div v-if="phase.type === 'RESPONSE_SUBMISSION'">
    <response-phase />
  </div>
  <div v-else-if="phase.type === 'EVALUATION'">
    <base-todo name="Evaluation" />
  </div>
  <div v-else-if="phase.type === 'READ'">
    <base-todo name="Read" />
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { Phase } from "src/models/phase";
import BaseTodo from "components/dev/BaseTodo.vue";
import ResponsePhase from "components/assignment/phase/ResponsePhase.vue";

defineProps({
  phase: {
    type: Object as PropType<Phase>,
    required: true,
  },
});
</script>

<style scoped></style>
