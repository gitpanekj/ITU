<!-------------------------------------------------------------- 
Filename: FlashcardQuestion.svelte
Author: Lucie Klímová
Login: xklimo04
Last Modified: [06-12-2024]
Description: Component defining one exercise card (question)
with its functions including card toggle and feedback submittion
---------------------------------------------------------------->
<script lang="ts">
    import Progressbar from "$lib/components/Progressbar.svelte";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
  
    // Flashcard variables
    export let moduleId;

    let questionId: number = 0;
    let frontFace = "";
    let backFace = "";
    let currentIndex: number = 0;
    let totalQuestions: number = 0;
    let isFlipped = false;
    let isHard = false;
    let cardFeedback = "";

    let flashMessage: string | null = null;
    
    // Function to flip the card
    function flipCard() {
        isFlipped = !isFlipped;
    }
  
    // Function to get the next question (card)
    // The next card is determined using current session id
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

    // Function to get the previous question (card)
    // The previous card is determined using current session id
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

    // Function to un/mark the question (card) as hard
    const toggleHard = async () => {
    try {
        const response = await fetch(`http://localhost:3000/flashcard-exercise/mark_hard`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // Passing session id and flashcard id to be un/marked
            body: JSON.stringify({
                sessionId: Number(localStorage.getItem("flashcardSessionId")),
                flashcardId: questionId 
            })
        });
    } catch (error) {
        console.error("Error:", error);
    }
  };

  // Function to submit feedback
  async function submitFeedback() {
    try {
    const response = await fetch('http://localhost:3000/flashcard-exercise/feedback', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Passing a question (flashcard id), sessionId and feedback
      body: JSON.stringify({
        flashcardId: questionId,
        sessionId: Number(localStorage.getItem("flashcardSessionId")),
        feedback: cardFeedback,
      }),
    });
    // Show that feedback was/n't submitted, add timeout to flashmessage
    if (response.ok) {
        flashMessage = "Poznámka byla uložena.";
        setTimeout(() => { flashMessage = null; }, 3000);
      } else {
        flashMessage = "Chyba při odesílání poznámky.";
        setTimeout(() => { flashMessage = null; }, 3000);
      }
    } catch (error) {
      flashMessage = "Chyba při odesílání poznámky.";
      setTimeout(() => { flashMessage = null; }, 3000);
    }
  }

  // Fetch the first question on mount
  onMount(async () => {
    await getNextQuestion();
  });
  
</script>
<!-- Flash Message -->
  <div class="mx-auto mt-2 px-4 py-2 bg-green-500 text-white rounded-lg"
  style="opacity: {flashMessage ? 1 : 0};">
    {flashMessage}
  </div>
<!-- Card Section -->
<button 
    type="button" 
    on:click={flipCard} 
    class="w-4/5 h-4/5 mt-3 border-2 border-black hover:bg-background flex flex-col justify-between items-center cursor-pointer relative mx-auto my-auto p-5 rounded-xl"
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
      on:click={async () => {await goto(`/module/${moduleId}/flashcards/results`)}}
      class="border-2 border-blue-500 text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600"
    >
      Vyhodnotit flashcards
    </button>
 
</div>

<!-- ProgressBar Section -->
<Progressbar {currentIndex} {totalQuestions} />