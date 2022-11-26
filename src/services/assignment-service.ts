import { ServerAssignmentData } from 'src/models/assignment.interface';
import { delay } from 'src/util/dev';
import { faker } from '@faker-js/faker/locale/fr';

async function getMyAssignments(): Promise<ServerAssignmentData[]> {
  await delay(2000); // simulate latency

  const nbResults = 3 + Math.round(10 * Math.random());
  return [...Array(nbResults).keys()].map(() => {
    return {
      lastUpdate: faker.date
        .between('2020-01-01T00:00:00.000Z', '2030-01-01T00:00:00.000Z')
        .toString(),
      title: faker.lorem.words(),
    };
  });
}

export const assignmentService = {
  getMyAssignments,
};
