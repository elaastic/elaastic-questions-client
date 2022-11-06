export interface Assignment {
  id: number;
  title: string;
  lastUpdate: Date;
  sequences: Sequence[] | 'NotLoadedYet';
  nbSequence: number;
}

export interface Sequence {
  id: number;
  statement: Statement;
}

export interface Statement {
  title: string;
  content: string;
}
