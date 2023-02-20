<template>
  <div class="q-mt-sm">
    <q-btn-toggle
      v-model="confidenceDegree"
      class="my-custom-toggle mini"
      no-caps
      rounded
      spread
      unelevated
      toggle-color="primary"
      color="white"
      text-color="primary"
      size="xs"
      :options="[
        { label: 'Not confident at all', value: -2 },
        { label: 'Not really confident', value: -1 },
        { label: 'Quite confident', value: 1 },
        { label: 'Very confident', value: 2 },
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
  },
});

const emit = defineEmits(["update:modelValue"]);

const confidenceDegree = computed({
  get(): number | undefined {
    return props.modelValue;
  },
  set(value: number | undefined) {
    emit("update:modelValue", value);
  },
});
</script>

<style scoped>
.my-custom-toggle {
  border: 1px solid #027be3;
}
</style>
