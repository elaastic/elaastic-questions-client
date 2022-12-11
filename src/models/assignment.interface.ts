import { Sequence } from "src/models/sequence.interface";
import { LazyData } from "src/util/data.interface";

export interface Assignment {
  id: number;
  title: string;
  lastUpdate: Date;
  sequences: LazyData<Sequence[]>
  nbSequence: number;
}

export interface ServerAssignmentData {
  title: string;
  lastUpdate: string;
}

export interface ServerSequenceData {
  id: number;
  title: string;
  content: string;
  activeInteractionIndex: number;
  resultsArePublished: boolean;
}
