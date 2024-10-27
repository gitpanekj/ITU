<script lang="ts">
  import { onMount } from "svelte";
  import { teacherView } from "../../../stores/Reading/teacherView";
    
    export let readingId: number;

    let questions: any = [];
    let page: number = 1;
    let totalRecords: number = 0;
    $: totalPages = Math.ceil(totalRecords / 15);
    


    
    const fetchQuestions = async () => {
      const response = await fetch(`http://localhost:3000/reading-exercise/question?exerciseId=${readingId}&page=${page}&limit=15`);
      const {data, total} = await response.json();
      totalRecords = total;
      questions = data;
    };

    const deleteQuestion = async (id: number) => {
      const response = await fetch(`http://localhost:3000/reading-exercise/question/${id}`,
        {
          method: "DELETE"
        }
      );

      await fetchQuestions();
    }

    const addQuestion = async () => {
      const response = await fetch(`http://localhost:3000/reading-exercise/question`,
        {
          method: "POST",
          headers: {
                'Content-Type': 'application/json', // Indicate that the payload is JSON
            },
          body: JSON.stringify({name: "Nová otázka", question: "Text otázky", answer: "Text odpovědi", exerciseId: readingId})
        }
      );

      await fetchQuestions();
    }


    onMount(async () => {
      await fetchQuestions();
    });

</script>


<div class="h-full flex flex-col justify-between">
    <div>
      <!-- Sub-navbar -->
      <div class="w-full pl-4 h-16 bg-slate-400 flex flex-row items-center gap-8">
        <h1 class="font-bold text-xl">Questions</h1>
        <button
          on:click={() => {addQuestion();}}
          class="border-2 border-blue-900 hover:bg-blue-900 hover:text-blue-200 py-2 px-4 rounded-full bg-blue-500">
          Add
        </button>
      </div>

     <!-- Questions -->
      <div class="flex flex-col items-center pt-4 gap-2">
        
        <!-- header -->
        <div class="w-11/12 h-12 px-4 flex justify-between items-center">
          <div class="flex flex-row gap-8 items-center">
            <div class="text-2xl font-bold w-48 text-center">Jméno</div>
            <div class="text-lg w-24 text-center ">Správně</div>
            <div class="text-lg w-24 text-center ">Špatně</div>
            <div class="text-lg w-24 text-center ">Těžký</div>
          </div>
        </div>
        
        {#each questions as question (question.id)}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div
            on:click={() => teacherView.goto_detail(question.id)}
            class="w-11/12 h-12 px-4 border-4 border-black flex justify-between items-center rounded-lg cursor-pointer"
          >
            <div class="flex flex-row gap-8 items-center">
              <div class="text-2xl font-bold w-48 text-center">{question.name}</div>
              <div class="text-lg w-24 text-center">{question.noCorrect}</div>
              <div class="text-lg w-24 text-center">{question.noWrong}</div>
              <div class="text-lg w-24 text-center">{question.hardCount}</div>
            </div>
            <button
              on:click={(event) => {deleteQuestion(question.id); event?.stopPropagation()}}
              class="border-2 border-blue-900 hover:bg-red-900 hover:text-red-200 py-1 px-2 rounded-full bg-red-500"
            >
              Delete
            </button>
          </div>
        {/each}
      </div>
    </div>

    <!-- Next -->
    <div class="w-full border-black border-4 h-12 flex gap-4 justify-center items-center">
      <button on:click={() => {if(page > 1){page-=1}; fetchQuestions()}}>Prev</button>
      <h1>{page}/{totalPages}</h1>
      <button on:click={() => {if(page < totalPages){page+=1}; fetchQuestions()}}>Next</button>
    </div>
</div>