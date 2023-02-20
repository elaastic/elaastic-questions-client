<template>
  <div class="q-pa-xs row q-gutter-xs">
    <q-card class="player-block" flat bordered>
      <q-card-section>
        <div class="text-overline text-orange-9">Response</div>
        <base-todo name="Choose answer" />
        <submit-argument v-model="argument" />
        <submit-confidence v-model="confidenceDegree" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SubmitArgument from "src/features/assignment/sequence/interaction/submit-argument.vue";
import SubmitConfidence from "src/features/assignment/sequence/interaction/submit-confidence.vue";
import BaseTodo from "src/features/dev/BaseTodo.vue";

const argument = ref("");
const confidenceDegree = ref(undefined)

</script>
