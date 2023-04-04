import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { describe, expect, it, Mock, vi } from "vitest";
import { mount } from "@vue/test-utils";
import AssignmentContent from "src/features/assignment/AssignmentContent.vue";
import { Assignment } from "src/features/assignment/assignment.interface";
import { ClientSequence } from "src/features/assignment/sequence/sequence.interface";
import { useRouter } from "vue-router";
import SequenceSummary from "src/features/assignment/sequence/SequenceSummary.vue";

installQuasarPlugin();

describe("Component for displaying the content of an assignment (i.e. its sequences)", () => {
  vi.mock("vue-router", () => ({
    useRouter: vi.fn(),
  }));

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

  it("should display the list of sequences", async () => {
    const push = vi.fn();
    (useRouter as Mock).mockImplementation(() => ({
      push,
    }));

    const assignment = giveMeAnAssignment();
    const selectedSequenceIndex = 2;

    const wrapper = mount(AssignmentContent, {
      props: {
        assignment: assignment,
        sequences: giveMeSomeSequences(3),
      },
    });

    expect(wrapper.findAllComponents(SequenceSummary).length).toEqual(3);
    await wrapper
      .find(`#sequence-${assignment.id}-${selectedSequenceIndex - 1}`)
      .trigger("click");
    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith({
      name: "play-sequence",
      params: {
        assignmentId: assignment.id,
        sequenceIndex: selectedSequenceIndex,
      },
    });
  });
});

function giveMeAnAssignment(): Assignment {
  return {
    id: 123,
    lastUpdated: new Date(),
    title: "An assignment",
  };
}

function giveMeSomeSequences(nb: number): ClientSequence[] {
  return Array.from(Array(nb).keys()).map((i) => ({
    activeInteractionIndex: undefined,
    id: i,
    phases: [],
    resultsArePublished: false,
    state: "NOT_STARTED",
    statement: {
      content: `content ${i}`,
      title: `statement ${i}`,
    },
  }));
}
