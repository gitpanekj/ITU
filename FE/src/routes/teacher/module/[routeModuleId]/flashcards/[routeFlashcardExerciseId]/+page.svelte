<!-- Flashcard exercise detail - src/routes/module/[moduleId]/flashcards/[flashcardExcerciseId]/+page.svelte -->
<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import QuestionList from "$lib/components/flashcards/QuestionList.svelte";
  import type { Link } from "$lib/utils/dataTypes.js";
  import { onMount } from "svelte";

  export let data;
  const moduleId: number = data.props.moduleId;
  const flashcardExerciseId: number = data.props.flashcardExerciseId;

  // Navbar
  let links: Array<Link> = [["Zpět do lekce", `/teacher/module/${moduleId}`, () => {}]];
  let title: string = `Flashcard exercise`;

  onMount(() => {
    // TODO: fetching data after page render
  });
</script>


<Navbar {title} {links}/>
<div class="h-full w-11/12 mx-auto flex flex-col text-center justify-center font-bold text-4xl">
    <QuestionList {flashcardExerciseId}/>
</div>
