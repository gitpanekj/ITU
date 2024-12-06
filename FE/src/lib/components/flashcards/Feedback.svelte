<!-------------------------------------------------------------- 
Filename: Feedback.svelte
Author: Lucie Klímová
Login: xklimo04
Last Modified: [06-12-2024]
Description: Component defining feedback section of a card
---------------------------------------------------------------->
<script lang="ts">
  import { onMount } from "svelte";

  // Variable required by the component  
  export let feedbackFlashcardId: number;

  // Feedbacks of the card
  let feedbacks: string[] | null = null;

  // Function to fetch the feedback
  // The card info is not used
  const fetchFeedback = async () => {
    const response = await fetch(`http://localhost:3000/flashcard-exercise/card/${feedbackFlashcardId}`);
    const { flashcard, feedback } = await response.json();
    feedbacks = feedback;
  };

  // Fetch the feedback on mount
  onMount(fetchFeedback);
</script>

<div class="space-y-4 overflow-y-auto max-h-[800px]">
  {#if feedbacks}
    {#if feedbacks.length > 0}
      <ul class="space-y-3">
        {#each feedbacks as feedback}
        <!-- Feedback item -->
          <li class="p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm">
            <p class="text-gray-700 text-lg">{feedback}</p>
          </li>
        {/each}
      </ul>
    {:else}
      <h1 class="text-lg font-medium text-gray-600">K této kartě zatím nejsou žádné poznámky.</h1>
    {/if}
  {/if}
</div>
