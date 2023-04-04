import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { describe, expect, it, Mock, vi } from "vitest";
import { mount } from "@vue/test-utils";
import AssignmentContent from "src/features/assignment/AssignmentContent.vue";
import { useRouter } from "vue-router";
import SequenceSummary from "src/features/assignment/sequence/SequenceSummary.vue";
import { AssignmentTestService } from "src/features/assignment/assignment.testService";

installQuasarPlugin();

describe("Component for displaying the content of an assignment (i.e. its sequences)", () => {
  vi.mock("vue-router", () => ({
    useRouter: vi.fn(),
  }));

  it("should displays a warning message for empty assignment", () => {
    const wrapper = mount(AssignmentContent, {
      props: {
        assignment: AssignmentTestService.giveMeAnAssignment(),
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

    const assignment = AssignmentTestService.giveMeAnAssignment();
    const selectedSequenceIndex = 2;

    const wrapper = mount(AssignmentContent, {
      props: {
        assignment: assignment,
        sequences: AssignmentTestService.giveMeSomeSequences(3),
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
