<template>
  <div class="row bordered q-pa-md items-center">
    <div class="col-auto"><q-chip square size="sm">{{ num }}</q-chip></div>
    <div class="col text-weight-bold">{{ sequence.statement.title }}</div>
    <div class="col-auto">{state}</div>
  </div>

</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Sequence } from 'src/models/assignment.interface';

defineProps({
  sequence: {
    type: Object as PropType<Sequence>,
    required: true,
  },
  num: Number,
});
</script>

<style scoped>
.row.bordered {
  border-bottom: 1px solid lightslategray;
}
</style>
