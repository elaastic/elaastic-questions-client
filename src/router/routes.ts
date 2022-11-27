import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/MyAssignmentListPage.vue"),
        meta: {
          home: true,
          title: "My assignments",
        },
      },
      {
        path: "assignment/:assignmentId/summary",
        name: "assignment-summary",
        component: () => import("pages/AssignmentSummaryPage.vue"),
        meta: {
          title: "Assignment Summary",
        },
      },
      {
        path: "assignment/:assignmentId/play/:sequenceIndex",
        name: "play-sequence",
        component: () => import("pages/SequencePlayPage.vue"),
        meta: {
          title: "Play sequence",
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
