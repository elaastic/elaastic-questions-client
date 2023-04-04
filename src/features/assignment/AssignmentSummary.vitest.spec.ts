import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { describe, expect, it, Mock, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { Assignment } from "src/features/assignment/assignment.interface";
import { ClientSequence } from "src/features/assignment/sequence/sequence.interface";
import AssignmentSummary from "src/features/assignment/AssignmentSummary.vue";
import { useSequenceList } from "src/features/assignment/sequence/sequence.query";
import { ref } from "vue";

installQuasarPlugin();

describe("Component for displaying the summary of an assignment", () => {
  vi.mock("src/features/assignment/sequence/sequence.query", () => ({
    useSequenceList: vi.fn(),
  }));

  it("should displays an error message when an error occurs while loading asynchronously the assignment content", () => {
    const serverErrorMsg = "There is an error !";
    (useSequenceList as Mock).mockImplementation(() => ({
      status: ref("error"),
      error: ref(new Error(serverErrorMsg)),
    }));

    const wrapper = mount(AssignmentSummary, {
      props: {
        assignment: giveMeAnAssignment(),
      },
      global: {
        mocks: { $tc: (msg: string) => msg },
      },
    });

    console.log(wrapper.html());

    const errorPanel = wrapper.find("div.q-banner[role='alert']");
    expect(errorPanel.exists()).toBeTruthy();
    expect(errorPanel.text()).toContain(serverErrorMsg);
  });


});

// TODO Factorize
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
