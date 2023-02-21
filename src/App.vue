<template>
  <router-view />
</template>

<script setup lang="ts">
import { onErrorCaptured } from "vue";
import { useRouter } from "vue-router";
import { NotFoundError } from "src/features/error.interface";
import { useQueryClient } from "@tanstack/vue-query";

// Configure the QueryClient
const queryClient = useQueryClient();
queryClient.setDefaultOptions({
  queries :{
    staleTime: 1000 * 60 * 5, // 5 min
  }
})

const router = useRouter();

onErrorCaptured((err: Error) => {
  if (err instanceof NotFoundError) {
    router.replace({ name: "404", query: { uri: err.uri } });

    return false;
  }
  return true;
});
</script>
