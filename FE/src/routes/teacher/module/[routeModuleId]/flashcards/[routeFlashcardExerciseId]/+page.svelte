<!-- Flashcard exercise detail - src/routes/module/[moduleId]/flashcards/[flashcardExcerciseId]/+page.svelte -->
<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import QuestionList from "$lib/components/flashcards/QuestionList.svelte";
  import Feedback from "$lib/components/flashcards/Feedback.svelte";
  import type { Link } from "$lib/utils/dataTypes.js";
  import { onMount } from "svelte";

  export let data;
  const moduleId: number = data.props.moduleId;
  const flashcardExerciseId: number = data.props.flashcardExerciseId;

  // Navbar
  let links: Array<Link> = [["Zpět do lekce", `/teacher/module/${moduleId}`, () => {}]];
  let title: string = `Flashcard exercise`;

  let feedbackFlashcardId : number | null = Number(localStorage.getItem('feedbackFlashcardId'));

  // Event handler to set feedback ID
  const handleFeedback = (event: CustomEvent) => {
    feedbackFlashcardId = Number(localStorage.getItem('feedbackFlashcardId'));
  };
  onMount(() => {
    // TODO: fetching data after page render
  });
</script>


<Navbar {title} {links}/>
<div class="h-full w-11/12 mx-auto flex flex-col text-center justify-center font-bold text-4xl">
  {#if feedbackFlashcardId}
    <Feedback {feedbackFlashcardId} on:feedback={handleFeedback}/>
  {:else}
    <QuestionList {flashcardExerciseId} {moduleId} on:feedback={handleFeedback}/>
  {/if}
</div>
