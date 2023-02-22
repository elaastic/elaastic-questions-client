<template>
  <q-markup-table>
    <table>
      <caption>API entry points</caption>
      <tr>
        <th>URL</th>
        <td>{{ uri }}</td>
      </tr>
      <tr>
        <th>Status</th>
        <td>{{ status }}</td>
      </tr>
      <tr>
        <th>Data</th>
        <td>
          <code>{{ data?.json }}</code>
        </td>
      </tr>
      <tr>
        <th>Parsing</th>
        <td>
          <code>{{ data?.parsingStatus }}</code>
        </td>
      </tr>
      <tr v-for="(error, index) in data?.errors" v-bind:key="`${uri}_${index}`">
        <th>Error {{ index + 1 }}</th>
        <td>
          {{ error }}
        </td>
      </tr>
    </table>
  </q-markup-table>
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { api } from "boot/axios";
import { isLeft, isRight } from "fp-ts/Either";
import * as t from "io-ts";
import { PropType } from "vue";
import { PathReporter } from "io-ts/PathReporter";

const props = defineProps({
  uri: { type: String, required: true },
  serverType: { type: Object as PropType<t.Type<unknown>>, required: true },
});

const { status, data } = useQuery({
  queryKey: ["test", props.uri],
  queryFn: async () => {
    const response = await api.get(props.uri);
    const data = response.data;
    const decoded = props.serverType.decode(data);

    return {
      json: response.data,
      parsingStatus: isRight(decoded),
      errors: isLeft(decoded) ? PathReporter.report(decoded) : null,
    };
  },
});
</script>

<style scoped></style>
