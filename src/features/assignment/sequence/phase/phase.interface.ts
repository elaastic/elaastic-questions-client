import * as t from "io-ts";

export const TServerPhaseType = t.union([
  t.literal("RESPONSE"),
  t.literal("EVALUATION"),
  t.literal("RESULT"),
])

export type PhaseType = t.TypeOf<typeof TServerPhaseType>

export const TServerPhaseState = t.union([
  t.literal("CLOSED"),
  t.literal("OPEN"),
  t.literal("ACTIVE"),
  t.literal("DISABLED"),
  t.literal("DONE"),
]);

export type PhaseState = t.TypeOf<typeof TServerPhaseState>

export const TServerPhase = t.type({
  type: TServerPhaseType,
  state: TServerPhaseState,
})

export type Phase = t.TypeOf<typeof TServerPhase>
