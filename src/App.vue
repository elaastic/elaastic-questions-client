<template>
  <router-view />
</template>

<script setup lang="ts">
import { useAssignmentStore } from "stores/assignment-store";
import { onErrorCaptured } from "vue";
import { useRouter } from "vue-router";
import { NotFoundError } from "src/models/error";

const assignmentStore = useAssignmentStore();
assignmentStore.loadMyAssignments();

const router = useRouter();

onErrorCaptured((err: Error) => {
  if (err instanceof NotFoundError) {
    router.replace({ name: "404" });

    return false;
  }
  return true;
});
</script>
