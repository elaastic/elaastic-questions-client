import { defineStore } from 'pinia';
import { Assignment } from 'src/models/assignment.interface';

interface AssignmentStoreState {
  myAssignmentList: Assignment[];
}

export const useAssignmentStore = defineStore('assignment', {
  state: (): AssignmentStoreState => ({
    myAssignmentList: [
      // TODO Use a Map
      {
        id: 1,
        title: 'Programmation dirigée par les tests',
        lastUpdate: new Date(),
        sequences: [
          {
            id: 1,
            statement: {
              title: 'La question originelle',
              content: '<div><strong>Hello World !</strong></div>',
            },
          },
          {
            id: 2,
            statement: {
              title: 'La question qui vient juste après',
              content:
                '<div>Vous préférez ? <ul><li>Le choix A</li><li>le choix B</li></ul></div>',
            },
          },
        ],
      },
      {
        id: 2,
        title: 'VueJS 3 - API composition',
        lastUpdate: new Date(),
        sequences: [],
      },
      {
        id: 3,
        title: 'Spring Boot',
        lastUpdate: new Date(),
        sequences: [],
      },
    ],
  }),
  getters: {
    get: (state) => {
      return (assignmentId: number) =>
        state.myAssignmentList.find(
          (assignment: Assignment) => assignment.id === assignmentId
        );
    },
  },
});
