<script lang="ts">
  import { onMount } from "svelte";
  import { createEventDispatcher } from 'svelte';
  import { goto } from "$app/navigation";
  import { getCardColor } from '$lib/utils/cardColors';
  import Spinner from "$lib/components/Spinner.svelte";

  const dispatch = createEventDispatcher();
    
  export let flashcardExerciseId: number;
  export let moduleId: number;

  let questions: any = null;
  let page: number = 1;
  let totalRecords: number = 0;
  $: totalPages = Math.ceil(totalRecords / 4);
  let hardSortOrder: 'ASC' | 'DESC' | 'NONE' = 'DESC';
  
  const fetchQuestions = async () => {
    const response = await fetch(`http://localhost:3000/flashcard-exercise/cards?page=${page}&limit=4&hard_order=${hardSortOrder}&flashcardExerciseId=${flashcardExerciseId}`);
    const { data, total } = await response.json();
    totalRecords = total;
    questions = data;
  };

  const toggleSort = () => {
    if (hardSortOrder === 'ASC') {
      hardSortOrder = 'NONE';
    } else if (hardSortOrder === 'DESC'){
      hardSortOrder = 'ASC';
    } else{
      hardSortOrder = 'DESC';
    }
    fetchQuestions();
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
        flashcardExerciseId: flashcardExerciseId
      })
    });
    hardSortOrder = "NONE";
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
        backFace: backFace
      })
    });
  };

  const showFeedback = (id: number) => {
    localStorage.setItem('feedbackFlashcardId', id.toString());
    dispatch('feedback');
  }

  onMount(fetchQuestions);
</script>

<div class="h-full flex flex-col justify-between mt-10">
  <div>
    <div class="relative w-4/5 mx-auto mb-4 flex justify-center">
      <button
        on:click={() => {addQuestion();}}
        class="text-white bg-blue-500 p-2 rounded-lg hover:bg-blue-600">
        Přidat kartu
      </button>

      <button
      on:click={() => {goto(`/module/${moduleId}/flashcards/${flashcardExerciseId}`);}}
        class="text-white bg-blue-500 p-2 rounded-lg hover:bg-blue-600 absolute right-0">
        Procházet karty
      </button>
    </div>
    
    <!-- Flashcard List Container -->
    <div class="flex flex-col overflow-y-auto h-full w-4/5 gap-4 items-center mx-auto pt-10">
      <!-- Table Header -->
      <div class="w-full flex justify-between pl-5 font-semibold pr-[280px]">
        <span>Líc</span>
        <span>Rub</span>
        <button class="flex items-center cursor-pointer" on:click={toggleSort}>
          Těžké
          {#if hardSortOrder === 'ASC'}
            ↑
          {:else if hardSortOrder === 'DESC'}
            ↓
          {:else}
            -
          {/if}
        </button>
      </div>
      {#if questions}
      {#each questions as question}
        <div class="flex w-full gap-4 items-start">
          <div class="w-full min-h-12 border-2 border-black bg-background rounded-lg flex gap-2 items-center p-4">
            <textarea
              class="w-full border-2 p-2 rounded-lg focus:outline-none focus:border-blue-500 text-xl min-h-[125px]"
              placeholder="Zadejte líc karty..."
              bind:value={question.frontFace}
              on:blur={() => updateQuestion(question.id, question.frontFace, question.backFace)}
            ></textarea>
            
            <textarea
              class="w-full border-2 p-2 rounded-lg focus:outline-none focus:border-blue-500 text-xl min-h-[125px]"
              placeholder="Zadejte rub karty..."
              bind:value={question.backFace}
              on:blur={() => updateQuestion(question.id, question.frontFace, question.backFace)}
            ></textarea>

            <p class={`mx-20 p-2 rounded-lg  ${getCardColor(question.hardCount)}`} style="min-width: 50px; text-align: center;">
              {question.hardCount}
            </p>
            <div class="flex flex-col gap-5">
              <button
                on:click={(event) => { deleteQuestion(question.id); event.stopPropagation(); }}
                class="text-white bg-red-500 p-2 rounded-lg hover:bg-red-600">
                Odstranit
              </button>
              <button
                on:click={() => {showFeedback(question.id);}}
                class="text-white bg-blue-500 p-2 rounded-lg hover:bg-blue-600">
                Poznámky
              </button>
            </div>
          </div>
        </div>
      {/each}
      {:else}
        <Spinner/>
      {/if}
    </div>
  </div>

  <!-- Pagination Controls -->
  <div class="w-full border-black border-4 h-12 flex gap-4 justify-center items-center">
    <button on:click={() => { if (page > 1) page -= 1; fetchQuestions(); }}>Předchozí</button>
    <h1>{page}/{totalPages}</h1>
    <button on:click={() => { if (page < totalPages) page += 1; fetchQuestions(); }}>Další</button>
  </div>
</div>
