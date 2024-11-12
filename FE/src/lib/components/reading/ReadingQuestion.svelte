<script lang="ts">
  import { onMount } from "svelte";
  import { highlightLinkedText, loadEditorContents } from "../../../stores/Reading/EditorStore";
  import { studentQuestionPanelStore } from "../../../stores/Reading/StudentQuestionPanelStore";
  export let readingId;

  // Question Data
  let questionId: number = 0;
  let name = "";
  let question = "";
  let questionNumber: number = 0;
  let totalQuestions: number = 0;

  // Question Check Data
  let checked = false;
  let evaluation = "";
  let correct_answer = "";

  // User input
  let user_answer = "";


  const toggleHard = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/reading-exercise/mark_hard/${id}`,
        {
          method: "POST",
          headers: {
                'Content-Type': 'application/json', // Indicate that the payload is JSON
            },
            body: JSON.stringify({sessionId: localStorage.getItem('readingSessionId')}),
        }
      );
      if (!response.ok) {
        const err = await response.text();
        throw new HttpError(response.status, response.statusText, err);
      }
    } catch(err) {throw err;}
  };

  const checkQuestion = async () => {
    try {
      const response = await fetch(`http://localhost:3000/reading-exercise/evaluate_question`,
          {
            method: "POST",
            headers: {
                  'Content-Type': 'application/json', // Indicate that the payload is JSON
              },
            body: JSON.stringify({questionId: questionId, answer: user_answer ?? "Nezodpovězeno", sessionId: Number(localStorage.getItem('readingSessionId'))})
          }
        );
      if (!response.ok) {
        const err = await response.text();
        throw new HttpError(response.status, response.statusText, err);
      }
      const data = await response.json();
      evaluation = data.result;
      correct_answer = data.answer;
    } catch(err) {throw err;}
  };

  const getNextQuestion = async () => {
    try {
    const response = await fetch(
      `http://localhost:3000/reading-exercise/session/${localStorage.getItem("readingSessionId")}/next`
    );
    if (!response.ok) {
    const err = await response.text();
      throw new HttpError(response.status, response.statusText, err);
    }
   
    const {data, remaining} = await response.json();
   
    questionId = data.data[0].id;
    name = data.data[0].name;
    question = data.data[0].question;
    totalQuestions = data.total;
    questionNumber = totalQuestions - remaining;
    } catch (err) {throw err;}
  };

  onMount(async () => {
    try {
      await getNextQuestion();
    } catch(err) {alert('Failed to load next question.');}
  });

  // events
  const nextQuestionButtonEvent = async () =>
  {
    user_answer = "";
    checked=false;
    try {
      await loadEditorContents(readingId);
      await getNextQuestion();
    } catch(err) {alert('Failed to load next question.');}
  };

  const evaluateQuizButtonEvent = async () => {
    try {
      await loadEditorContents(readingId);
    } catch(err) {alert('Failed to evaluate the question.');}
    studentQuestionPanelStore.set_evaluation_view();
  };

  const getHintButtonEvent = async () => {
    try {
      highlightLinkedText(readingId, questionId);
    } catch(err) {alert('Failed to show hint.');}
  };

  const checkAnswerButtonEvent = async () => {
    try {
      await checkQuestion();
    } catch(err) {alert('Failed to check the question answer.');}
    checked=true;
  };

  const toggleHardEvent = async (questionId: number) => {
    try{
      toggleHard(questionId);
    } catch(err) {alert('Failed to toggle hard.');}
  };

</script>

<!-- question + result -->
<div class="flex flex-col px-8 py-8 gap-16">

  <!-- place for result -->
  <div class="flex flex-col px-8 gap-4 items-start rounded-2xl p-4  h-[200px]">
    {#if checked}
        <!-- If the question was checked, show the result data -->
        <div class="flex flex-row gap-16 justify-between w-full">
          {#if evaluation==="correct"}
              <h1 class="font-bold text-4xl">Dobrá práce</h1>
          {:else}
            <div class="flex flex-col">
              <h1 class="font-bold text-4xl">Bohužel</h1>
              <p class="text-2xl">Správná odpověď je: {correct_answer}</p>
            </div>
          {/if} <!-- End of evaluation == correct -->
        <div class="flex gap-4">
          <label class="text-xl font-bold text-center flex justify-center gap-4" for="hard">Těžká</label>
          <input type="checkbox" id="hard" name="hard" on:click={async () => toggleHardEvent(questionId)} class="w-8 h-8 cursor-pointer"/>
        </div>
        </div>

        <!-- NextQuestion or EvaluateQuiz based on quiz progress -->
        {#if questionNumber < totalQuestions} <!-- Next Question -->
            <button on:click={async () => nextQuestionButtonEvent()} class="border-4 border-black rounded-lg py-2 px-2 text-xl hover:bg-slate-400">
              Další otázka
            </button>
        {:else} <!-- Evaluate Quiz -->
            <button on:click={async () => evaluateQuizButtonEvent()} class="border-4 border-black rounded-lg py-2 px-2 text-xl hover:bg-slate-400">
              Vyhodnotit kvíz
            </button> 
        {/if} <!-- End of  NextQuestion or EvaluateQuiz -->
    {/if} <!-- End of question checked -->
  </div>

  <!-- Question -->
  <div class="w-full border-4 border-black pt-4 px-4 rounded-2xl flex flex-col gap-4">
    <!-- Question -->
     <div class="flex flex-row justify-between">
      <div class="flex flex-row gap-4 items-center"><h1 class="flex flex-row text-center text-2xl font-bold">Odpověz na otázku:</h1><div class="text-xl">{name}</div></div>
      <p class="w-fit px-4 rounded-2xl">Otázka {questionNumber}/{totalQuestions}</p>
    </div>

    <br />
    <p class="text-lg px-4 border-2 rounded-lg ml-4 break-words"><i>{question}</i></p>

    <!-- Input -->
     <div class="flex flex-col px-4">
      <h3>Tvoje odpověď</h3>
      <input bind:value={user_answer} type="text" class="pl-4 rounded-lg h-12 text-xl font-bold w-4/6 border-black border-2"/>
    </div>
    <!-- Hint and Check -->
    <div class="flex flex-row justify-between mt-8 px-4 pb-4">
      <button on:click={async () => getHintButtonEvent()} class="h-12 px-2 py-2 rounded-lg border-4 border-black hover:bg-slate-400">
        Chci nápovědu
      </button>

      <!-- if checked, hide the check button -->
      {#if !checked}
        <button on:click={async () => checkAnswerButtonEvent()} class="h-12 px-2 py-2 rounded-lg border-4 border-black hover:bg-slate-400">
          Zkontrolovat
        </button>
      {/if} <!-- End of checked -->
    </div>

  </div>


</div>
