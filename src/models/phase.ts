export interface Phase {
  type: PhaseType;
  state: PhaseState
}

export type PhaseType = "RESPONSE_SUBMISSION" | "EVALUATION" | "READ";

export type PhaseState = "CLOSED" | "OPEN" | "ACTIVE" | "DISABLED" | "DONE"

