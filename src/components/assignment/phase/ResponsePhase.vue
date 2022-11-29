<template>
  <div class="q-pa-xs row q-gutter-xs">
    <q-card class="player-block" flat bordered>
      <q-card-section>
        <div class="text-overline text-orange-9">Response</div>
        <base-todo name="Choose answer" />
        <submit-argument v-model="argument" />
        <base-todo name="Provide confidence degree" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import BaseTodo from "components/dev/BaseTodo.vue";
import SubmitArgument from "components/assignment/interaction/submit-argument.vue";
import { ref } from "vue";

const argument = ref("");
</script>

<style scoped></style>
