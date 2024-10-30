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

    function flipCard() {
        isFlipped = !isFlipped;
    }
  
    const getNextQuestion = async () => {
      const response = await fetch(
        `http://localhost:3000/flashcard-exercise/session/${localStorage.getItem("flashcardSessionId")}/next`
      );
      const {flashcard, hard, current, total} = await response.json();
      questionId = flashcard.id;
      frontFace = flashcard.frontFace;
      backFace = flashcard.backFace;
      isHard = hard;
      currentIndex = current;
      totalQuestions = total;
      isFlipped = false;
    };

    const getPrevQuestion = async () => {
      const response = await fetch(
        `http://localhost:3000/flashcard-exercise/session/${localStorage.getItem("flashcardSessionId")}/prev`
      );
      const {flashcard, hard, current, total} = await response.json();
      questionId = flashcard.id;
      frontFace = flashcard.frontFace;
      backFace = flashcard.backFace;
      isHard = hard;
      currentIndex = current;
      totalQuestions = total;
      isFlipped = false;
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

  
    onMount(async () => {
      await getNextQuestion();
    });
  
  </script>

<button 
    type="button" 
    on:click={flipCard} 
    class="w-4/5 h-4/5 mt-8 border-2 border-black flex flex-col justify-between items-center cursor-pointer relative mx-auto my-auto p-5 rounded-xl"
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


<div class="flex justify-center space-x-4 mt-4">
  <button
    on:click={async () => {await getPrevQuestion()}}
    class="border-2 border-black py-2 px-4 rounded-lg hover:bg-gray-200"
  >
    Předchozí karta
  </button>
    
  <label class="text-xl font-bold text-center flex justify-center gap-4">Těžká
    <input
        type="checkbox"
        bind:checked={isHard}
        on:click={async () => {await toggleHard()}}
        class="w-8 h-8 cursor-pointer"/>
    </label>
  {#if currentIndex < totalQuestions}
    <button
      on:click={async () => {await getNextQuestion()}}
      class="border-2 border-black py-2 px-4 rounded-lg hover:bg-gray-200"
    >
      Další karta
    </button>
  {:else}
    <button
      on:click={async () => {await goto(`/module/1/flashcards/results`)}}
      class="border-2 border-black py-2 px-4 rounded-lg hover:bg-gray-200"
    >
      Vyhodnotit flashcards
    </button>
  {/if}
</div>
<Progressbar {currentIndex} {totalQuestions} />