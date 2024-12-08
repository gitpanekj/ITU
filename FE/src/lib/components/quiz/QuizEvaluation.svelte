<!-------------------------------------------------------------- 
Filename: FE/src/lib/components/quiz/QuizEvaluation.svelte
Author: Jiří Kantor
Login: xkanto16
Last Modified: [08-12-2024]
Description: Component for view of the evaluated quiz
---------------------------------------------------------------->

<script lang="ts">
    // library import
    import { onMount } from "svelte";
    import { userView } from "../../../stores/Quiz/userView";
    
    // helper UI vars
    let wrongQuestions: any = [];
    let correctQuestions: any = [];
    let noCorrect: number = 0;
    let noWrong: number = 0;

    // vars for details of question
    let correctAnswerId: number | null = null;
    let answers: any = [];
    let questionText = "";
    let questionDetail: any;
    let chosen: number | null = null;

    // flags for hiding items
    let showDetail: boolean = false;
    

    // load question by id
    const loadQuestion = async (id: number) => {
        const response = await fetch(`http://localhost:3000/quiz-exercise/question/${id}`);
        const data = await response.json();
        questionText = data.question;
        correctAnswerId = data.rightAnswerId;


    };

    // load question answers by question id
    const loadQuestionAnswers = async (id: number) => {
        const response = await fetch(`http://localhost:3000/quiz-exercise/answer?questionId=${id}`);
        const {data, total} = await response.json();
        answers = data;
    };

    // session evaluation
    onMount(async () => {
        const response = await fetch(`http://localhost:3000/quiz-exercise/evaluate_session/${localStorage.getItem('quizSessionId')}`,
            {
                method: "POST",
                headers: {
                        'Content-Type': 'application/json'
                }
            }
        );
        const data = await response.json();
        wrongQuestions = data.wrong;
        correctQuestions = data.correct;
        noCorrect = data.no_correct;
        noWrong = data.no_wrong;
    });



</script>

<!-- two-column page with questions left - correct ones, right - wrong ones -->
<div class="flex flex-col v-screen h-1/8 p-8 border-a border-black border-0">
    <div class="text-4xl mb-4">Vyhodnocení</div>

</div>
<div class="flex h-screen">

    <!-- Left column: Correct questions -->
    <div class="w-1/2 h-full p-8 border-a border-black border-0 justify-between">
        <h1 class="text-3xl mb-4 inline-flex">
            Správné otázky &nbsp - &nbsp <div class="text-green-600"> {noCorrect}</div>

        </h1>
        <hr class="h-1 mt-4 bg-blue-950 border-0 dark:bg-blue-950 w-11/12 overflow-y-auto">

        <!-- question list -->
        <div class="flex flex-col mt-0 pt-4 gap-2 overflow-y-auto max-h-full" style="min-height: 80vh;">
            {#each correctQuestions as correctQuestion}
                <!-- on question click shows question detailed evaluation -->
                <button 
                    class={`w-11/12 h-14 px-4 border-4 border-blue-950 flex justify-between items-center rounded-lg cursor-pointer hover:bg-gray-300 hover:border-blue-200`}
                    on:click={ async () => { 
                        showDetail = true;
                        chosen = null;
                        questionDetail = correctQuestion;
                        await loadQuestion(correctQuestion.id);
                        await loadQuestionAnswers(correctQuestion.id);
                        }}>
                    <div class="text-2xl w-96 text-start">{correctQuestion.name}</div>


                    <button class="border-2 bg-blue-950 text-white hover:bg-blue-600 rounded-full px-2 py-1">Detail</button>

                    </button>
            {/each}
        </div>
    </div>

    <!-- Right column: Wrong questions -->
    <div class="w-1/2 h-full border-0 border-black border-a p-8">
        <h1 class="text-3xl mb-4 inline-flex">
            Špatné otázky &nbsp - &nbsp <div class="text-red-600"> {noWrong}</div>

        </h1>
        <hr class="h-1 mt-4 bg-blue-950 border-0 dark:bg-blue-950 w-11/12 overflow-y-auto">

        <!-- question list -->
        <div class="flex flex-col mt-0 pt-4 gap-2 overflow-y-auto max-h-full" style="max-height: 80vh;">
            {#each wrongQuestions as wrongQuestion}
                <!-- on question click shows question detailed evaluation -->
                <button class={`w-11/12 h-14 px-4 border-4 border-blue-950 flex justify-between items-center rounded-lg cursor-pointer hover:bg-gray-300 hover:border-blue-200`}
                        on:click={ async () => {
                            showDetail = true;
                            chosen = wrongQuestion.chosen;
                            questionDetail = wrongQuestion;
                            await loadQuestion(wrongQuestion.id);
                            await loadQuestionAnswers(wrongQuestion.id);
                            }}>
                    <div class="text-2xl w-96 text-start">{wrongQuestion.name}</div>

                    <!-- show detail button -->
                    <button class="border-2 bg-blue-950 text-white hover:bg-blue-600 rounded-full px-2 py-1">Detail</button>
                </button>
            {/each}
        </div>
    </div>

</div>

<!-- question detail -->
{#if showDetail}
    <!-- darkened background -->
    <div 
        role="button"
        tabindex="0"
        on:click={() => {
            showDetail = false;
            chosen = null;
        }}
        on:keydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                showDetail = false;
                chosen = null;
            }
        }}
        class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >

        <!-- detail window - propagation of the of-lick detail close is stopped-->
        <div
            class="h-2/3 w-1/2 bg-blue-950 shadow-lg shadow-blue-900/50 text-white text-4xl rounded-xl p-8 max-w-2xl relative"
            role="button"
            tabindex="0"
            on:click|stopPropagation ={() => {
                showDetail = true;
            }}
            on:keydown={(e) => {
                showDetail = true;
            }}
        >
            <h2 class="text-3xl mb-4">{questionDetail.name}</h2>
            <div class="mt-10 h-1/4 rounded-xl border-4 text-white border-neutral-400 text-2xl p-2">{questionText}</div>
            
            <!-- question answers -->
            <div class="text-2xl mt-12 space-y-6 text-black w-full overflow-y-auto max-h-full">
                {#each answers as answer}
                    
                    <!-- answer correct/wrong/chosen/other colors -->
                    <button  
                        class={`border-1 border-color-zinc-400 flex rounded-xl w-full h-auto cursor-pointer 
                        ${correctAnswerId === answer.id 
                            ? 'bg-neutral-300 text-black border-8 border-green-600' 
                            : chosen === answer.id 
                            ? 'bg-neutral-300 text-black border-8 border-red-600'
                            : 'bg-neutral-300 border-4'}`}>
                        <div class="m-2 ml-6 text-justify bg-inherit w-full h-full">{answer.answer}</div>      
                    </button>                
                {/each}
            </div>

            <!-- close button -->
            <button on:click={() => {
                showDetail = false;
                chosen = null;
                }}
                class="absolute top-4 right-4 border-2 bg-white text-blue-900 hover:bg-gray-400 rounded-full px-2 py-1">Zavřít</button>
        </div>
    </div>
{/if}
  