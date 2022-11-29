<template>
  <div class="ui unstackable mini steps">
    <div class="step" :class="{disabled: disabled(0), active: active(0)}">
      <div class="content">
        <div class="title">Phase 1</div>
        <div class="description">Answer</div>
      </div>
    </div>
    <div class="step" :class="{ disabled: disabled(1), active: active(1) }">
      <div class="content">
        <div class="title">Phase 2</div>
        <div class="description">Evaluate</div>
      </div>
    </div>
    <div class="step" :class="{ disabled: disabled(2), active: active(2) }">
      <div class="content">
        <div class="title">Phase 3</div>
        <div class="description">Results</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import { Phase } from "src/models/phase";

const props = defineProps({
  phases: {
    type: Array as PropType<Phase[]>,
    required: true,
  },
});

if (props.phases.length !== 3) {
  throw new Error("This component expect exactly 3 phases");
}

const disabled = computed(
  () => (num: number) => ["DISABLED", "CLOSED"].includes(props.phases[num].state)
);
const active = computed(
  () => (num: number) => ["ACTIVE"].includes(props.phases[num].state)
);
</script>

<style scoped>
.ui.steps {
  width: 100%; margin: 0
}
</style>
