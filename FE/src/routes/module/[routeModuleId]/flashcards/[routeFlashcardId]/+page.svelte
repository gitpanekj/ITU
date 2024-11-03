<!-- Flashcard exercise detail - src/routes/module/[moduleId]/flashcards/[flashcardId]/+page.svelte -->
<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import Spinner from "$lib/components/Spinner.svelte";
  import FlashcardQuestion from "$lib/components/flashcards/FlashcardQuestion.svelte";
  import type { Link } from "$lib/utils/dataTypes.js";
  import { onMount } from "svelte";

  export let data;
  const moduleId: number = data.props.moduleId;
  const flashcardId: number = data.props.flashcardId;

  // Navbar
  let links: Array<Link> = [["Zpět do lekce", `/module/${moduleId}`, () => {}]];
  let title: string = "Flashcard exercise";

  let sessionCreated = false;

  onMount(async () => {
      await createSession();
  });



  const createSession = async () => {
    const response = await fetch(`http://localhost:3000/flashcard-exercise/create_session/${flashcardId}`);
    const data = await response.json();
    // save sessionId
    localStorage.setItem('flashcardSessionId', data.flashcardSessionId);
    sessionCreated = true;
  };

</script>

<Navbar {title} {links}/>
{#if sessionCreated}
  <FlashcardQuestion/>
{:else }
  <Spinner/>
{/if}
