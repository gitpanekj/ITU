<script lang="ts">
  import { onMount } from "svelte";
  import { createEventDispatcher } from 'svelte';

  export let quizId: number;
  export let selectedQuestionId: number | null = null;

  const dispatch = createEventDispatcher();

  // Function to handle selecting a question and dispatching the event
  const selectQuestion = (id: number) => {
    selectedQuestionId = id;
    dispatch('selectQuestion', { selectedQuestionId }); // Dispatch the event with the selectedQuestionId
  };

  let questions: any = [];
  let page: number = 1;


  const fetchQuestions = async () => {
    const response = await fetch(`http://localhost:3000/quiz-exercise/question?quizId=${quizId}&page=${page}`);
    const { data, total } = await response.json();
    questions = data;

    // Set selectedQuestionId to the first question's ID only if not already selected
    if (questions.length > 0 && selectedQuestionId === null) {
      selectQuestion(questions[0].id);
    }
  };

  const addQuestion = async () => {
    const response = await fetch(`http://localhost:3000/quiz-exercise/question`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: "Nová otázka", question: "Text otázky", quizId: quizId, rightAnswerId: null })
    });

    await fetchQuestions();
  };

  const deleteQuestion = async (id: number) => {
    const response = await fetch(`http://localhost:3000/quiz-exercise/question/${id}`, {
      method: "DELETE"
    });

    await fetchQuestions();
  };

  onMount(async () => {
    await fetchQuestions();
  });
</script>

<!-- Debugging questions -->
{@debug questions}


<div class="flex justify-between">
<h1 class="text-3xl mb-4">Otázky</h1>
<button 
  on:click={() => { addQuestion(); }}
  class="border-2 border-blue-900 hover:bg-blue-600 hover:text-blue-200 py-2 px-4 size-12 rounded-full bg-blue-950 text-white text-xl text-justify">
    +
</button>
</div>
<hr class="h-1 mt-4 bg-blue-950 border-0 dark:bg-blue-950 w-11/12 overflow-y-auto">

<!-- Questions header -->
<div class="w-11/12 flex justify*between items-center mt-6">
  <div class="ml-4 text-4xl w-96 font-bold text-start">Název</div>
  <div class="w-36 text-2xl">Správně</div>
  <div class="w-36 text-2xl">Špatně</div>
  <div class="w-36 text-2xl">Těžké</div>

</div>


<div class="flex flex-col mt-0 pt-4 gap-2 overflow-y-auto max-h-full" style="max-height: 80vh;">
{#each questions as question (question.id)}
  <button 
    class={`w-11/12 h-14 px-4 border-4 border-blue-950 flex justify-between items-center rounded-lg cursor-pointer 
    ${selectedQuestionId === question.id ? ' border-blue-400' : 'hover:bg-gray-300 hover:border-blue-400'}`}
    on:click={() => selectQuestion(question.id)}>

    <div class="text-2xl w-96 text-start">{question.name}</div>
    <div class="w-36 text-2xl">{question.noCorrect}</div>
    <div class="w-36 text-2xl">{question.noWrong}</div>
    <div class="w-36 text-2xl">{question.hardCount}</div>
    
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

{@debug selectedQuestionId}
