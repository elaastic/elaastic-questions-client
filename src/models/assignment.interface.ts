import { Sequence } from 'src/models/sequence.interface';

export interface Assignment {
  id: number;
  title: string;
  lastUpdate: Date;
  sequences: Sequence[] | 'NotLoadedYet' | 'Loading';
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
