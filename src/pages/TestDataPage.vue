<template>
  <app-page status="success">
    <test-api-url
      class="q-mb-md"
      v-for="(entry, index) in entries"
      :key="`test-api-url-${index}`"
      :server-type="entry.serverType"
      :uri="entry.uri"
    />
  </app-page>
</template>

<script setup lang="ts">
import AppPage from "src/features/app/AppPage.vue";
import { TServerStatement } from "src/features/assignment/sequence/statement.interface";
import TestApiUrl from "src/features/dev/TestApiUrl.vue";
import { ref } from "vue";
import { TServerSequence } from "src/features/assignment/sequence/sequence.interface";
import { TServerAssignment } from "src/features/assignment/assignment.interface";

const entries = ref([
  { serverType: TServerStatement, uri: "/test/data/statement-with-content" },
  { serverType: TServerStatement, uri: "/test/data/statement-without-content" },
  { serverType: TServerSequence, uri: "/test/data/sequence" },
  { serverType: TServerAssignment, uri: "/test/data/assignment" },

]);
</script>
