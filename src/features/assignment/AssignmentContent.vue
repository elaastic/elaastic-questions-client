<template>
  <q-banner class="bg-negative" v-bind="$attrs" v-if="nbSequences === 0">
    There is no sequence in this assignment.
  </q-banner>

  <div class="q-ma-sm sequences" v-bind="$attrs" v-else>
    <sequence-summary
      v-for="(sequence, index) in sequences"
      :id="`sequence-${assignment.id}-${index}`"
      :key="`${assignment.id}-${index}`"
      :sequence="sequence"
      :num="index + 1"
      class="sequence"
      @click="openSequence(index)"
    />
  </div>
</template>

<script setup lang="ts">
import SequenceSummary from "src/features/assignment/sequence/SequenceSummary.vue";
import { computed, PropType } from "vue";
import { Assignment } from "src/features/assignment/assignment.interface";
import { useRouter } from "vue-router";
import { ClientSequence } from "src/features/assignment/sequence/sequence.interface";

const props = defineProps({
  assignment: {
    type: Object as PropType<Assignment>,
    required: true,
  },
  sequences: {
    type: Array as PropType<ClientSequence[]>,
    required: true,
  },
});

const nbSequences = computed(() => props.sequences.length);

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
