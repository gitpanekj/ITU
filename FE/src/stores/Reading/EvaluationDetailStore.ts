// Filename: FE/src/stores/Reading/EvaluationDetailStore.ts
// Author: Jan Pánek
// Login: xpanek11
// Last Modified: [06-12-2024]
// Description: Question evaluation component shared state
import { writable } from "svelte/store";

type EvaluationDetailState = {
  questionId?: number;
  name?: string;
  question_text?: string;
  correct?: string;
  chosen?: string;
  hard?: boolean;
};

function createEvaluationDetailStore() {
  const { subscribe, set, update } = writable<EvaluationDetailState>({});

  return {
    subscribe,
    set_question_evaluation: ({ // load data into QuestionEvaluationDetail
      questionId,
      name,
      question_text,
      correct,
      chosen,
      hard,
    }: {
      questionId: number;
      name: string;
      question_text: string;
      correct: string;
      chosen: string;
      hard: boolean;
    }) => {
      update((state: EvaluationDetailState) => {
        state.questionId = questionId;
        state.name = name;
        state.question_text = question_text;
        state.correct = correct;
        state.chosen = chosen;
        state.hard = hard;
        return state;
      });
    },
    get_question_evaluation: () => {  // retrieve component state
      let questionId, name, question_text, correct, chosen, hard;
      update((state) => {
        questionId = state.questionId;
        name = state.name;
        question_text = state.question_text;
        correct = state.correct;
        chosen = state.chosen;
        hard = state.hard;
        return state;
      });

      return { questionId, name, question_text, correct, chosen, hard };
    },
  };
}

export const evaluationDetailStore = createEvaluationDetailStore();

// Fetch data into the QuestionEvaluationDetail
export const loadEvaluationDetail = async (questionId: number, chosen: string, hard:boolean) => {
  try {
    const response = await fetch(
      `http://localhost:3000/reading-exercise/question/${questionId}`
    );
    if (!response.ok) {
      const err = await response.text();
      throw new HttpError(response.status, response.statusText, err);
    }
    const data = await response.json();

    

    evaluationDetailStore.set_question_evaluation({
      questionId: data.id,
      name: data.name,
      question_text: data.question,
      correct: data.answer,
      chosen: chosen,
      hard: hard,
    });
  } catch (err) {
    throw err;
  }
};
