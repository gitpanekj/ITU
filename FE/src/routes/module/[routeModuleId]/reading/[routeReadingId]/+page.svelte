<!-------------------------------------------------------------- 
Filename: FE/src/routes/module/[routeModuleId]/reading/[routeReadingId]/+page.svelte
Author: Jan Pánek
Login: xpanek11
Last Modified: [06-12-2024]
Description: Page that shows the student's view of a reading exercise
---------------------------------------------------------------->

<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import ReadingQuestion from "$lib/components/reading/ReadingQuestion.svelte";
  import type { Link } from "$lib/utils/dataTypes.js";
  import { onMount } from "svelte";
  import ReadingEvaluation from "$lib/components/reading/ReadingEvaluation.svelte";
  import ReadingEvaluationDetail from "$lib/components/reading/ReadingEvaluationDetail.svelte";
  import Editor from "$lib/components/reading/Editor.svelte";
  import { studentQuestionPanelStore } from "../../../../../stores/Reading/StudentQuestionPanelStore";

  // Route parameters and fetched data
  export let data;
  const moduleId: number = data.props.moduleId;
  const readingId: number = data.props.readingId;
  
  // Navbar links
  let links: Array<Link> = [["Zpět do lekce", `/module/${moduleId}`, () => {}]];
  let title: string = "Čtení s porozuměním";

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
    studentQuestionPanelStore.set_quiz_view();
    await createSession();
  })

</script>


<Navbar {title} {links}/>
<div class="h-full w-11/12 mx-auto flex">
  <!-- Left half of the page - Text -->
  <div class="w-1/2">
    <Editor {readingId} editable={false}/>
  </div>

  <!-- Right half of the page - ReadingQuestion / ReadingEvaluation / ReadingEvaluationDetail  -->
  <div class="w-1/2 flex flex-col" style="height: calc(100vh - 4em)">
    {#if sessionCreated == false}
      Creaiting session
    {:else }
      {#if $studentQuestionPanelStore.state === "QUIZ"}
        <!-- Single reading question -->
        <ReadingQuestion {readingId}/>
      {:else if $studentQuestionPanelStore.state === "EVALUATION"}
        <!-- Evaluation after reading finish -->
        <ReadingEvaluation/>
      {:else}
        <!-- Detail of evaluated question from reading evaluation -->
        <ReadingEvaluationDetail {readingId}/>
      {/if}
    {/if}
  </div>   
</div>
