import type { Editor } from "@tiptap/core";
import { writable } from "svelte/store";

type ViewState = {
  view: string;
  highlight: boolean;
  editting: boolean;
  questionId?: number | null;
  name?: string | null;
  question?: string | null;
  answer?: string | null;
  textAttached?: boolean | null;
  editor?: Editor | null;
};

function createTeacherViewStore() {
  const { subscribe, set, update } = writable<ViewState>({
    view: "list",
    editting: false,
    highlight: false,
  });

  return {
    subscribe,
    /* state_management_functions */
    goto_list_view: () =>
      update((state: ViewState) => {
        state.view = "list";
        state.editting = false;
        state.highlight = false;
        state.questionId = null;
        state.name = null;
        state.question = null;
        state.answer = null;
        state.textAttached = null;
        return state;
      }),
    goto_detail: (id: number | null) =>
      update((state: ViewState) => {
        state.view = "detail";
        state.editting = false;
        state.highlight = false;
        state.questionId = id;
        state.name = null;
        state.question = null;
        state.answer = null;
        state.textAttached = null;
        return state;
      }),
    edit_mode: () =>
      update((state: ViewState) => {
        state.editting = true;
        return state;
      }),
    view_mode: () =>
      update((state: ViewState) => {
        state.editting = false;
        return state;
      }),
    load_question: (
      name: string,
      question: string,
      answer: string,
      textAttached: boolean
    ) =>
      update((state: ViewState) => {
        state.name = name;
        state.question = question;
        state.answer = answer;
        state.textAttached = textAttached;
        return state;
      }),
    attach_text: (textAttached: boolean) =>
      update((state: ViewState) => {
        state.textAttached = textAttached;
        return state;
      }),
    attach_editor: (editor: Editor) =>
      update((state: ViewState) => {
        state.editor = editor;
        return state;
      }),
  };
}

export const teacherView = createTeacherViewStore();
