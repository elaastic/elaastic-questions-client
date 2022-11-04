<template>
  <q-banner>
    <q-icon v-if="icon" :name="icon" />
    <span class="text-weight-bold">{{ title }}</span>
  </q-banner>
</template>

<script setup lang="ts">
defineProps({ title: String, icon: String });
</script>

<style scoped></style>
