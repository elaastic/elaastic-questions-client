import { defineStore } from 'pinia';
import { Assignment } from 'src/domain/assignment.interface';

interface AssignmentStoreState {
  myAssignmentList: Assignment[];
}

export const useAssignmentStore = defineStore('assignment', {
  state: (): AssignmentStoreState => ({
    myAssignmentList: [
      {
        id: 1,
        title: 'Programmation dirigée par les tests',
        lastUpdate: new Date(),
      },
      {
        id: 2,
        title: 'VueJS 3 - API composition',
        lastUpdate: new Date(),
      },
      {
        id: 3,
        title: 'Spring Boot',
        lastUpdate: new Date(),
      },
    ],
  }),
});
