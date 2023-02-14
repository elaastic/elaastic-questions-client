import {
  AssignmentSummary,
  ServerAssignmentSummary,
  ServerSequenceData
} from "src/models/assignment.interface";
import { delay } from "src/util/dev";
import { faker } from "@faker-js/faker/locale/fr";

export async function fetchMyAssignments(): Promise<AssignmentSummary[]> {

  return mockMyAssignments().map((serverAssignmentSummary) => ({
    ...serverAssignmentSummary,
    lastUpdate: new Date(serverAssignmentSummary.lastUpdate)
  }));
}

async function getSequences(
  assignmentId: number
): Promise<ServerSequenceData[]> {
  await delay(2000); // simulate latency

  const nbResults = 3 + Math.round(10 * Math.random());

  return [...Array(nbResults).keys()].map(() => {
    return {
      activeInteractionIndex: Math.trunc(Math.random() * 3),
      content: faker.lorem.text(),
      id: Math.trunc(Math.random() * 100000),
      resultsArePublished: Math.random() > 0.5,
      title: faker.lorem.words(),
    };
  });
}

export const assignmentService = {
  getSequences,
};

function mockMyAssignments(): ServerAssignmentSummary[] {
  const nbResults = 3 + Math.round(10 * Math.random());
  return [...Array(nbResults).keys()].map(() => {
    return {
      id: -1, // TODO ***
      lastUpdate: faker.date
        .between("2020-01-01T00:00:00.000Z", "2030-01-01T00:00:00.000Z")
        .toString(),
      title: faker.lorem.words(),
      nbSequence: 0, // TODO ***
    };
  });
}
