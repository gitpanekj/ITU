<!-- Reading page - src/routes/module/[moduleId]/quiz/[readingId]/+page.svelte -->
<!-- UI state of this page is determined by teacherView store -->
<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import QuestionDetail from "$lib/components/reading/QuestionDetail.svelte";
  import QuestionList from "$lib/components/reading/QuestionList.svelte";
  import type { Link } from "$lib/utils/dataTypes.js";
  import Editor from "$lib/components/reading/Editor.svelte";
  import { teacherQuestionPanelStore } from "../../../../../../stores/Reading/TeacherQuestionPanelStore.js";

  
  export let data;
  const moduleId: number = data.props.moduleId;
  const readingId: number = data.props.readingId;
  
  
  // Navbar
  let links: Array<Link> = [["Zpět do lekce", `/teacher/module/${moduleId}`, () => {}]];
  let title: string = `Čtení s porozumněním`;

</script>


<Navbar {title} {links}/>
<div class="w-[90%] mx-auto flex"
     style="height: calc(100vh - 4em)">
  <!-- Text -->
  <div class="w-1/2  border-black">
    <Editor {readingId} editable={true}/>
  </div>

  <!-- Right content  -->
  <div class="w-1/2  border-black flex flex-col justify-between pb-8">

    {#if $teacherQuestionPanelStore.state === "LIST"}
      <!-- LIST -->
      <QuestionList {readingId}/>
    {:else}
      <!-- DETAIL -->
      <QuestionDetail {readingId}/>
    {/if}

  </div>

</div>
