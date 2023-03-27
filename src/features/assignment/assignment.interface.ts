import * as t from "io-ts";

export const TServerAssignment = t.type({
  id: t.number,
  title: t.string,
  lastUpdated: t.string,
});

export type ServerAssignment = t.TypeOf<typeof TServerAssignment>;
export type Assignment = Omit<ServerAssignment, "lastUpdated"> & {
  lastUpdated: Date;
};


export const ServerGetMyAssignment = t.array(TServerAssignment);
