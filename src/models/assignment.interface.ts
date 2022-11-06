export interface Assignment {
  id: number;
  title: string;
  lastUpdate: Date;
  sequences: Sequence[];
}

export interface Sequence {
  id: number;
  statement: Statement;
}

export interface Statement {
  title: string;
  content: string;
}
