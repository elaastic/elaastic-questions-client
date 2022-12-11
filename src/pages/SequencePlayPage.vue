<template>
  <sequence-player
    v-if="assignment"
    :assignment="assignment"
    :sequence-index="sequenceIndex - 1" />
</template>

<script setup lang="ts">
import {computed, watchEffect} from "vue";
import { useAssignmentStore } from "stores/assignment-store";
import SequencePlayer from "components/assignment/SequencePlayer.vue";
import {useQuasar} from "quasar";
const quasar = useQuasar()
const assignmentStore = useAssignmentStore();

const props = defineProps({
  assignmentId: {
    type: Number,
    required: true,
  },
  sequenceIndex: {
    type: Number,
    required: true,
  },
});

const assignment = computed(() => assignmentStore.get(props.assignmentId));

const loading = computed(() => {
  if (assignmentStore.metadata.loading) {
    return { message: "Loading assignments..." };
  } else if (assignment.value?.sequences?.status === "Loading") {
    return { message: "Loading sequences..." };
  } else {
    return false;
  }
});

watchEffect(() => {
  if (loading.value) {
    quasar.loading.show(loading.value);
  } else {
    quasar.loading.hide();
  }
});
</script>

<style scoped></style>
