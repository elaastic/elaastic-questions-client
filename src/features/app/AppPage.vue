<template>
  <q-page class="q-pa-md" style="max-width: 800px; margin: auto">
    <q-inner-loading
      :showing="status === 'loading'"
      label="Loading assignments..."
      color="grey"
      label-class="text-grey"
    />

    <error-panel v-if="status === 'error'">
      {{ error }}
    </error-panel>

    <slot  v-if="status === 'success'"></slot>
  </q-page>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import ErrorPanel from "src/features/app/ErrorPanel.vue";

defineProps({
  status: {
    type: String as PropType<"error" | "success" | "loading">,
  },
  loadingMessage: String,
  error: Object as PropType<Error>
})
</script>

<style scoped>

</style>
