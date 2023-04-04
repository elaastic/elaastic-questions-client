<template>
  <q-page class="q-pa-md" style="max-width: 800px; margin: auto">
    <app-data-loader
      :status="status"
      :error="error"
      :loading-message="loadingMessage"
    >
      <slot></slot>
    </app-data-loader>
  </q-page>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import AppDataLoader from "src/features/app/AppDataLoader.vue";

defineProps({
  status: {
    type: String as PropType<"error" | "success" | "loading">,
  },
  loadingMessage: String,
  error: Object as PropType<Error>,
});
</script>

<style scoped></style>
