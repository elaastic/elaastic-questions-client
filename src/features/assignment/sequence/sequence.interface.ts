import * as t from "io-ts";
import { TServerStatement } from "src/features/assignment/sequence/statement.interface";
import { TServerPhase } from "src/features/assignment/sequence/phase/phase.interface";

const TServerSequenceState = t.union([
  t.literal("beforeStart"),
  t.literal("show"),
  t.literal("afterStop"),
]);

export type ServerSequenceState = t.TypeOf<typeof TServerSequenceState>;

export type ClientSequenceState =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "PAUSED"
  | "DONE";

export function convertSequenceState(
  serverState: ServerSequenceState
): ClientSequenceState {
  switch (serverState) {
    case "beforeStart":
      return "NOT_STARTED";
    case "show":
      return "IN_PROGRESS";
    case "afterStop":
      return "DONE";
  }
}

export type SequenceState = t.TypeOf<typeof TServerSequenceState>;

export type SequenceIcon =
  | "not_started"
  | "edit"
  | "bar_chart"
  | "pause"
  | "forum"
  | "lock";

export const TServerSequence = t.type({
  id: t.number,
  statement: TServerStatement,
  state: TServerSequenceState,
  phases: t.array(TServerPhase), // TODO see if we can restrict the array length
  activeInteractionIndex: t.union([t.undefined, t.null, t.number]), // TODO Check this type
  resultsArePublished: t.boolean,
});

export type ServerSequence = t.TypeOf<typeof TServerSequence>;

export type ClientSequence = Omit<ServerSequence, "state"> & {
  state: ClientSequenceState;
};

export function convertSequence(sequence: ServerSequence): ClientSequence {
  return {
    ...sequence,
    state: convertSequenceState(sequence.state)
  }
}
