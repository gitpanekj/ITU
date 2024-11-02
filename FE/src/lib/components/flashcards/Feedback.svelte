<script lang="ts">
  import { onMount } from "svelte";
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
    
  export let feedbackFlashcardId: number;

  let card: Card | null = null;
  let feedbacks: string[] = [];
  interface Card {
    id: number;
    frontFace: string;
    backFace: string;
    hardCount: number;
    feedback: any;
    flashcardExerciseId: number;
  }

  const fetchQuestion = async () => {
    const response = await fetch(`http://localhost:3000/flashcard-exercise/card/${feedbackFlashcardId}`);
    const { flashcard, feedback } = await response.json();
    feedbacks = feedback;
    card = flashcard;
  };

  const hideFeedback = () => {
    localStorage.removeItem('feedbackFlashcardId');
    dispatch('feedback');
  }

  onMount(fetchQuestion);
</script>
<div class="h-full flex flex-col justify-between mt-10">
  <div>
    <button
      on:click={() => {hideFeedback();}}
      class="border-2 border-blue-900 hover:bg-blue-900 hover:text-blue-200 py-2 px-4 rounded-full bg-blue-500">
      Zpět
    </button>
      <!-- Table Header -->
      <div class="w-full flex justify-between p-5 font-semibold pr-[80px]">
        <span>Líc</span>
        <span>Rub</span>
        <span>Těžké</span>
      </div>
      {#if card != null}
      <div class="flex w-full gap-4 items-start">
        <div class="w-full min-h-12 border-2 border-black rounded-lg flex gap-2 items-center p-4">
          
          <textarea
          class="w-full border-2 p-2 rounded-lg focus:outline-none text-xl min-h-[125px]"
          bind:value={card.frontFace}
          readonly
        ></textarea>
          
        <textarea
        class="w-full border-2 p-2 rounded-lg focus:outline-none text-xl min-h-[125px]"
        bind:value={card.backFace}
        readonly
      ></textarea>

          <p class="mx-20">{card.hardCount}</p>
        </div>
      </div>
      {/if}
      <h1 class="mt-8">
        Poznámky k této kartě
      </h1>
      <div class="mt-8 space-y-4 overflow-y-auto max-h-[800px]">
        {#if feedbacks.length > 0}
          <ul class="space-y-3">
            {#each feedbacks as feedback}
              <li class="p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm">
                <p class="text-gray-700 text-lg">{feedback}</p>
              </li>
            {/each}
          </ul>
        {:else}
          <h1 class="text-lg font-medium text-gray-600">K této kartě zatím nejsou žádné poznámky.</h1>
        {/if}
      </div>
  </div>
</div>
