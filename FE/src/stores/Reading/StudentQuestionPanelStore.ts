import { writable } from "svelte/store";

type StudentQuestionPanelStore = {
  state: "QUIZ" | "EVALUATION" | "EVALUATION_DETAIL";
  questionId?: number; name?: string; question_text?: string; correct?: string; chosen?: string; hard?: boolean;
};

function createStudentQuestionPanelStore() {
  const { subscribe, set, update } = writable<StudentQuestionPanelStore>({
    state: "QUIZ",
  });

  return {
    subscribe,
    set_quiz_view: () =>
      update((state: StudentQuestionPanelStore) => {
        state.state = "QUIZ";
        return state;
      }),
    set_evaluation_view: () =>
      update((state: StudentQuestionPanelStore) => {
        state.state = "EVALUATION";
        return state;
      }),
    set_evaluation_detail_view: () =>
      update((state: StudentQuestionPanelStore) => {
        state.state = "EVALUATION_DETAIL";
        return state;
      }),
  };
}

export const studentQuestionPanelStore = createStudentQuestionPanelStore();
