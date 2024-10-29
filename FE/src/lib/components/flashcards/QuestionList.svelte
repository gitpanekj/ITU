<script lang="ts">
  import { onMount } from "svelte";
    
  export let flashcardExerciseId: number;

  let questions: any = [];
  let page: number = 1;
  let totalRecords: number = 0;
  $: totalPages = Math.ceil(totalRecords / 4);
  
  const fetchQuestions = async () => {
    const response = await fetch(`http://localhost:3000/flashcard-exercise/cards?flashcardExerciseId=${flashcardExerciseId}&page=${page}&limit=4`);
    const { data, total } = await response.json();
    totalRecords = total;
    questions = data;
  };

  const deleteQuestion = async (id: number) => {
    await fetch(`http://localhost:3000/flashcard-exercise/card/${id}`, {
      method: "DELETE"
    });
    await fetchQuestions();
  };

  const addQuestion = async () => {
    await fetch(`http://localhost:3000/flashcard-exercise/card`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
		frontFace: "",
		backFace: "",
		flashcardExerciseId: flashcardExerciseId})
     });
    await fetchQuestions();
  };

  const updateQuestion = async (id: number, frontFace: string, backFace: string) => {
    await fetch(`http://localhost:3000/flashcard-exercise/card/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        frontFace: frontFace,
        backFace: backFace })
    });
    await fetchQuestions();
  };

  onMount(fetchQuestions);
</script>

<div class="h-full flex flex-col justify-between mt-10">
  <div>
    <button
    on:click={() => {addQuestion();}}
      class="border-2 border-blue-900 hover:bg-blue-900 hover:text-blue-200 py-2 px-4 rounded-full bg-blue-500">
      Přidat kartu
    </button>
    
    <!-- Question List Container -->
    <div class="flex flex-col overflow-y-auto h-full w-4/5 gap-4 items-center mx-auto my-auto pt-10">
      {#each questions as question}
        <div class="flex w-full gap-4 items-start">
          <div class="w-full min-h-12 border-2 border-black rounded-lg flex gap-2 items-center p-4 cursor-pointer hover:bg-slate-200">
            
            <!-- Editable FrontFace Input -->
            <textarea
            class="w-full border-2 p-2 rounded-lg focus:outline-none focus:border-blue-500 text-xl min-h-40"
            placeholder="Zadejte líc karty..."
            bind:value={question.frontFace}
            on:blur={() => updateQuestion(question.id, question.frontFace, question.backFace)}
          ></textarea>
            
            
          <textarea
          class="w-full border-2 p-2 rounded-lg focus:outline-none focus:border-blue-500 text-xl min-h-40"
          placeholder="Zadejte rub karty..."
          bind:value={question.backFace}
          on:blur={() => updateQuestion(question.id, question.frontFace, question.backFace)}
        ></textarea>
            
            <!-- Delete Button -->
            <button
              on:click={(event) => { deleteQuestion(question.id); event.stopPropagation(); }}
              class="border-2 border-blue-900 hover:bg-red-900 hover:text-red-200 py-1 px-2 rounded-full bg-red-500">
                Odstranit
            </button>
            
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Pagination Controls -->
  <div class="w-full border-black border-4 h-12 flex gap-4 justify-center items-center">
    <button on:click={() => { if (page > 1) page -= 1; fetchQuestions(); }}>Prev</button>
    <h1>{page}/{totalPages}</h1>
    <button on:click={() => { if (page < totalPages) page += 1; fetchQuestions(); }}>Next</button>
  </div>
</div>
