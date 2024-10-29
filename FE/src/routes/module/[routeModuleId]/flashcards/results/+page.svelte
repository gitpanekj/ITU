<!-- Flashcards result - src/routes/module/[moduleId]/flashcards/results/+page.svelte -->
<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import Spinner from "$lib/components/Spinner.svelte";
  import type { Link } from "$lib/utils/dataTypes.js";
  import { onMount } from "svelte";

  export let data;
  const moduleId: number = data.props.moduleId;

  // Navbar
  let links: Array<Link> = [["Zpět do lekce", `/module/${moduleId}`, () => {}]];
  let title: string = "Flashcard exercise";


  interface HardCard {
    id: number;
    frontFace: string;
    backFace: string;
    hardCount: number;
    feedback: string;
    flashcardExerciseId: number;
    isFlipped: boolean;
  }

  interface HardCardsResponse {
    hard_cards: HardCard[];
  }

  let hardCards: HardCard[] | null = null;

  async function fetchHardCards(sessionId: number) {
    const response = await fetch(`http://localhost:3000/flashcard-exercise/marked_hard/${sessionId}`);
    const data: HardCardsResponse = await response.json();
    hardCards = data.hard_cards.map(card => ({ ...card, isFlipped: false }));
  }


  function flipCard(cardId: number) {
    if (hardCards) {
      hardCards = hardCards.map(card => 
        card.id === cardId ? { ...card, isFlipped: !card.isFlipped } : card
      );
    }
  }

  async function submitFeedback(card: HardCard) {
    try {
    const response = await fetch('http://localhost:3000/flashcard-exercise/feedback', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        flashcardId: card.id,
        feedback: card.feedback,
      }),
    });
    } catch (error) {
        console.error("Error:", error);
    }
  }


  onMount(() => {
    const sessionId = Number(localStorage.getItem("flashcardSessionId"));
    if (sessionId) {
      fetchHardCards(sessionId);
    }
  });
</script>

<Navbar {title} {links} />
<h1 class="text-4xl font-bold text-center py-4 my-8 border-t-4 border-b-4 border-header">
  Výsledky flashcards
</h1>

{#if hardCards}
  {#if hardCards.length > 0}
    <h1 class="text-4xl font-bold text-center">Těžké karty</h1>
    
    <div class="flex flex-col overflow-y-auto h-full w-4/5 gap-4 items-center mx-auto my-auto pt-10">
      {#each hardCards as card (card.id)}
        <div class="flex w-full gap-4 items-start">

          <button 
            class="w-3/5 min-h-12 border-2 border-black rounded-lg flex gap-2 items-center p-4 cursor-pointer hover:bg-slate-200"
            on:click={() => flipCard(card.id)}>
            
            <h1 class="w-16 border-2 bg-red-500 font-bold rounded-lg text-center flex justify-center items-center">
              Těžké
            </h1>
            <div class="flex-grow flex flex-col items-center">
              <p class="text-xl font-semibold">{card.frontFace}</p>
              <hr class="w-full">
              <p class={`text-xl font-semibold ${card.isFlipped ? 'opacity-100' : 'opacity-0'}`}>
                {card.backFace}
              </p>
            </div>
          </button>

          <div class="flex flex-col gap-2 w-2/5">
            <textarea
              class="w-full border-2 p-2 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Zadejte poznámku ke kartě..."
              bind:value={card.feedback}
            ></textarea>
            <button
              class="text-white bg-blue-500 p-2 rounded-lg hover:bg-blue-600"
              on:click={() => submitFeedback(card)}>
              Odeslat
            </button>
          </div>
        </div>
      {/each}
    </div>
  {:else}
  <h1 class="text-4xl font-bold text-center">Výborně, žádné karty jste neoznačili jako těžké.</h1>
  {/if}
{:else}
  <Spinner />
{/if}
