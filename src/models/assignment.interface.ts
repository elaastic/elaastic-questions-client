import { Sequence } from 'src/models/sequence.interface';

export interface Assignment {
  id: number;
  title: string;
  lastUpdate: Date;
  sequences: Sequence[] | 'NotLoadedYet';
  nbSequence: number;
}
