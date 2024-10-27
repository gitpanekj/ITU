<script lang="ts">
  import { onMount } from "svelte";
  import { userView } from "../../../stores/Reading/userView";

  let questionId: number = 0;
  let name = "";
  let question = "";
  let textId: number | null = null;
  let questionNumber: number = 0;
  let totalQuestions: number = 0;
  let user_answer = "";

  let checked = false;
  let evaluation = "";
  let correct_answer = "";
  let marked_hard = false;
  
  const toggleHard = async (id: number) => {
    const response = await fetch(`http://localhost:3000/reading-exercise/mark_hard/${id}`,
        {
          method: "POST",
          headers: {
                'Content-Type': 'application/json', // Indicate that the payload is JSON
            },
            body: JSON.stringify({sessionId: localStorage.getItem('readingSessionId')}),
        }
      );
  };

  const checkQuestion = async () => {
    const response = await fetch(`http://localhost:3000/reading-exercise/evaluate_question`,
        {
          method: "POST",
          headers: {
                'Content-Type': 'application/json', // Indicate that the payload is JSON
            },
          body: JSON.stringify({questionId: questionId, answer: user_answer, sessionId: Number(localStorage.getItem('readingSessionId'))})
        }
      );
    const data = await response.json();
    evaluation = data.result;
    correct_answer = data.answer;
    

  };


  const getNextQuestion = async () => {
    const response = await fetch(
      `http://localhost:3000/reading-exercise/session/${localStorage.getItem("readingSessionId")}/next`
    );
    const {data, remaining} = await response.json();

    console.log(data.data[0].id, remaining);
    questionId = data.data[0].id;
    name = data.data[0].name;
    question = data.data[0].question;
    textId = data.data[0].textId;
    totalQuestions = data.total;
    questionNumber = totalQuestions - remaining;
    console.log(totalQuestions, questionNumber);
  };

  onMount(async () => {
    await getNextQuestion();
  });

</script>

<!-- question + result -->
<div class="flex flex-col px-8 py-8 gap-16">
  <!-- place for result -->
  <div
    class="flex flex-col px-8 gap-4 items-start border-4 rounded-2xl p-4 border-black h-[200px]"
  >
    {#if checked}

    <div class="flex flex-row gap-16 justify-between w-full">
    {#if evaluation==="correct"}
        <h1 class="font-bold text-4xl">Dobrá práce</h1>
    {:else}
      <div class="flex flex-col">
        <h1 class="font-bold text-4xl">Bohužel</h1>
        <p class="text-2xl">Správná odpově je: {correct_answer}</p>
      </div>
    {/if}
      <label class="text-xl font-bold text-center flex justify-center gap-4">Těžká
      <input
          type="checkbox"
          on:click={async () => {await toggleHard(questionId)}}
          class="w-8 h-8 cursor-pointer"/>
      </label>
    </div>
      

    {#if questionNumber < totalQuestions}
        <button
        on:click={async () => {checked=false; await getNextQuestion()}}
        class="border-4 border-black rounded-lg py-2 px-2 text-xl hover:bg-slate-400"
        >Další otázka</button
        >
    {:else}
        <button
            on:click={() => {userView.goto_evaluation_list_view()}}
        class="border-4 border-black rounded-lg py-2 px-2 text-xl hover:bg-slate-400"
        >Vyhodnotit kvíz</button> 
    {/if}
    {/if}
  </div>

  <!-- Question -->
  <div class="w-full border-4 border-black p-4 rounded-2xl flex flex-col gap-4">
    <h1 class="text-2xl font-bold">Odpověz na otázku: {name}</h1>
    <br />
    <p class="text-lg">
      {question}
    </p>

    <h3>Tvoje odpověď</h3>
    <input
      bind:value={user_answer}
      type="text"
      class="rounded-lg h-12 text-xl font-bold px-2 w-4/6 border-black border-2"
    />
    <div class="flex flex-row justify-between mt-8 px-8 pb-4">
      <button
        class="h-12 px-2 py-2 rounded-lg border-4 border-black hover:bg-slate-400"
        >Chci nápovědu</button
      >
      {#if !checked}
      <button
      on:click={() => {checkQuestion();checked=true;}}
        class="h-12 px-2 py-2 rounded-lg border-4 border-black hover:bg-slate-400"
        >Zkontrolovat</button
      >
      {/if}
    </div>
  </div>
  <p>Otázka {questionNumber}/{totalQuestions}</p>
</div>
