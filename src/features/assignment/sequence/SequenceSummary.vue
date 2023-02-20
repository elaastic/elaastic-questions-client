<template>
  <div class="row bordered q-pa-md items-center">
    <div class="col-auto">
      <q-chip square size="sm">{{ num }}</q-chip>
    </div>
    <div class="col text-weight-bold">{{ sequence.statement.title }}</div>
    <div class="col-auto">
      <q-icon
        v-for="(icon, index) in stateIcons"
        :key="`state-${sequence.id}-${index}`"
        :name="icon"
        size="xl"
        color="grey"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import {
  Sequence,
} from "src/features/assignment/sequence/sequence.interface";
import { sequenceIcons } from "src/features/assignment/sequence/sequence.service";

const props = defineProps({
  sequence: {
    type: Object as PropType<Sequence>,
    required: true,
  },
  num: Number,
});

const stateIcons = computed((): string[] => {
  return sequenceIcons(props.sequence);
});
</script>

<style scoped>
.row.bordered {
  border-bottom: 1px solid lightslategray;
}

.row.bordered:last-child {
  border-bottom: none;
}
</style>
