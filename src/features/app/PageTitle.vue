<template>
  <div class="row items-center q-ma-sm">
    <q-icon v-if="icon" :name="icon" size="lg" class="col-auto q-mr-md" />
    <h1 class="col text-h6">{{ title }}</h1>
  </div>
</template>

<script setup lang="ts">
defineProps({ title: String, icon: String });
</script>

<style scoped></style>
