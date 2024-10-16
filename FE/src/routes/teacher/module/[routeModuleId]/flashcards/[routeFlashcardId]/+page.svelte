<!-- Flashcard exercise detail - src/routes/module/[moduleId]/flashcards/[flashcardId]/+page.svelte -->
<script lang="ts">
  import { onMount } from "svelte";

  export let data;
  const moduleId: number = data.props.moduleId;
  const flashcardId: number = data.props.flashcardId;

  onMount(() => {
    // TODO: fetching data after page render
  });
</script>

<h1>Flashcards detail - route: "/modules/{moduleId}/{flashcardId}"</h1>
