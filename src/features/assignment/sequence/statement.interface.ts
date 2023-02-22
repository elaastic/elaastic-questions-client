import * as t from "io-ts";

export const TServerStatement = t.type({
  title: t.string,
  content: t.union([t.string, t.undefined]),
});

export type Statement = t.TypeOf<typeof TServerStatement>
