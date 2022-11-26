import { ServerAssignmentData } from 'src/models/assignment.interface';
import { delay } from 'src/util/dev';

async function getMyAssignments(): Promise<ServerAssignmentData[]> {
  await delay(2000); // simulate latency

  return [
    { lastUpdate: new Date().toString(), title: '1st assignment' },
    { lastUpdate: new Date().toString(), title: '2nd assignment' },
    { lastUpdate: new Date().toString(), title: '3rd assignment' },
  ];
}

export const assignmentService = {
  getMyAssignments,
};
