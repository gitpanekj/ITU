<script lang="ts">
  import { onMount } from "svelte";
  import { studentQuestionPanelStore } from "../../../stores/Reading/StudentQuestionPanelStore";
  import { loadEvaluationDetail } from "../../../stores/Reading/EvaluationDetailStore";

    let correct_questions: any = [];
    let correct_q_page: number = 1;
    let correct_q_total: number = 0;
    $: correct_q_total_pages = Math.ceil(correct_q_total / 4);

    let wrong_questions: any = [];
    let wrong_q_page: number = 1;
    let wrong_q_total: number = 0;
    $: wrong_q_total_pages = Math.ceil(wrong_q_total / 4);
  

    const loadCorrectAnswers = async () => {
        try {
            const response = await fetch(`http://localhost:3000/reading-exercise/evaluate_session/${localStorage.getItem('readingSessionId')}?page=${correct_q_page}&limit=4&type=correct`);
            if (!response.ok) {
                const err = await response.text();
                throw new HttpError(response.status, response.statusText, err);
            }
            const data = await response.json();
            correct_questions = data.correct;
            correct_q_total = data.no_correct;
        } catch(err) {throw err;}

    };

    const loadWrongAnswers = async () => {
        try {
            const response = await fetch(`http://localhost:3000/reading-exercise/evaluate_session/${localStorage.getItem('readingSessionId')}?page=${wrong_q_page}&limit=4&type=wrong`);
            if (!response.ok) {
                const err = await response.text();
                throw new HttpError(response.status, response.statusText, err);
            }
            const data = await response.json();
            wrong_questions = data.wrong;
            wrong_q_total = data.no_wrong;
        } catch(err) {throw err;}

    };

    // Events
    const prevCorrectPageButtonEvent = async () => {
        try {
            if(correct_q_page > 1){correct_q_page-=1};
            loadCorrectAnswers();
        } catch(err) {alert('Failed to load the answers.');}
    };

    const nextCorrectPageButtonEvent = async () => {
        try {
            if(correct_q_page < correct_q_total_pages){correct_q_page+=1};
            loadCorrectAnswers();
        } catch(err) {alert('Failed to load the answers.');}
    };

    const prevWrongPageButtonEvent = async () => {
        try {
            if(wrong_q_page > 1){wrong_q_page-=1};
            loadWrongAnswers();
        } catch(err) {alert('Failed to load the answers.');}
    };

    const nextWrongPageButtonEvent = async () => {
        try {
            if(wrong_q_page < wrong_q_total_pages){wrong_q_page+=1};
            loadWrongAnswers();
        } catch(err) {alert('Failed to load the answers.');}
    };
  

    onMount(async () => {
        try {
            await loadCorrectAnswers();
            await loadWrongAnswers();
        } catch(err) {alert('Failed to load the answers.');}
    })

    const gotoQuestionDetailButtonEvent = async (questionId: number, chosen: string, hard:boolean) => {
        console.log(chosen);
        try {
            await loadEvaluationDetail(questionId, chosen, hard);
        } catch(err) {alert('Failed to show the detail.');}
        studentQuestionPanelStore.set_evaluation_detail_view();
    };



</script>

<div class='flex flex-col items-center border-2 border-black h-full pt-8 gap-8'>

    <div class="flex flex-col h-[45%] w-full p-8 gap-4">
        <h1 class="text-4xl font-bold">Špatné odpovědi</h1>
        <div class="flex flex-col overflow-y-auto h-full w-full gap-2 items-center">
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            {#each wrong_questions as q (q.id)}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div 
                    on:click={async () => gotoQuestionDetailButtonEvent(q.id, q.chosen, q.hard)}
                    class="w-full min-h-12 border-2 border-black rounded-ld flex gap-4 items-center p-2 cursor-pointer hover:bg-slate-200 rounded-">
                    <h1>{q.name}</h1>
                    {#if q.hard}
                    <h1 class="w-16 border-2 bg-red-500 font-bold rounded-lg  text-center flex justify-center items-center">Těžká</h1>
                    {/if}
                </div>
            {/each}
        </div>
        <div class="w-full h-12 flex gap-4 justify-center items-center border-b-4 border-slate-300">
            <button on:click={async () => prevWrongPageButtonEvent()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 text-2xl hover:bg-slate-300 rounded-full">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
            </button>
            <h1>{wrong_q_page}/{wrong_q_total_pages}</h1>
            <button on:click={async () => nextWrongPageButtonEvent()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 text-2xl hover:bg-slate-300 rounded-full">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
            </button>
        </div>
    </div>

    <div class="flex flex-col h-[45%] w-full p-8 gap-4">
        <h1 class="text-4xl font-bold">Správné odpovědi</h1>
        <div class="flex flex-col overflow-y-auto h-full w-full gap-2">
            {#each correct_questions as q (q.id)}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div 
                    on:click={async () => gotoQuestionDetailButtonEvent(q.id, q.chosen, q.hard)}   
                    class="w-full min-h-12 border-2 border-black rounded-ld flex gap-2 items-center p-2 cursor-pointer hover:bg-slate-200">
                    <h1>{q.name}</h1>
                    {#if q.hard}
                    <h1 class="w-16 border-2 bg-red-500 font-bold rounded-lg  text-center flex justify-center items-center">Těžká</h1>
                    {/if}
                </div>
            {/each}
        </div>
        <div class="w-full h-12 flex gap-4 justify-center items-center border-b-4 border-slate-300">
            <button on:click={async () => prevCorrectPageButtonEvent()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 text-2xl hover:bg-slate-300 rounded-full">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
            </button>
            <h1>{correct_q_page}/{correct_q_total_pages}</h1>
            <button on:click={async () => nextCorrectPageButtonEvent()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 text-2xl hover:bg-slate-300 rounded-full">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
            </button>
        </div>
    </div>

</div>