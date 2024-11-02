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

  let page: number = 1;
  let totalRecords: number = 0;
  $: totalPages = Math.ceil(totalRecords / 10);

  interface HardCard {
    id: number;
    frontFace: string;
    backFace: string;
    hardCount: number;
    session_feedback: string;
    flashcardExerciseId: number;
    isFlipped: boolean;
  }

  let hardCards: HardCard[] | null = null;
  let sessionId: number | null = null;

  // Fetch hard cards data from API
  async function fetchHardCards() {
    try {
      const response = await fetch(`http://localhost:3000/flashcard-exercise/evaluate_session/${sessionId}?page=${page}&limit=10`);
      const {hard_cards, total} = await response.json();
      totalRecords = total;
      hardCards = hard_cards.map((card: HardCard) => ({ ...card, isFlipped: false }));
    } catch (error) {
      console.error("Failed to fetch hard cards:", error);
    }
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
        sessionId: sessionId,
        feedback: card.session_feedback,
      }),
    });
    } catch (error) {
        console.error("Error:", error);
    }
  }

  // Run fetchHardCards when the component mounts, only if sessionId is available
  onMount(() => {
    if (typeof window !== "undefined") {
      sessionId = Number(localStorage.getItem("flashcardSessionId"));
      if (sessionId) {
        fetchHardCards();
      } else {
        console.error("No session ID found in localStorage.");
      }
    }
  });
</script>

<Navbar {title} {links} />
<h1 class="text-4xl font-bold text-center py-4 my-8 border-t-4 border-b-4 border-header">
  Výsledky flashcards
</h1>

<h1 class="text-4xl font-bold text-center mb-5">Těžké karty</h1>
{#if hardCards}
  {#if hardCards.length > 0}
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
              <p class="text-2xl font-bold">{card.frontFace}</p>
              <hr class="w-full border-t-2 border-gray-500 my-2">
              <p class={`text-xl ${card.isFlipped ? 'opacity-100' : 'opacity-0'}`}>
                {card.backFace}
              </p>
            </div>
          </button>

          <div class="flex flex-col gap-2 w-2/5">
            <textarea
              class="w-full border-2 p-2 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Můžete zadat poznámku ke kartě..."
              bind:value={card.session_feedback}
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
    <!-- Pagination Controls -->
    <div class="w-full border-black border-4 h-12 flex gap-4 justify-center items-center">
      <button on:click={() => { if (page > 1) page -= 1; fetchHardCards(); }}>Předchozí</button>
      <h1>{page}/{totalPages}</h1>
      <button on:click={() => { if (page < totalPages) page += 1; fetchHardCards(); }}>Další</button>
    </div>
  {:else}
    <h1 class="text-lg font-medium text-gray-600 text-center">Výborně, žádné karty jste neoznačili jako těžké.</h1>
  {/if}
{:else}
  <Spinner />
{/if}
