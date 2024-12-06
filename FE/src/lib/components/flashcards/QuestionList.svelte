<!-------------------------------------------------------------- 
Filename: QuestionList.svelte
Author: Lucie Klímová
Login: xklimo04
Last Modified: [06-12-2024]
Description: Component defining a list of flashcards (questions)
---------------------------------------------------------------->

<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { getCardColor } from '$lib/utils/cardColors';
  import Spinner from "$lib/components/Spinner.svelte";
  import Feedback from "$lib/components/flashcards/Feedback.svelte";

  // Variables required by the component
  export let flashcardExerciseId: number;
  export let moduleId: number;

  // Expected format of a flashcard
  let questions: Card[] | null = null;
  interface Card {
    id: number;
    frontFace: string;
    backFace: string;
    hardCount: number;
    feedback: any;
    flashcardExerciseId: number;
    showFeedback: boolean;
  }
  // Pagination variables
  let page: number = 1;
  let totalRecords: number = 0;
  $: totalPages = Math.ceil(totalRecords / 4);
  //Sort variable
  let hardSortOrder: 'ASC' | 'DESC' | 'NONE' = 'DESC';
  
  // Function to fetch cards of specified exercise. Includes pagination and sorting defined by "hardSortOrder" variable.
  // Stores questions to "questions" array
  const fetchQuestions = async () => {
    const response = await fetch(`http://localhost:3000/flashcard-exercise/cards?page=${page}&limit=4&hard_order=${hardSortOrder}&flashcardExerciseId=${flashcardExerciseId}`);
    const { data, total } = await response.json();
    totalRecords = total;
    questions = data;
    if (questions){
      if (questions.length == 0){
        addQuestion(); // Add first empty card if there aren't any
      }
      questions = data.map((q: Card) => ({ ...q, showFeedback: false })); // For each card set "showFeedback" to false
    }
    
  };

  // Function to change sorting order, first changes the "hardSortOrder" variable and then refetches the cards
  // Goes back to the first page
  const toggleSort = () => {
    if (hardSortOrder === 'ASC') {
      hardSortOrder = 'NONE';
    } else if (hardSortOrder === 'DESC'){
      hardSortOrder = 'ASC';
    } else{
      hardSortOrder = 'DESC';
    }
    page = 1; //go to the beginning
    fetchQuestions();
  };

  // Function to delete a card defined by id
  // Params: 
  //    id: the card id
  const deleteQuestion = async (id: number) => {
    await fetch(`http://localhost:3000/flashcard-exercise/card/${id}`, {
      method: "DELETE"
    });
    await fetchQuestions();
  };

  // Function to add new empty flashcard
  // Resets the sorting, so the added card is on top
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
    hardSortOrder = "NONE"; //turn of sorting so the new card is on the top
    await fetchQuestions();
  };

  // Function to update a card defined by id
  // Params: 
  //    frontFace: new frontface of the card
  //    backFace: new backface of the card
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

  // Function to show/hide a feedback section of a specified card
  // Params: 
  //    id: the card id
  const toggleFeedback = (id: number) => {
    if(questions){
      questions = questions.map((q) =>
        q.id === id ? { ...q, showFeedback: !q.showFeedback } : q
      );
    }
  }

  // Fetch questions on mount
  onMount(fetchQuestions);
</script>

<div class="h-full flex flex-col justify-between mt-10">
  <div>
    <div class="relative w-4/5 mx-auto mb-4 flex justify-center">
      <!-- Add button -->
      <button
        on:click={() => {addQuestion();}}
        class="text-white bg-blue-500 p-2 rounded-lg hover:bg-blue-600">
        Přidat kartu
      </button>

      <!-- Student view button -->
      <button
      on:click={() => {goto(`/module/${moduleId}/flashcards/${flashcardExerciseId}`);}}
        class="text-white bg-blue-500 p-2 rounded-lg hover:bg-blue-600 absolute right-0">
        Procházet karty
      </button>
    </div>
    
    <!-- Flashcard List Container -->
    <div class="flex flex-col overflow-y-auto h-full w-4/5 gap-4 items-center mx-auto pt-10">
      <!-- Table Header -->
      <div class="w-full flex justify-between pl-5 font-semibold pr-[200px]">
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
        <!-- Card box -->
        <div class="w-full min-h-12 border-2 border-black bg-background rounded-lg flex flex-col p-4 gap-4">
          <!-- Main section -->
          <div class="flex items-start gap-4">
            <!-- FrontFace -->
            <textarea
              class="w-full border-2 p-2 rounded-lg focus:outline-none focus:border-blue-500 text-xl min-h-[125px]"
              placeholder="Zadejte líc karty..."
              bind:value={question.frontFace}
              on:blur={() => updateQuestion(question.id, question.frontFace, question.backFace)}
            ></textarea>

            <!-- BackFace -->
            <textarea
              class="w-full border-2 p-2 rounded-lg focus:outline-none focus:border-blue-500 text-xl min-h-[125px]"
              placeholder="Zadejte rub karty..."
              bind:value={question.backFace}
              on:blur={() => updateQuestion(question.id, question.frontFace, question.backFace)}
            ></textarea>
        
            <!-- Hard Count -->
            <p class={`p-2 rounded-lg ${getCardColor(question.hardCount)}`} style="min-width: 50px; text-align: center;">
              {question.hardCount}
            </p>
        
            <!-- Buttons -->
            <div class="flex flex-col gap-2">
              <!-- Delete Button -->
              <button
                on:click={(event) => { deleteQuestion(question.id); event.stopPropagation(); }}
                class="text-white bg-red-500 p-2 rounded-lg hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={questions.length === 1 && question.frontFace === "" && question.backFace === ""}>
                Odstranit
              </button>
              <!-- Feedback Button -->
              <button
                on:click={() => { toggleFeedback(question.id); }}
                class="text-white bg-blue-500 p-2 rounded-lg hover:bg-blue-600">
                Poznámky ({question.feedback ? Object.keys(question.feedback).length : 0})
              </button>
            </div>
          </div>
        
          <!-- Feedback Section -->
          {#if question.showFeedback}
            <Feedback feedbackFlashcardId={question.id} />
          {/if}
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
