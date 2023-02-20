<template>
  <page-title icon="menu_book" :title="assignment.title" />

  <q-banner class="bg-negative" v-if="nbSequences === 0">
    There is no sequence in this assignment.
  </q-banner>

  <div class="q-ma-sm sequences">
    <sequence-summary
      v-for="(sequence, index) in assignment.sequences"
      :key="sequence.id"
      :sequence="sequence"
      :num="index + 1"
      @click="openSequence(index)"
    />
  </div>
</template>

<script setup lang="ts">
import SequenceSummary from "src/features/assignment/sequence/SequenceSummary.vue";
import { computed, PropType } from "vue";
import PageTitle from "src/features/app/PageTitle.vue";
import { Assignment } from "src/features/assignment/assignment.interface";
import { useRouter } from "vue-router";

const props = defineProps({
  assignment: {
    type: Object as PropType<Assignment>,
    required: true,
  },
});

const nbSequences = computed(() => props.assignment.sequences.length);

const router = useRouter();

function openSequence(sequenceIndex: number) {
  router.push({
    name: "play-sequence",
    params: {
      assignmentId: props.assignment.id,
      sequenceIndex: sequenceIndex + 1,
    },
  });
}
</script>

<style scoped>
.sequences {
  border: solid 1px gray;
  border-radius: 4px;
}
</style>
