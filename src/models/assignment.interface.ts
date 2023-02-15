import { Sequence } from "src/models/sequence.interface";

export interface AssignmentSummary {
  id: number;
  title: string;
  lastUpdate: Date;
  nbSequence: number;
}

export interface Assignment {
  id: number;
  title: string;
  lastUpdate: Date;
  sequences: Sequence[]
}
