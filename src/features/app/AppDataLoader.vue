<template>
  <div>
    <q-inner-loading
      :showing="status === 'loading'"
      :label="loadingMessage"
      color="grey"
      label-class="text-grey"
    />

    <error-panel v-if="status === 'error'">
      {{ error }}
    </error-panel>

    <slot  v-if="status === 'success'"></slot>
  </div>
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
