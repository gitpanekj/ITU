<!-------------------------------------------------------------- 
Filename: \src\routes\module\[routeModuleId]\flashcards\[routeFlashcardId]\+page.svelte
Author: Lucie Klímová
Login: xklimo04
Last Modified: [06-12-2024]
Description: Page that shows the flashcards detail and allows student to flip it and submit feedback
---------------------------------------------------------------->
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

  // Create new session on mount
  onMount(async () => {
      await createSession();
  });


  // Function that creates new session and stores its id
  const createSession = async () => {
    const response = await fetch(`http://localhost:3000/flashcard-exercise/create_session/${flashcardId}`);
    const data = await response.json();
    // Save sessionId
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
