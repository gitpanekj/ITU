<!-- Flashcard exercise detail - src/routes/module/[moduleId]/flashcards/[flashcardId]/+page.svelte -->
<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import Spinner from "$lib/components/Spinner.svelte";
  import FlashcardQuestion from "$lib/components/flashcards/FlashcardQuestion.svelte";
  import type { Link } from "$lib/utils/dataTypes.js";
  import { onMount } from "svelte";

  export let data;
  const moduleId: number = data.props.moduleId;
  let results = [];
  
  // Fetch the flashcards marked as hard for this session
  onMount(async () => {
    const sessionId = localStorage.getItem("flashcardSessionId");
    if (sessionId) {
      const response = await fetch(`http://localhost:3000/flashcard-exercise/marked_hard/${sessionId}`);
      if (response.ok) {
        results = await response.json();
      } else {
        console.error("Failed to load results.");
      }
    }
  });
</script>

<h1>Results for Module {moduleId}</h1>
{#if results.length > 0}
  <ul>
    {#each results as result}
      <li>{result.frontFace} - Marked as hard</li>
    {/each}
  </ul>
{:else}
  <p>No flashcards marked as hard.</p>
{/if}