import { Phase } from "src/models/phase";

export interface Sequence {
  id: number;
  statement: Statement;
  state: SequenceState;
  phases: Phase[];
  activeInteractionIndex?: number;
  resultsArePublished: boolean;
}

export interface Statement {
  title: string;
  content: string;
}

export type SequenceState = "NOT_STARTED" | "IN_PROGRESS" | "PAUSED" | "DONE";

export type SequenceIcon =
  | "not_started"
  | "edit"
  | "bar_chart"
  | "pause"
  | "forum"
  | "lock";
