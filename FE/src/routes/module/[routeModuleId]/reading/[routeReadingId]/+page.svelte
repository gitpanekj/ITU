<!-- Quiz detail page - src/routes/module/[moduleId]/quiz/[quizId]/+page.svelte -->
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
    studentQuestionPanelStore.set_quiz_view();
    await createSession();
  })

</script>


<Navbar {title} {links}/>
<div class="h-full w-11/12 mx-auto flex">
  <!-- Text -->
  <div class="w-1/2">
    <Editor {readingId} editable={false}/>
  </div>

  <!-- Right content  -->
  <div class="w-1/2 flex flex-col" style="height: calc(100vh - 4em)">
    {#if sessionCreated == false}
      Creaiting session
    {:else }
      {#if $studentQuestionPanelStore.state === "QUIZ"}
        <!-- QUIZ -->
        <ReadingQuestion {readingId}/>
      {:else if $studentQuestionPanelStore.state === "EVALUATION"}
        <!-- EVALUATION -->
        <ReadingEvaluation/>
      {:else}
        <!-- EVALUATION DETAIL -->
        <ReadingEvaluationDetail {readingId}/>
      {/if}
    {/if}
  </div>   
</div>
