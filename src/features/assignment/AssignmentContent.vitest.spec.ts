import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import AssignmentContent from "src/features/assignment/AssignmentContent.vue";
import { Assignment } from "src/features/assignment/assignment.interface";

installQuasarPlugin();

describe("Component for displaying the content of an assignment (i.e. its sequences)", () => {

  it("should displays a warning message for empty assignment", () => {
    const wrapper = mount(AssignmentContent, {
      props: {
        assignment: giveMeAnAssignment(),
        sequences: [],
      },
    });

    expect(wrapper.text()).toContain(
      "There is no sequence in this assignment."
    );
  });

  // TODO test with a non empty list of sequences

  // TODO test click on a sequence
});

function giveMeAnAssignment(): Assignment {
  return {
    id: 123,
    lastUpdated: new Date(),
    title: "An assignment",
  };
}
