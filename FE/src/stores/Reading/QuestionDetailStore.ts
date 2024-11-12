import { writable } from "svelte/store";

type QuestionDetailState = {
  state: "EDITTING" | "LINKING_TEXT";
  questionId?: number;
  name?: string;
  question?: string;
  answer?: string;
  textAttached?: string;
};

function createQuestionDetailStore() {
  const { subscribe, set, update } = writable<QuestionDetailState>({
    state: "EDITTING",
  });

  return {
    subscribe,
    set,
    set_edit_mode: () =>
      update((state: QuestionDetailState) => {
        state.state = "EDITTING";
        return state;
      }),
    set_linking_text_mode: () =>
      update((state: QuestionDetailState) => {
        state.state = "LINKING_TEXT";
        return state;
      }),
    set_question: ({
      questionId,
      name,
      question,
      answer,
      textAttached,
    }: {
      questionId: number;
      name: string;
      question: string;
      answer: string;
      textAttached: string;
    }) => {
      update((state: QuestionDetailState) => {
        state.questionId = questionId;
        state.name = name;
        state.question = question;
        state.answer = answer;
        state.textAttached = textAttached;
        return state;
      });
    },
    get_question: () => {
      let questionId, name, question, answer, textAttached;
      update((state) => {
        questionId = state.questionId;
        name = state.name;
        question = state.question;
        answer = state.answer;
        textAttached = state.textAttached;
        return state;
      });
      return { questionId, name, question, answer, textAttached };
    },
  };
}

export const questionDetailStore = createQuestionDetailStore();

export const loadQuestionDetail = async (questionId: number | undefined) => {
  try {
    const response = await fetch(
      `http://localhost:3000/reading-exercise/question/${questionId}`
    );

    if (!response.ok) {
      const err = await response.text();
      throw new HttpError(response.status, response.statusText, err);
    }

    const data = await response.json();
    questionDetailStore.set_question({
      questionId: data.id,
      name: data.name,
      question: data.question,
      answer: data.answer,
      textAttached: data.textAttached,
    });
  } catch (err) {
    throw err;
  }
};

export const saveQuestionDetail = async () => {
  const question = questionDetailStore.get_question();

  try {
    const response = await fetch(
      `http://localhost:3000/reading-exercise/question/${question.questionId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // Indicate that the payload is JSON
        },
        body: JSON.stringify({
          name: question.name,
          question: question.question,
          answer: question.answer,
          textAttached: question.textAttached,
        }),
      }
    );
    if (!response.ok)
    {
      const err = await response.text();
      throw new HttpError(response.status, response.statusText, err);
    }
  } catch (err) {
    throw err;
  }
};
