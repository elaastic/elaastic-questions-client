import { Sequence } from "src/models/sequence.interface";

export interface AssignmentSummary {
  id: number;
  title: string;
  lastUpdate: Date;
  nbSequence: number;
}

export interface AssignmentContent {
  sequences: Sequence[]
}

export interface Assignment extends AssignmentSummary, AssignmentContent {}
