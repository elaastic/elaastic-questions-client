import { Phase } from "src/models/phase";

export interface Sequence {
  id: number;
  statement: Statement;
  state: SequenceState;
  phases: Phase[];
  activeInteractionIndex?: number;
  resultsArePublished: boolean;
}

export class DefaultSequence implements Sequence {
  id: number;
  statement: Statement;
  activeInteractionIndex?: number;
  state: SequenceState;
  phases: Phase[];
  resultsArePublished: boolean;

  constructor(sequence: Sequence) {
    this.id = sequence.id;
    this.statement = sequence.statement;
    this.state = sequence.state;
    this.phases = sequence.phases;
    this.activeInteractionIndex = sequence.activeInteractionIndex;
    this.resultsArePublished = sequence.resultsArePublished;
  }

  getActivePhase(): Phase | null {
    return this.activeInteractionIndex !== undefined
      ? this.phases[this.activeInteractionIndex]
      : null;
  }
}

export interface Statement {
  title: string;
  content: string;
}

export type SequenceState = "NOT_STARTED" | "IN_PROGRESS" | "PAUSED" | "DONE";

export function pickRandomState(): SequenceState {
  const x = Math.trunc(Math.random() * 4);

  switch (x) {
    case 0:
      return "NOT_STARTED";
    case 1:
      return "IN_PROGRESS";
    case 2:
      return "PAUSED";
    default:
      return "DONE";
  }
}

export type SequenceIcon =
  | "not_started"
  | "edit"
  | "bar_chart"
  | "pause"
  | "forum"
  | "lock";

export function sequenceIcons(sequence: DefaultSequence): SequenceIcon[] {
  switch (sequence.state) {
    case "NOT_STARTED":
      return ["not_started"];

    case "IN_PROGRESS":
      switch (sequence.getActivePhase()?.type) {
        case "RESPONSE_SUBMISSION":
          return ["edit"];

        case "EVALUATION":
          return ["forum"];

        case "READ":
          return doneSequenceIcon(sequence);

        default:
          return [];
      }

    case "PAUSED":
      return ["pause"];

    case "DONE":
      return doneSequenceIcon(sequence);
  }
}

function doneSequenceIcon(sequence: Sequence): SequenceIcon[] {
  return sequence.resultsArePublished ? ["bar_chart"] : ["lock"];
}
