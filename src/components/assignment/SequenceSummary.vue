<template>
  <div class="row bordered q-pa-md items-center">
    <div class="col-auto">
      <q-chip square size="sm">{{ num }}</q-chip>
    </div>
    <div class="col text-weight-bold">{{ sequence.statement.title }}</div>
    <div class="col-auto">
      <q-icon :name="stateIcon" size="xl" color="grey" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';
import { Sequence } from 'src/models/assignment.interface';

const props = defineProps({
  sequence: {
    type: Object as PropType<Sequence>,
    required: true,
  },
  num: Number,
});

const stateIcon = computed((): string => {
  const states = [
    'edit',
    'fact_check',
    'pause',
    'not_started',
    'forum'
  ];
  return states[(props.num ?? 0) % states.length];
});
</script>

<style scoped>
.row.bordered {
  border-bottom: 1px solid lightslategray;
}
</style>
