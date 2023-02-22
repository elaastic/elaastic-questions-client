<template>
  <app-page
    :status="status"
    :loading-message="$t('assignment.loading', 1)"
    :error="error"
  >
    <sequence-player v-if="sequence" :sequence="sequence" />
  </app-page>
</template>

<script setup lang="ts">
import SequencePlayer from "src/features/assignment/sequence/SequencePlayer.vue";
import { Ref } from "vue";
import AppPage from "src/features/app/AppPage.vue";
import { useSequenceDetail } from "src/features/assignment/sequence/sequence.query";
import { Sequence } from "src/features/assignment/sequence/sequence.interface";

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

// TODO Here, get directly the sequence from the server

const { status, data, error } = useSequenceDetail(
  props.assignmentId,
  props.sequenceIndex
);
const sequence: Ref<Sequence> | Ref<undefined> = data;

</script>
