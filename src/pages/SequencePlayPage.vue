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
import { useSequence } from "src/features/assignment/sequence/sequence.query";
import { ClientSequence } from "src/features/assignment/sequence/sequence.interface";

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

const { status, data, error } = useSequence(
  props.assignmentId,
  props.sequenceIndex
);
const sequence: Ref<ClientSequence> | Ref<undefined> = data;

</script>
