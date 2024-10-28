<script lang="ts">
  import { onMount } from "svelte";
  import { teacherView } from "../../../stores/Reading/teacherView";
  import { text } from "@sveltejs/kit";
  export let readingId;

  let name = "";
  let question = "";
  let answer = "";
  let textAttached = false;
  let highlighted = false;

  onMount(async () => {
    const response = await fetch(
      `http://localhost:3000/reading-exercise/question/${$teacherView.questionId}`
    );
    const data = await response.json();
    teacherView.load_question(data.name, data.question, data.answer, data.textAttached);
    name = data.name;
    question = data.question;
    answer = data.answer;
    textAttached = data.textAttached;
  });


  const unattachText = async () => {
    const response = await fetch(
      `http://localhost:3000/reading-exercise/text/highlight/${readingId}/${$teacherView.questionId}`,
      {
        method: "DELETE"
      }
    );
    const data = await response.text();
    $teacherView.editor?.commands.setContent(data);
  }

  const highlightText = async () => {
    const response = await fetch(
      `http://localhost:3000/reading-exercise/text/highlight/${readingId}/${$teacherView.questionId}`
    );
    const data = await response.text();

    console.log(data);

    $teacherView.editor?.commands.setContent(data);
  }

  const loadText = async () => {
    const response = await fetch(
      `http://localhost:3000/reading-exercise/text/${readingId}`
    );
    const data = await response.text();
    console.log(data);

    $teacherView.editor?.commands.setContent(data);
  }

  const saveQuestion = async () => {
    const response = await fetch(
      `http://localhost:3000/reading-exercise/question/${$teacherView.questionId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // Indicate that the payload is JSON
        },
        body: JSON.stringify({
          name: name,
          question: question,
          answer: answer,
          textAttached: $teacherView.textAttached,
        }),
      }
    );
    const data = await response.json();
  };
</script>

<div class="h-full overlay {$teacherView.editting ? 'overlay-dark' : ''}">
  <!-- Sub-navbar -->
  <div class="w-full pl-4 h-16 bg-slate-400 flex flex-row items-center gap-8">
    <button
      on:click={async () => {
        await saveQuestion();
        teacherView.goto_list_view();
      }}
      class="border-2 border-blue-900 hover:bg-blue-900 hover:text-blue-200 py-2 px-4 rounded-full bg-blue-500"
    >
      Uložit a vrátit zpět
    </button>
  </div>
  <!-- question + result -->
  <div class="flex flex-col px-8 py-8">
    <!-- Question -->
    <div
      class="w-full border-4 border-black p-4 rounded-2xl flex flex-col gap-4"
    >
      <div class="flex gap-4 justify-start items-center">
        <h1 class="text-2xl font-bold text-center">Odpověď na otázku</h1>
        <input
          bind:value={name}
          disabled={$teacherView.editting}
          type="text"
          class="rounded-lg h-12 text-xl font-bold px-2 w-4/6 border-black border-2 {$teacherView.editting
            ? ' overlay'
            : ''}"
        />
      </div>
      <br />

      <textarea
        bind:value={question}
        disabled={$teacherView.editting}
        class="text-lg min-h-36 p-4 {$teacherView.editting ? ' overlay' : ''}"
      ></textarea>

      <h3>Tvoje odpověď</h3>
      <input
        bind:value={answer}
        disabled={$teacherView.editting}
        type="text"
        class="rounded-lg h-12 text-xl font-bold px-2 w-4/6 border-black border-2 {$teacherView.editting
          ? 'overlay'
          : ''}"
      />

      {#if ! $teacherView.textAttached}
        <button
          disabled={$teacherView.editting}
          on:click={() => {
            teacherView.edit_mode();
          }}
          class="h-12 text-2xl flex items-center w-fit px-2 py-2 rounded-lg border-4 border-black {$teacherView.editting
            ? ''
            : 'hover:bg-slate-400'}">Připojit text</button
        >
      {:else}
          
        {#if !highlighted}
        <button
          disabled={$teacherView.editting}
          on:click={async () => {
            await highlightText();
            highlighted = !highlighted;
          }}
          class="h-12 text-2xl flex items-center w-fit px-2 py-2 rounded-lg border-4 border-black {$teacherView.editting
            ? ''
            : 'hover:bg-slate-400'}">Zobrazit text</button
        >
        {:else}
        <button
          disabled={$teacherView.editting}
          on:click={async () => {
            await loadText();
            highlighted = !highlighted;
          }}
          class="h-12 text-2xl flex items-center w-fit px-2 py-2 rounded-lg border-4 border-black {$teacherView.editting
            ? ''
            : 'hover:bg-slate-400'}">Zpět</button
        >
        {/if}

        <button
          disabled={$teacherView.editting}
          on:click={async () => {
            await unattachText();
            teacherView.attach_text(false);
          }}
          class="h-12 text-2xl flex items-center w-fit px-2 py-2 rounded-lg border-4 border-black {$teacherView.editting
            ? ''
            : 'hover:bg-slate-400'}">Odpojit text</button
        >
        
      {/if}
    </div>
  </div>
</div>

<style>
  .overlay {
    background-color: rgba(0, 0, 0, 0); /* Transparent by default */
    transition: background-color 0.3s ease;
  }

  .overlay-dark {
    background-color: rgba(0, 0, 0, 0.5); /* Dark overlay effect */
  }
</style>
