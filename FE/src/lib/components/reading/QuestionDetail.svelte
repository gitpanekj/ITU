<!-------------------------------------------------------------- 
Filename: FE/src/lib/components/reading/QuestionDetail.svelte
Author: Jan Pánek
Login: xpanek11
Last Modified: [06-12-2024]
Description: Component for detail of a question and it's update
---------------------------------------------------------------->

<script lang="ts">
  // Libs
  import { loadQuestionDetail, questionDetailStore, saveQuestionDetail } from "../../../stores/Reading/QuestionDetailStore";
  import { deleteQuestionTextLink, editorStore, highlightLinkedText, loadEditorContents, saveEditorContents } from "../../../stores/Reading/EditorStore";
  import { teacherQuestionPanelStore } from "../../../stores/Reading/TeacherQuestionPanelStore";
  
  // Props
  export let readingId;
  
  // UI state
  let highlighted = false;

  const saveAndReturnBackButtonEvent = async () => {
    try {
    await saveEditorContents(readingId);
    await loadEditorContents(readingId);       // clear potential highlights
    await saveQuestionDetail();                // save linked text
    } catch(err) {alert('Failed to save the question.');}
    teacherQuestionPanelStore.set_list_view(); // change view

    teacherQuestionPanelStore.show_notification("Otázka úspěšně upravena uložen");
    setTimeout(() => {
      teacherQuestionPanelStore.clear_notification();
    }, 2000);
  };

  const linkTextButtonEvent = async () => {
    await saveQuestionDetail();
    questionDetailStore.set_linking_text_mode();
    editorStore.set_linking_text_mode();
  };

  const unLinkTextButtonEvent = async () => {
    try {
    await saveQuestionDetail();
    await deleteQuestionTextLink(readingId, $questionDetailStore.questionId);
    await loadQuestionDetail($questionDetailStore.questionId);
    } catch(err) {alert('Failed to unlink the text.');}
  };

  const highlightTextButtonEvent = async () => {
    try {
    await highlightLinkedText(readingId, $questionDetailStore.questionId);
  } catch(err) {
    await saveQuestionDetail();
    await unLinkTextButtonEvent();
    await loadQuestionDetail($questionDetailStore.questionId);
    alert('Oops. Vypadá to, že tenhle odkaz byl smazán.');
  }
    highlighted = !highlighted;
  };

  const unHighlightTextButtonEvent = async () => {
    try {
    await loadEditorContents(readingId);
  } catch(err) {alert('Failed to remove the text highlight.');}
    highlighted = !highlighted;
  };

</script>



<div class="h-full overlay">
  <!-- Sub-navbar -->
  <div class="w-full px-8 h-16 bg-slate-300 flex flex-row items-center justify-end rounded-br-xl">
    <button on:click={async () => saveAndReturnBackButtonEvent()} class="py-2 px-4 flex justify-center items-center border-2 border-slate-700 rounded bg-slate-100 hover:bg-slate-700 hover:text-slate-100">
      Uložit a vrátit zpět
    </button>
  </div>


  <!-- question + result -->
  <div class="flex flex-col px-8 py-8">
    <!-- Question -->
    <div class="w-full border-4 border-black p-4 rounded-2xl flex flex-col gap-4">

      <!-- Question header -->
      <div class="flex gap-4 justify-start items-center">
        <h1 class="text-2xl font-bold text-center">Název otázky</h1>
        <input bind:value={$questionDetailStore.name} type="text" class="rounded-lg h-12 text-xl font-bold px-2 w-4/6 border-black border-2"/>
      </div>
      <br/>

      <!-- Question text input space -->
      <textarea bind:value={$questionDetailStore.question} class="text-lg min-h-36 p-4 border-2"/>

      <!-- Question answer input space -->
      <h3 class="text-2xl font-bold">Správná odpověď</h3>
      <input bind:value={$questionDetailStore.answer} type="text" class="rounded-lg h-12 text-xl font-bold px-2 w-4/6 border-black border-2"/>

      <!-- Text link section -->
      {#if !$questionDetailStore.textAttached}
        <button on:click={() => linkTextButtonEvent()} class="h-12 text-2xl flex items-center w-fit px-2 py-2 rounded-lg border-4 border-black">
          Připojit text
        </button>
      {:else}
        {#if !highlighted}
          <button on:click={async () => highlightTextButtonEvent()} class="h-12 text-2xl flex items-center w-fit px-2 py-2 rounded-lg border-4 border-black">
            Zobrazit text
          </button>
        {:else}
          <button on:click={async () => unHighlightTextButtonEvent()} class="h-12 text-2xl flex items-center w-fit px-2 py-2 rounded-lg border-4 border-black">
            Zpět
          </button>
        {/if}
        <button on:click={async () => unLinkTextButtonEvent()} class="h-12 text-2xl flex items-center w-fit px-2 py-2 rounded-lg border-4 border-black">
          Odpojit text
        </button>
      {/if}
    </div>
  </div>
</div>
