import { writable } from "svelte/store";


type TeacherQuestionPanelStore = { state: "LIST" | "DETAIL" };

function createTeacherQuestionPanelStore() {
  const { subscribe, set, update } = writable<TeacherQuestionPanelStore>({state: "LIST"});

  return {
    subscribe,
    set_list_view: () =>
      update((state: TeacherQuestionPanelStore) => {
        state.state = "LIST";
        return state;
      }),
    set_detail_view: () =>
      update((state: TeacherQuestionPanelStore) => {
        state.state = "DETAIL";
        return state;
      }),
  };
}

export const teacherQuestionPanelStore = createTeacherQuestionPanelStore();
