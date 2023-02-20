import { Sequence } from "src/models/sequence.interface";

interface AssignmentBase {
  id: number;
  title: string;
  lastUpdate: Date;
}

export interface AssignmentSummary extends AssignmentBase {
  nbSequence: number;
}

export interface Assignment extends AssignmentBase {
  sequences: Sequence[]
}
