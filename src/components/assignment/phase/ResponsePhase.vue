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
import BaseTodo from "components/dev/BaseTodo.vue";
import SubmitArgument from "components/assignment/interaction/submit-argument.vue";
import { ref } from "vue";
import SubmitConfidence from "components/assignment/interaction/submit-confidence.vue";

const argument = ref("");
const confidenceDegree = ref(undefined)

</script>

<style scoped></style>
