<template>
  <base-todo :name="`Summary of sequence '${sequence.statement.title}'`" />
</template>

<script setup lang="ts">
import BaseTodo from 'components/dev/BaseTodo.vue';
import { PropType } from 'vue';
import { Sequence } from 'src/models/assignment.interface';

defineProps({
  sequence: {
    type: Object as PropType<Sequence>,
    required: true,
  },
});
</script>

<style scoped></style>
