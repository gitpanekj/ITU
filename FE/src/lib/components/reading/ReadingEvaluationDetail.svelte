<script>
  import { onMount } from "svelte";
  import { userView } from "../../../stores/Reading/userView";

    export let question = {id: 0, chosen: ""};
    let name = "";
    let question_text = "";
    let correct = "";
    let chosen = question.chosen;
    let textId = 0;

    onMount(async () => {
        const response = await fetch(`http://localhost:3000/reading-exercise/question/${question.id}`);
        const data = await response.json();
        question_text = data.question;
        correct = data.answer;
        textId = data.textId;
        name = data.name;
    });
    
</script>

<div class="flex flex-col h-full">
     <!-- Sub-navbar -->
  <div class="w-full pl-4 h-16 bg-slate-400 flex flex-row items-center gap-8">
    <button
      on:click={async () => {
        userView.goto_evaluation_list_view();
      }}
      class="border-2 border-blue-900 hover:bg-blue-900 hover:text-blue-200 py-2 px-4 rounded-full bg-blue-500"
    >
      Zpět
    </button>
  </div>



  <!-- question + result -->
  <div class="flex flex-col px-8 py-8">
    <!-- Question -->
    <div
      class="w-full border-4 border-black p-4 rounded-2xl flex flex-col gap-4"
    >
      <div class="flex flex-col gap-4 justify-start items-start">
        <div class="w-full flex justify-between">
          <h1 class="text-2xl font-bold text-center">Otázka: {name}</h1>
          <h1 class="w-32 border-2 bg-red-500 font-bold rounded-lg  text-center flex justify-center items-center">Hard</h1>
        </div>
      <br />

      <p>{question_text}</p>


        <h1 class="text-2xl font-bold text-center">
            Tvoje odpověd:
            {#if chosen === undefined}
                {correct}
            {:else}
                {chosen}
            {/if}
        </h1>

        <h1 class="text-2xl font-bold text-center">Správná odpověď: {correct}</h1>
      
    </div>

      
      <button
        class="h-12 text-2xl flex items-center w-fit px-2 py-2 rounded-lg border-4 border-black hover:bg-slate-400"
        >Zobrazit v textu</button
      >
    </div>
  </div>
</div>