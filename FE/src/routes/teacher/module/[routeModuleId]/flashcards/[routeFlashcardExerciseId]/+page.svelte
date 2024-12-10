<!-------------------------------------------------------------- 
Filename: src\routes\teacher\module\[routeModuleId]\flashcards\[routeFlashcardExerciseId]\+page.svelte
Author: Lucie Klímová
Login: xklimo04
Last Modified: [06-12-2024]
Description: Page that shows the teacher detail of his flashcard exercise
---------------------------------------------------------------->
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
  let title: string = `Flashcards`;

  onMount(() => {
    // nothing to do
  });
</script>


<Navbar {title} {links}/>
<div class="h-full w-11/12 mx-auto flex flex-col text-center justify-center font-bold text-4xl">
  <!-- Show the card list -->
  <QuestionList {flashcardExerciseId} {moduleId}/>
</div>
