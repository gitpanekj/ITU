<!-- Flashcard exercise detail - src/routes/module/[moduleId]/flashcards/[flashcardId]/+page.svelte -->
<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import type { Link } from "$lib/utils/dataTypes.js";
  import { onMount } from "svelte";

  export let data;
  const moduleId: number = data.props.moduleId;
  const flashcardId: number = data.props.flashcardId;

  // Navbar
  let links: Array<Link> = [["Zpět do lekce", `/module/${moduleId}`, () => {}]];
  let title: string = "Flashcard exercise";

  onMount(() => {
    // TODO: fetching data after page render
  });
</script>

<Navbar {title} {links}/>
<div class="h-full w-11/12 mx-auto flex flex-col text-center justify-center font-bold text-4xl">
    Quiz exercise - moduleId: {moduleId}, flashcardExerciseId: {flashcardId}
</div>
