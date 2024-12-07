import { writable } from "svelte/store";

type TeacherQuestionPanelStore = {
  state: "LIST" | "DETAIL";
  notificationPending: boolean;
  notificationText: string;
};

function createTeacherQuestionPanelStore() {
  const { subscribe, set, update } = writable<TeacherQuestionPanelStore>({
    state: "LIST",
    notificationPending: false,
    notificationText: "",
  });

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
    show_notification: (text: string) =>
      update((state: TeacherQuestionPanelStore) => {
        state.notificationPending = true;
        state.notificationText = text;
        return state;
      }),
    clear_notification: () =>
      update((state: TeacherQuestionPanelStore) => {
        state.notificationPending = false;
        state.notificationText = "";
        return state;
      }),
  };
}

export const teacherQuestionPanelStore = createTeacherQuestionPanelStore();
