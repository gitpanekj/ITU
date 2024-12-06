<!-------------------------------------------------------------- 
Filename: FE/src/routes/teacher/module/[routeModuleId]/reading/[routeReadingId]/+page.svelte
Author: Jan Pánek
Login: xpanek11
Last Modified: [06-12-2024]
Description: Page that shows the teacher detail of his reading exercise
---------------------------------------------------------------->


<!-- UI state of this page is determined by teacherView store -->
<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import QuestionDetail from "$lib/components/reading/QuestionDetail.svelte";
  import QuestionList from "$lib/components/reading/QuestionList.svelte";
  import type { Link } from "$lib/utils/dataTypes.js";
  import Editor from "$lib/components/reading/Editor.svelte";
  import { teacherQuestionPanelStore } from "../../../../../../stores/Reading/TeacherQuestionPanelStore.js";
  import { editorStore, saveEditorContents } from "../../../../../../stores/Reading/EditorStore.js";
  import { onMount } from "svelte";
  import { questionDetailStore } from "../../../../../../stores/Reading/QuestionDetailStore.js";

  
  export let data;
  const moduleId: number = data.props.moduleId;
  const readingId: number = data.props.readingId;
  
  
  // Navbar
  let links: Array<Link> = [["Zpět do lekce", `/teacher/module/${moduleId}`, () => {}]];
  let title: string = `Čtení s porozumněním`;
  let saveCallback: Function = () => {saveEditorContents(readingId)};

  onMount(() => {
    editorStore.set_edit_mode();
    questionDetailStore.set_edit_mode();
    teacherQuestionPanelStore.set_list_view();
  })
</script>


<Navbar {title} {links} {saveCallback}/>
<div class="w-[90%] mx-auto flex"
     style="height: calc(100vh - 4em)">
  <!-- Left half of the page - Text -->
  <div class="w-1/2  border-black">
    <Editor {readingId} editable={true}/>
  </div>

  <!-- Right half of the page - Quesiton or QuestionList  -->
  <div class="w-1/2  border-black flex flex-col justify-between pb-8">

    {#if $teacherQuestionPanelStore.state === "LIST"}
      <!-- List of questions -->
      <QuestionList {readingId}/>
    {:else}
      <!-- Detail of chosen question -->
      <QuestionDetail {readingId}/>
    {/if}

  </div>

</div>
