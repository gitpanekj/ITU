<!-- Quiz detail page - src/routes/module/[moduleId]/quiz/[quizId]/+page.svelte -->
<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import ReadingQuestion from "$lib/components/reading/ReadingQuestion.svelte";
  import type { Link } from "$lib/utils/dataTypes.js";
  import { onMount } from "svelte";
  import { userView } from "../../../../../stores/Reading/userView";
  import ReadingEvaluation from "$lib/components/reading/ReadingEvaluation.svelte";
  import ReadingEvaluationDetail from "$lib/components/reading/ReadingEvaluationDetail.svelte";
  import Editor from "$lib/components/reading/Editor.svelte";

  // Route parameters and fetched data
  export let data;
  const moduleId: number = data.props.moduleId;
  const readingId: number = data.props.readingId;
  
  // Navbar links
  let links: Array<Link> = [["Zpět do lekce", `/module/${moduleId}`, () => {}]];
  let title: string = "Reading exercise";

  let sessionCreated = false;

  // Create session
  const createSession = async () => {
    const response = await fetch(`http://localhost:3000/reading-exercise/create_session/${readingId}`);
    const data = await response.json();
    // save sessionId
    localStorage.setItem('readingSessionId', data.readingSessionId);
    sessionCreated = true;
  };

  onMount(async () => {
    await createSession();
  })

</script>


<Navbar {title} {links}/>
<div class="h-full w-11/12 mx-auto flex">
  <!-- Text -->
  <div class="w-1/2 border-4 border-black">
    <Editor {readingId} editable={false}/>
  </div>

  <!-- Right content  -->
  <div class="w-1/2 border-4 border-black flex flex-col" style="height: calc(100vh - 4em)">
    {#if sessionCreated == false}
      Creaiting session
    {:else }
      {#if $userView.view === "question"}
        <ReadingQuestion {readingId}/>
      {:else if $userView.view === "evaluation"}
        <ReadingEvaluation/>
      {:else}
        <ReadingEvaluationDetail question={$userView.question} {readingId}/>
      {/if}
    {/if}
  </div>   
</div>
