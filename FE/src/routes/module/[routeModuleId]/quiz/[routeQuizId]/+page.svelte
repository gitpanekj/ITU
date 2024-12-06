<!-- Quiz detail page - src/routes/module/[moduleId]/quiz/[quizId]/+page.svelte -->
<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import type { Link } from "$lib/utils/dataTypes.js";
  import { onMount } from "svelte";
  import QuizQuestion from "$lib/components/quiz/QuizQuestion.svelte";
  import QuizEvaluation from "$lib/components/quiz/QuizEvaluation.svelte";
  import { userView } from "../../../../../stores/Quiz/userView";
  import { goto } from "$app/navigation";

  // Route parameters and fetched data
  export let data;
  const moduleId: number = data.props.moduleId;
  const quizId: number = data.props.quizId;
  
  // Navbar links
  let links: Array<Link> = [["Zpět do lekce", `/module/${moduleId}`, () => {}]];
    let title: string = "Quiz exercise";


  let sessionActive = false;

  const createSession = async () => {
    const response = await fetch(`http://localhost:3000/quiz-exercise/create_session/${quizId}`);
    const data = await response.json();
    localStorage.setItem('quizSessionId', data.quizSessionId);
    sessionActive = true;
  }

  onMount(async () => {
    userView.goto_question_view();
    await createSession();
  });

</script>


<Navbar {title} {links}/>

{#if !sessionActive}
  Vytváří se session
{:else}
  {#if $userView.view === "question"}
    <QuizQuestion/>
  {:else}
    <QuizEvaluation/>
  {/if}

{/if}




