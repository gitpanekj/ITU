<!-- Quiz detail page - src/routes/module/[moduleId]/quiz/[quizId]/+page.svelte -->
<script lang="ts">
  import { page } from "$app/stores";
  import Navbar from "$lib/components/Navbar.svelte";
  import type { Link } from "$lib/utils/dataTypes.js";
  import { onMount } from "svelte";
  import QuestionDetail from "$lib/components/quiz/QuestionDetail.svelte";
  import QuestionList from "$lib/components/quiz/QuestionList.svelte";
  

  export let data;
  const moduleId: number = data.props.moduleId;
  const quizId: number = data.props.quizId;
  let selectedQuestionId: number;
    
  // Navbar
  let links: Array<Link> = [["Zpět do lekce", `/teacher/module/${moduleId}`, () => {}]];
  let title: string = `Quiz exercise`;

  onMount(() => {
    // TODO: fetching data after page render
  });
  
</script>


<Navbar {title} {links}/>
<!-- <div class="h-full w-11/12 mx-auto flex flex-col text-center justify-center font-bold text-4xl">
    Details of one quiz - id: {quizId}
</div> -->
<div class="flex h-screen">
  <div class="w-1/2 h-full p-4 border-rt border-black">
    <QuestionList {quizId} bind:selectedQuestionId on:selectQuestion={(event) => selectedQuestionId = event.detail.selectedQuestionId} />
  </div>

  <!-- Right column: Question detail -->
  <div class="w-1/2 h-full border-4 border-black border-t flex flex-col justify-between p-8">
    <h1 class="text-3xl mb-4">Náhled</h1>
    {#key selectedQuestionId}
      {@debug selectedQuestionId} <!-- DEBUG-->
      <QuestionDetail {selectedQuestionId}/>
    {/key}
  </div>
</div>


