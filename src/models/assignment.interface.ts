export interface Assignment {
  id: number;
  title: string;
  lastUpdate: Date;
  statements: Statement[];
}

export interface Statement {
  title: string;
  content: string;
}
