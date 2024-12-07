<!-------------------------------------------------------------- 
Filename: FE/src/lib/components/reading/QuestionList.svelte
Author: Jan Pánek
Login: xpanek11
Last Modified: [06-12-2024]
Description: Question list view component
---------------------------------------------------------------->

<script lang="ts">
  import { onMount } from "svelte";
  import { teacherQuestionPanelStore } from "../../../stores/Reading/TeacherQuestionPanelStore";
  import { loadQuestionDetail } from "../../../stores/Reading/QuestionDetailStore";
  
  // props
  export let readingId: number;

  // UI state
  let questions: any = [];
  let page: number = 1;
  let totalRecords: number = 0;
  $: totalPages = Math.ceil(totalRecords / 12);
  let sortByNoCorrect: boolean = false;
  let sortByNoWrong: boolean = false;
  let sortByNoHard: boolean = false;
  
  // Data fetch
  const fetchQuestions = async () => {
    try{
      const response = await fetch(`http://localhost:3000/reading-exercise/question?exerciseId=${readingId}&page=${page}&limit=12`);

      if (!response.ok) {
        const err = await response.text();
        throw new HttpError(response.status, response.statusText, err);
      }
      const {data, total} = await response.json();
      totalRecords = total;
      questions = data;
    } catch (err) {throw err;}
  };

  const sortQuestions = async (by: string) => {
    if (by === "CORRECT" && sortByNoCorrect)
    {
      by = "ID";
      sortByNoCorrect = false;
    }
    else if (by === "WRONG" && sortByNoWrong)
    {
      by = "ID";
      sortByNoWrong = false;
    }
    else if (by === "HARD" && sortByNoHard)
    {
      by = "ID";
      sortByNoHard = false;
    }
    else {
      sortByNoCorrect = (by === "CORRECT");
      sortByNoWrong   = (by === "WRONG");
      sortByNoHard    = (by === "HARD");
    }

    try{
      const response = await fetch(`http://localhost:3000/reading-exercise/question?exerciseId=${readingId}&page=${page}&limit=12&order=${by}`);
      if (!response.ok) {
        console.log(response.text());
        const err = await response.text();
        throw new HttpError(response.status, response.statusText, err);
      }
      
      const {data, total} = await response.json();
      totalRecords = total;
      questions = data;
      console.log(questions);
    } catch (err) {throw err;}
  };

  const deleteQuestion = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/reading-exercise/question/${id}`,
        {
          method: "DELETE"
        }
      );
      if (!response.ok) {
        const err = await response.text();
        throw new HttpError(response.status, response.statusText, err);
      }
    }
    catch (err) {throw err;}
  }

  const addQuestion = async () => {
    try { 
    const response = await fetch(`http://localhost:3000/reading-exercise/question`,
      {
        method: "POST",
        headers: {
              'Content-Type': 'application/json', // Indicate that the payload is JSON
          },
        body: JSON.stringify({name: "Nová otázka", question: "Text otázky", answer: "Text odpovědi", exerciseId: readingId})
      }
    );
    if (!response.ok) {
      const err = await response.text();
      throw new HttpError(response.status, response.statusText, err);
    }
    } catch (err) {throw err;}
  }

  // events
  const deleteQuestionButtonEvent = async (questionId: number) => {
    try {
      await deleteQuestion(questionId);
     await fetchQuestions();
    } catch(err) {alert('Failed to delete the question.');}
  };

  const addQuestionButtonEvent = async () => {
    try {
      await addQuestion();
      await fetchQuestions();
    } catch(err) {alert('Failed to add the question.');}

  };

  const gotoQuestionDetailEvent = async (questionId: number) => {
    try {
      await  loadQuestionDetail(questionId);
    } catch(err) {alert('Failed to show the question.');}
    teacherQuestionPanelStore.set_detail_view()
  };

  const prevPageButtonEvent = async () => {
    try {
      if(page > 1){page-=1};
      fetchQuestions();
    } catch(err) {alert('Failed to load the questions.');}
  };

  const nextPageButtonEvent = async () => {
    try {
      if(page < totalPages){page+=1};
      fetchQuestions()
  } catch(err) {alert('Failed to load the questions.');}
  };

  // Mount
  onMount(async () => {
    
    try {
      await fetchQuestions();
    } catch(err) {alert('Failed to load the questions.');}
  });

</script>


<div class="h-full flex flex-col justify-between">
    <div>
      <!-- Sub-navbar -->
      <div class="w-full px-8 h-16 bg-slate-300 flex flex-row items-center justify-between rounded-br-xl">
        <div></div>
        <h1 class="font-bold text-3xl">Seznam otázek</h1>
        <button
          on:click={async () => addQuestionButtonEvent()}
          class="py-4 px-8 w-8 h-8 flex justify-center items-center border-2 border-slate-700 rounded bg-slate-100 hover:bg-slate-700 hover:text-slate-100">
          Přidat
        </button>
      </div>

      <!-- Table -->
      <div class="flex flex-col items-center pt-4">
        
        <!-- header -->
        <div class="w-11/12 h-12 px-4 flex justify-between items-center border-b-4 border-black mb-4">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div class="flex flex-row gap-8 items-center">
            <div class="text-2xl font-bold w-48 text-center">Jméno</div>
            <div class="text-lg w-24 text-center border-2 bg-green-400 font-bold rounded-lg cursor-pointer" on:click={async () => sortQuestions("CORRECT")}>Správně</div>
            <div class="text-lg w-24 text-center border-2 bg-red-400 font-bold rounded-lg   cursor-pointer"   on:click={async () => sortQuestions("WRONG")}>Špatně</div>
            <div class="text-lg w-24 text-center border-2 bg-blue-300 font-bold rounded-lg  cursor-pointer"  on:click={async () => sortQuestions("HARD")}>Těžký</div>
          </div>
        </div>
        
        <!-- Table body -->
        {#each questions as question (question.id)}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div on:click={async () => gotoQuestionDetailEvent(question.id)} class="w-11/12 h-12 px-4 border-b-2 border-slate-800 hover:bg-slate-200 flex justify-between items-center  cursor-pointer drop-shadow-lg">
            <div class="flex flex-row gap-8 items-center">
              <div class="text-2xl font-bold w-48 text-center">{question.name}</div>
              <div class="text-lg w-24 text-center">{question.noCorrect}</div>
              <div class="text-lg w-24 text-center">{question.noWrong}</div>
              <div class="text-lg w-24 text-center">{question.hardCount}</div>
            </div>
            <button on:click={async (event) => { event?.stopPropagation(); deleteQuestionButtonEvent(question.id)}} class="py-4 px-8 w-8 h-8 flex justify-center font-bold items-center border-2 border-slate-700 rounded-md bg-slate-100 hover:bg-red-700 hover:text-white">
              Smazat
            </button>
          </div>
        {/each}

      </div> <!-- End of Table -->
    </div>

    <!-- Prev / Next pages -->
    <div class="w-full h-12 flex gap-4 justify-center items-center border-b-4 border-slate-300">
      <!-- Prev -->
      <button on:click={async () => prevPageButtonEvent()}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 text-2xl hover:bg-slate-300 rounded-full">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
      </button>

      <h1>{page}/{totalPages}</h1>

      <!-- Next -->
      <button on:click={async () => nextPageButtonEvent()}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 text-2xl hover:bg-slate-300 rounded-full">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
      </button>
    </div>
</div>