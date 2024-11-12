<script>
  import { highlightLinkedText, loadEditorContents } from "../../../stores/Reading/EditorStore";
  import { studentQuestionPanelStore } from "../../../stores/Reading/StudentQuestionPanelStore";
  import { evaluationDetailStore } from "../../../stores/Reading/EvaluationDetailStore";
  export let readingId;

  const returnBackButtonEvent = async () => {
    try {
      await loadEditorContents(readingId);
    } catch(err) {alert('Failed to load the editor content.');}
    studentQuestionPanelStore.set_evaluation_view();
  };

  const highlightButtonEvent = async () => {
    try {
      highlightLinkedText(readingId, $evaluationDetailStore.questionId);
    } catch(err) {alert('Failed to highlight the text.');}
  };


</script>

<div class="flex flex-col h-full">

  <!-- Sub-navbar -->
  <div class="w-full px-8 h-16 bg-slate-300 flex flex-row items-center justify-between rounded-b-xl">
    <button on:click={async () => returnBackButtonEvent()} class="py-4 px-8 w-8 h-8 flex justify-center items-center border-2 border-slate-700 rounded bg-slate-100 hover:bg-slate-700 hover:text-slate-100">
      Zpět
    </button>
  </div>


  <!-- question + result -->
  <div class="flex flex-col px-8 py-8">
    <div class="w-full border-4 border-black p-4 rounded-2xl flex flex-col gap-4">


      <div class="flex flex-col w-full gap-4 justify-start items-start px-4">


        <div class="w-full flex justify-between">
          <div class="flex flex-row items-center gap-4"><h1 class="text-2xl font-bold text-center">Otázka:</h1><div class="text-xl">{$evaluationDetailStore.name}</div></div>
          <!-- Hard indicator -->
          {#if $evaluationDetailStore.hard}
            <h1 class="w-32 border-2 bg-red-500 font-bold rounded-lg text-center flex justify-center items-center">
              Hard
            </h1>
          {/if}
        </div>
        <br/>

        <p class="text-lg px-4 border-2 rounded-lg break-words w-full"><i>{$evaluationDetailStore.question_text}</i></p>

        <div class="flex flex-row items-center gap-4">
        <h1 class="text-2xl font-bold text-center">
          Tvoje odpověd:
        </h1>
        <div class="text-xl">
          {#if $evaluationDetailStore.chosen === undefined}
          {$evaluationDetailStore.correct}
        {:else}
          {$evaluationDetailStore.chosen}
        {/if}
        </div>
      </div>

      <div class="flex flex-row items-center gap-4">
        <h1 class="text-2xl font-bold text-center">
          Správná odpověď:
        </h1>
        <div class="text-xl">
          {$evaluationDetailStore.correct}
        </div>
        </div>
      </div>
      
      <button on:click={async () => highlightButtonEvent()} class="h-12 text-2xl flex items-center w-fit px-2 py-2 rounded-lg border-4 border-black hover:bg-slate-400 ml-4">
        Zobrazit v textu
      </button>

    </div>
  </div>

</div>
