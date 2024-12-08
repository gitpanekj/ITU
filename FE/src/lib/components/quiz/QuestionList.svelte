<!-------------------------------------------------------------- 
Filename: FE/src/lib/components/quiz/QuestionList.svelte
Author: Jiří Kantor
Login: xkanto16
Last Modified: [08-12-2024]
Description: Component obtaining fetching and manipulation with questions in list form
---------------------------------------------------------------->

<script lang="ts">
  // library import
  import { onMount } from "svelte";
  import { createEventDispatcher } from 'svelte';

  // property
  export let quizId: number;
  export let selectedQuestionId: number | null;

  // helper UI vars
  let questions: any = [];
  let page: number = 1;

  const dispatch = createEventDispatcher();

  // handling selected question and informing other components
  const selectQuestion = (id: number) => {
    selectedQuestionId = id;
    dispatch('selectQuestion', { selectedQuestionId }); 
  };

  // data fetch
  const fetchQuestions = async () => {
    const response = await fetch(`http://localhost:3000/quiz-exercise/question?quizId=${quizId}&page=${page}`);
    const { data, total } = await response.json();
    questions = data;

    // select first question if nothing selected
    if (questions.length > 0) {
      if (selectedQuestionId == null) {
          selectQuestion(questions[0].id);
      }
      
    }
  };

  // question adding
  const addQuestion = async () => {
    const response = await fetch(`http://localhost:3000/quiz-exercise/question`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: "Nová otázka", question: "Text otázky", quizId: quizId, rightAnswerId: null })
    });
    const data = await response.json();
    selectQuestion(data.id)
    await createNewAnswer(data.id);
    await fetchQuestions();
  };

  // question deletion
  const deleteQuestion = async (id: number) => {
    const response = await fetch(`http://localhost:3000/quiz-exercise/question/${id}`, {
      method: "DELETE"
    });
    selectedQuestionId = null;
    await fetchQuestions();
  };

  // answer adding
  const createNewAnswer = async (newQuestionId: number) => {
    const response = await fetch(`http://localhost:3000/quiz-exercise/answer/`, {
        method: "POST",
        headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answer: "odpověď", questionId: newQuestionId })
    });
    const data = await response.json();
    await setCorrectAnswer(newQuestionId, data.id);
  };

  // answer setting as correct
  const setCorrectAnswer = async (newQuestionId: number, correctAnswerId: number) => {
    const response = await fetch(`http://localhost:3000/quiz-exercise/question/${newQuestionId}`,
    {
      method: "PATCH",
      headers: {
            'Content-Type': 'application/json', 
        },
      body: JSON.stringify({rightAnswerId: correctAnswerId})
    });
  };

  onMount(async () => {
    await fetchQuestions();
  });
</script>

<!-- header with add question button -->
<div class="flex justify-between">
  <h1 class="text-3xl mb-4">Otázky</h1>
  <button 
    on:click={() => { addQuestion(); }}
    class="border-2 border-blue-900 hover:bg-blue-600 hover:text-blue-200 py-2 px-4 size-12 rounded-full bg-blue-950 text-white text-xl text-justify">
      +
  </button>
</div>
<hr class="h-1 mt-4 bg-blue-950 border-0 dark:bg-blue-950 w-11/12 overflow-y-auto">

<!-- question list header -->
<div class="w-11/12 flex justify*between items-center mt-6">
  <div class="ml-4 text-4xl w-96 font-bold text-start">Název</div>
  <div class="w-36 text-2xl">Správně</div>
  <div class="w-36 text-2xl">Špatně</div>
  <div class="w-36 text-2xl">Těžké</div>
</div>

<!-- question list -->
<div class="flex flex-col mt-0 pt-4 gap-2 overflow-y-auto max-h-full" style="max-height: 80vh;">
{#each questions as question (question.id)}
  <button 
    class={`w-11/12 h-14 px-4 border-4 flex justify-between items-center rounded-lg cursor-pointer 
    ${selectedQuestionId === question.id 
    ? 'border-blue-300 bg-gray-300'
    : 'hover:bg-gray-300 hover:border-blue-200 border-blue-950'}`}
    on:click={() => selectQuestion(question.id)}>

    <!-- question info items -->
    <div class="text-2xl w-96 text-start">{question.name}</div>
    <div class="w-36 text-2xl">{question.noCorrect}</div>
    <div class="w-36 text-2xl">{question.noWrong}</div>
    <div class="w-36 text-2xl">{question.hardCount}</div>
    
    <!-- delete button -->
    <button on:click={ async ()  => { await deleteQuestion(question.id);}} class="m-1 p-1 rounded-full bg-transparent hover:bg-red-400 border-0">
      <img
        alt="Smazat otázku"
        src="https://cdn2.iconfinder.com/data/icons/multimedia-collection-13/128/200211-22-512.png"
        class="w-8 h-8 object-cover rounded-full"
      />
    </button>
  </button>
{/each}
</div>
