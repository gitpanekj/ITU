<script lang="ts">
    import Progressbar from "$lib/components/Progressbar.svelte";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
  
    let questionId: number = 0;
    let frontFace = "";
    let backFace = "";
    let currentIndex: number = 0;
    let totalQuestions: number = 0;
    let isFlipped = false;
    let isHard = false;
    let cardFeedback = "";

    function flipCard() {
        isFlipped = !isFlipped;
    }
  
    const getNextQuestion = async () => {
      const response = await fetch(
        `http://localhost:3000/flashcard-exercise/session/${localStorage.getItem("flashcardSessionId")}/next`
      );
      const {flashcard, hard, current, total, feedback} = await response.json();
      questionId = flashcard.id;
      frontFace = flashcard.frontFace;
      backFace = flashcard.backFace;
      isHard = hard;
      currentIndex = current;
      totalQuestions = total;
      isFlipped = false;
      cardFeedback = feedback;
    };

    const getPrevQuestion = async () => {
      const response = await fetch(
        `http://localhost:3000/flashcard-exercise/session/${localStorage.getItem("flashcardSessionId")}/prev`
      );
      const {flashcard, hard, current, total, feedback} = await response.json();
      questionId = flashcard.id;
      frontFace = flashcard.frontFace;
      backFace = flashcard.backFace;
      isHard = hard;
      currentIndex = current;
      totalQuestions = total;
      isFlipped = false;
      cardFeedback = feedback;
    };

    const toggleHard = async () => {
    try {
        const response = await fetch(`http://localhost:3000/flashcard-exercise/mark_hard`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sessionId: Number(localStorage.getItem("flashcardSessionId")),
                flashcardId: questionId 
            })
        });
    } catch (error) {
        console.error("Error:", error);
    }
  };

  async function submitFeedback() {
    try {
    const response = await fetch('http://localhost:3000/flashcard-exercise/feedback', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        flashcardId: questionId,
        sessionId: Number(localStorage.getItem("flashcardSessionId")),
        feedback: cardFeedback,
      }),
    });
    } catch (error) {
        console.error("Error:", error);
    }
  }

  
    onMount(async () => {
      await getNextQuestion();
    });
  
  </script>

<!-- Card Section -->
<button 
    type="button" 
    on:click={flipCard} 
    class="w-4/5 h-4/5 mt-8 border-2 border-black hover:bg-background flex flex-col justify-between items-center cursor-pointer relative mx-auto my-auto p-5 rounded-xl"
>
    <div class="flex-grow flex flex-col items-center">
        <p class="text-2xl font-bold">
          {frontFace}
        </p>
        <hr class="w-full border-t-2 border-gray-500 my-2">
        <p class={`text-xl ${isFlipped ? 'opacity-100' : 'opacity-0'}`}>
          {backFace}
        </p>
    </div>
    <p class="text-xl font-semibold mt-auto">
      {isFlipped ? "Skrýt odpověď" : "Zobrazit odpověď"}
    </p>
</button>

<!-- Feedback Section -->
<div class="flex flex-row items-center gap-2 w-4/5 mx-auto mt-4">
  <textarea
    class="w-full border-2 p-2 rounded-lg focus:outline-none focus:border-blue-500"
    placeholder="Můžete zadat poznámku ke kartě..."
    bind:value={cardFeedback}
  ></textarea>
  <button
    class="text-white bg-blue-500 p-2 rounded-lg hover:bg-blue-600"
    on:click={() => submitFeedback()}
  >
    Odeslat
  </button>
</div>

<!-- Buttons Section -->
<div class="flex justify-center space-x-4 mt-4">
  <!-- Prev button -->
  <button
    on:click={async () => {await getPrevQuestion()}}
    class={`text-white bg-blue-500 p-2 rounded-lg hover:bg-blue-600 ${currentIndex != 1 ? 'opacity-100' : 'opacity-0'}`}
    disabled={currentIndex == 1}
  >
  Předchozí karta
  </button>
  <!-- Hard checkbox --> 
  <label class="text-xl font-bold text-center flex justify-center gap-4">Těžká
    <input
        type="checkbox"
        bind:checked={isHard}
        on:click={async () => {await toggleHard()}}
        class="w-8 h-8 cursor-pointer"/>
    </label>
    <!-- Next/Back to beginning button -->
    <button
      on:click={async () => {await getNextQuestion()}}
      class="text-white bg-blue-500 p-2 rounded-lg hover:bg-blue-600"
    >
      {currentIndex < totalQuestions?"Další karta":"Zpět na začátek"}
    </button>
    <!-- Evaluate button -->
    <button
      on:click={async () => {await goto(`/module/1/flashcards/results`)}}
      class="border-2 border-blue-500 text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600"
    >
      Vyhodnotit flashcards
    </button>
 
</div>

<!-- ProgressBar Section -->
<Progressbar {currentIndex} {totalQuestions} />