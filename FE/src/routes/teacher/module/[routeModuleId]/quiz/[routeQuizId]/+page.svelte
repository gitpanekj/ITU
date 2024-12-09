<!-------------------------------------------------------------- 
Filename: FE/src/routes/teacher/module/[routeModuleId]/quiz/[routeQuizId]/+page.svelte
Author: Jiří Kantor
Login: xkanto16
Last Modified: [08-12-2024]
Description: Quiz teacher main page
---------------------------------------------------------------->
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
  let change = false;
    
  // Navbar
  let links: Array<Link> = [["Zpět do lekce", `/teacher/module/${moduleId}`, () => {}]];
  let title: string = `Quiz exercise`;

  onMount(() => {

  });
  
</script>


<Navbar {title} {links}/>

<div class="flex h-screen">

  <!-- Left column: Question list -->
  <div class="w-1/2 h-full p-4 border-a border-black border-4">
    {#key change}
      <QuestionList {quizId} {selectedQuestionId} on:selectQuestion={(event) => selectedQuestionId = event.detail.selectedQuestionId} />
    {/key}
  </div>

  <!-- Right column: Question detail -->
  <div class="w-1/2 h-full border-4 border-black border-a flex flex-col justify-between p-4">
    {#key selectedQuestionId}
      <QuestionDetail {selectedQuestionId} on:saveClicked={(event) => change = !change}/>
    {/key}
  </div>
</div>


