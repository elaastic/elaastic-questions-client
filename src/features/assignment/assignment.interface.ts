import { Sequence } from "src/features/assignment/sequence/sequence.interface";

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
