<!-- Flashcard exercise detail - src/routes/module/[moduleId]/flashcards/[flashcardId]/+page.svelte -->
<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import Progressbar from "$lib/components/Progressbar.svelte";
  import Spinner from "$lib/components/Spinner.svelte";
  import type { Link } from "$lib/utils/dataTypes.js";
  import { onMount } from "svelte";

  export let data;
  const moduleId: number = data.props.moduleId;
  const flashcardId: number = data.props.flashcardId;

  // Navbar
  let links: Array<Link> = [["Zpět do lekce", `/module/${moduleId}`, () => {}]];
  let title: string = "Flashcard exercise";

  // Flashcard
  let flashcard: {
    id: number, 
    frontFace: string,
    backFace: string,
    hardCount: number,
    feedback: string,
    flashcardExerciseId: number
  } | null = null; // Initially null, until data is fetched

  let isFlipped = false;
  let sessionCreated = false;
  let currentIndex = 1; // todo
  let total = 10; //todo

  // Fetch the flashcard data after the page render
  onMount(async () => {
      await createSession();
      const response = await fetch(`http://localhost:3000/flashcard-exercise/card/${flashcardId}`);
      const data = await response.json();
      flashcard = data.flashcard; // Set the flashcard data after fetching
  });

  function flipCard() {
    isFlipped = !isFlipped;
  }

  const createSession = async () => {
    const response = await fetch(`http://localhost:3000/flashcard-exercise/create_session/${flashcardId}`);
    const data = await response.json();
    // save sessionId
    localStorage.setItem('flashcardSessionId', data.flashcardSessionId);
    sessionCreated = true;
  };

</script>

<Navbar {title} {links}/>

{#if flashcard}
<button 
    type="button" 
    on:click={flipCard} 
    class="w-4/5 h-4/5 mt-8 border-2 border-black flex flex-col justify-between items-center cursor-pointer relative mx-auto my-auto p-5 rounded-xl"
>
    <div class="flex-grow flex flex-col items-center">
        <p class="text-xl">
          {flashcard.frontFace}
        </p>
        <hr class="w-full">
        <p class={`text-l ${isFlipped ? 'opacity-100' : 'opacity-0'}`}>
          {flashcard.backFace}
        </p>
    </div>
    <p class="text-lg font-semibold mt-auto">
      {isFlipped ? "Skrýt odpověď" : "Zobrazit odpověď"}
    </p>
</button>
<Progressbar {currentIndex} {total} />


<div class="feedback">
  <p>Feedback: {flashcard.feedback || "No feedback available"}</p>
</div>
{:else}
  <Spinner/>
{/if}