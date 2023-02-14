<template>
  <q-banner rounded inline-actions class="bg-negative text-white">
    <slot></slot>

    <template #action v-if="refreshable">
      <q-btn @click="$emit('reloadData')" :loading="loading">Actualiser </q-btn>
    </template>
  </q-banner>
</template>

<script setup lang="ts">

defineProps({
  refreshable: {
    type: Boolean,
    default: false,
  },
  loading: Boolean,
})
</script>

<style scoped></style>
