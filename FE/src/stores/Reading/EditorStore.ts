// Filename: FE/src/stores/Reading/EditorStore.ts
// Author: Jan Pánek
// Login: xpanek11
// Last Modified: [06-12-2024]
// Description: Editor state store

import type { Editor } from "@tiptap/core";
import { writable } from "svelte/store";

// EDITTING mode - teacher can edit the editor content
// LINKING_TEXT mode - teacher links a question to a text section
type EditorState = {
  state: "EDITTING" | "LINKING_TEXT";
  editor?: Editor | null;
};

function createEditorStore() {
  const { subscribe, set, update } = writable<EditorState>({
    state: "EDITTING",
  });

  return {
    subscribe,
    attach_editor: (editor: Editor) => // attach editor instance
      update((state: EditorState) => {
        state.editor = editor;
        return state;
      }),
    set_edit_mode: () =>
      update((state: EditorState) => {
        state.state = "EDITTING";
        return state;
      }),
    set_linking_text_mode: () =>
      update((state: EditorState) => {
        state.state = "LINKING_TEXT";
        return state;
      }),
    set_editor_content: (data: string) =>  // set content of the attached editor
      update((state: EditorState) => {
        state.editor?.commands.setContent(data);
        return state;
      }),
    get_editor_content: () => { // Retrieve editor HTML if editor is defined
      let content;
      update((state) => {
        content = state.editor?.getHTML() || ""; 
        return state;
      });
      return content;
    },
  };
}

export const editorStore = createEditorStore();

// Methods to modify Editor State and text linkage
export const saveEditorContents = async (readingId: number) => {
  const content = editorStore.get_editor_content();

  try {
    const response = await fetch(
      `http://localhost:3000/reading-exercise/text/${readingId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: content,
        }),
      }
    );
    if (!response.ok) {
      const err = await response.text();
      throw new HttpError(response.status, response.statusText, err);
    }
  } catch (err) {
    throw err;
  }
};

export const loadEditorContents = async (readingId: number) => {
  try {
    const response = await fetch(
      `http://localhost:3000/reading-exercise/text/${readingId}`
    );

    if (!response.ok) {
      const err = await response.text();
      throw new HttpError(response.status, response.statusText, err);
    }

    const data = await response.text();
    editorStore.set_editor_content(data);
  } catch (err) {
    throw err;
  }
};

export const highlightLinkedText = async (
  readingId: number,
  questionId: number | undefined
) => {
  try {
    const response = await fetch(
      `http://localhost:3000/reading-exercise/text/highlight/${readingId}/${questionId}`
    );
    if (!response.ok) {
      const err = await response.text();
      throw new HttpError(response.status, response.statusText, err);
    }

    const data = await response.text();
    editorStore.set_editor_content(data);
  } catch (err) {
    throw err;
  }
};

export const deleteQuestionTextLink = async (
  readingId: number,
  questionId: number | undefined
) => {
  try {
    const response = await fetch(
      `http://localhost:3000/reading-exercise/text/highlight/${readingId}/${questionId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      const err = await response.text();
      throw new HttpError(response.status, response.statusText, err);
    }
    const data = await response.text();
    editorStore.set_editor_content(data);
  } catch (err) {
    throw err;
  }
};

export const linkTextToQuestion = async (questionId: number | undefined) => {
  try {
    const response = await fetch(
      `http://localhost:3000/reading-exercise/text/highlight/${questionId}`,
      {
        method: "POST",
      }
    );
    if (!response.ok) {
      const err = await response.text();
      throw new HttpError(response.status, response.statusText, err);
    }
  } catch (err) {
    throw err;
  }
};
