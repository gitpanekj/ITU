<!-- Reading page - src/routes/module/[moduleId]/quiz/[readingId]/+page.svelte -->
<script lang="ts">
  import { page } from "$app/stores";
  import Navbar from "$lib/components/Navbar.svelte";
  import QuestionDetail from "$lib/components/reading/QuestionDetail.svelte";
  import QuestionList from "$lib/components/reading/QuestionList.svelte";
  import QuestionLis from "$lib/components/reading/QuestionList.svelte";
  import type { Link } from "$lib/utils/dataTypes.js";
  import { onMount } from "svelte";
  import { teacherView } from "../../../../../../stores/Reading/teacherView.js";
  import { read } from "$app/server";
  import Editor from "$lib/components/reading/Editor.svelte";

  
  export let data;
  const moduleId: number = data.props.moduleId;
  const readingId: number = data.props.readingId;
  console.log(readingId);
  
  // Navbar
  let links: Array<Link> = [["Zpět do lekce", `/teacher/module/${moduleId}`, () => {}]];
  let title: string = `Reading exercise`;

</script>


<Navbar {title} {links}/>
<div class="w-[90%] mx-auto flex"
     style="height: calc(100vh - 4em)">
  <!-- Text -->
  <div class="w-1/2 border-x-4 border-black">
    <Editor {readingId}/>
  </div>

  <!-- Right content  -->
  <div class="w-1/2 border-x-4 border-black flex flex-col justify-between pb-8">
    {#if $teacherView.view === "list"}
      <QuestionList {readingId}/>
    {:else}
      <QuestionDetail questionId={$teacherView.id}/>
    {/if}
  </div>

</div>
