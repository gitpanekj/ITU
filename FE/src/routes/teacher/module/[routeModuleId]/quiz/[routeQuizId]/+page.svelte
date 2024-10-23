<!-- Quiz detail page - src/routes/module/[moduleId]/quiz/[quizId]/+page.svelte -->
<script lang="ts">
  import { page } from "$app/stores";
  import Navbar from "$lib/components/Navbar.svelte";
  import type { Link } from "$lib/utils/dataTypes.js";
  import { onMount } from "svelte";

  export let data;
  const moduleId: number = data.props.moduleId;
  const quizId: number = data.props.quizId;
  
  // Navbar
  let links: Array<Link> = [["Zpět do lekce", `/teacher/module/${moduleId}`, () => {}]];
  let title: string = `Quiz exercise`;

  onMount(() => {
    // TODO: fetching data after page render
  });
</script>


<Navbar {title} {links}/>
<div class="h-full w-11/12 mx-auto flex flex-col text-center justify-center font-bold text-4xl">
    Details of one quiz - id: {quizId}
</div>
