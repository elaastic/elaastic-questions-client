<template>
  <div class="q-pa-xs row q-gutter-xs">
    <q-card class="player-block" flat bordered>
      <q-card-section>
        <div class="text-overline text-orange-9">Response</div>
        <base-todo name="Choose answer" />
        <base-todo name="Argument" />
        <base-todo name="Provide confidence degree" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import BaseTodo from "components/dev/BaseTodo.vue";
</script>

<style scoped></style>
