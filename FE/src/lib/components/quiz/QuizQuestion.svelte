<script lang="ts">
    import { onMount } from "svelte";
    import { userView } from "../../../stores/Quiz/userView";

    export let quizId;

    let question = "";
    let name = "";
    let questionId: number = 0;
    let selectedAnswerId: number | null = null;
    let correctAnswerId: number = 0;
    let totalQuestions: number = 0;
    let currentQuestion: number = 1;
    let remainingQuestions: number = 0;
    let answers: any = [];
    let questionEvaluated: boolean = false;
    let questionEvaluationRes = "";
    let hard: boolean = false;

   // Reactive statement to calculate progress percentage based on current and total questions
   $: progressPercentage = totalQuestions > 0 ? ((currentQuestion -1) / totalQuestions) * 100 : 0;

    const evaluateQuestion = async () => {
        const response = await fetch(`http://localhost:3000/quiz-exercise/evaluate_question`,
            {
            method: "POST",
            headers: {
                    'Content-Type': 'application/json',
                },
            body: JSON.stringify({questionId: questionId, answerId: selectedAnswerId, sessionId: Number(localStorage.getItem('quizSessionId'))})
            }
        );
        const data = await response.json();
        questionEvaluationRes = data.result;
        questionEvaluated = true; 

        currentQuestion++;
    };

    const markAsHard = async (id: number) => {
        if(hard){
            const response = await fetch(`http://localhost:3000/quiz-exercise/mark_hard/${id}`,
                {
                method: "POST",
                headers: {
                        'Content-Type': 'application/json', 
                    }
                }
            );
        }
    };

    const getNextQuestion = async () => {
        const response = await fetch(
            `http://localhost:3000/quiz-exercise/session/${localStorage.getItem("quizSessionId")}/next`
        );
        
        const {data, remaining} = await response.json();
        name = data.question.name;
        question = data.question.question;
        questionId = data.question.id;
        correctAnswerId = data.question.rightAnswerId;
        
        remainingQuestions = remaining;
        
        totalQuestions = remainingQuestions + currentQuestion;
        
        answers = data.answers;
        console.log("log: akt.ot.: ", currentQuestion, "zbývá: ", remaining, "akt.Id: ", questionId, "korektId: ", correctAnswerId);
    };



    onMount(async () => {
        await getNextQuestion();
    });

</script>
{@debug answers}
{@debug question}

<!-- Progress Bar Container -->
<div class="w-1/2 mx-auto h-8 bg-black border-4 border-black rounded-full overflow-hidden mt-4">
    <!-- Progress Bar -->
    <div 
        class="flex items-center h-full bg-green-500 text-s font-medium text-center text-white  leading-none transition-all duration-300 ease-in-out"
        style="width: {progressPercentage}%;"
    >
        <span class="mx-auto">{progressPercentage.toFixed(0)}%</span>
    </div>
</div>

<div class="flex flex-col mx-auto bg-blue-950 rounded-xl shadow-lg border-2 border-black p-6 text-white h-3/4 w-1/2 my-auto relative">
    <div class=" text-4xl bg-inherit w-full" >{name}</div>
  
    <hr class="h-0.5 mt-4 bg-blue-950 border-0 dark:bg-white w-full">
    <div class="mt-6 h-1/4 p-2 border-2 border-neutral-400 rounded-xl text-white text-3xl">{question}</div>
  
    <!-- question answers  -->
    <div class="text-2xl mt-8 space-y-6 text-black w-full overflow-y-auto max-h-full"> <!-- scrollable enabled-->
        {#each answers as answer}
            
            {#if !questionEvaluated}
                <button on:click={() => selectedAnswerId = answer.id} 
                    class={`border-1 border-color-zinc-400 flex rounded-xl w-full h-auto cursor-pointer border-4 
                    ${selectedAnswerId == answer.id
                        ? 'bg-blue-500 text-white border-blue-300'
                        : 'bg-neutral-300 hover:bg-neutral-400'}`}>
                    <div class="m-2 ml-6 text-justify bg-inherit w-full h-full">{answer.answer}</div>      
                </button>
            {:else}   
                <button  
                    class={`border-1 border-color-zinc-400 flex rounded-xl w-full h-auto cursor-pointer border-4 
                    ${correctAnswerId === answer.id 
                        ? 'bg-green-500 text-black border-white-300' 
                        : selectedAnswerId === answer.id && questionEvaluationRes === "incorrect"
                        ? 'bg-red-500 text-black border-white-300' 
                        : 'bg-neutral-300'}`}>
                    <div class="m-2 ml-6 text-justify bg-inherit w-full h-full">{answer.answer}</div>      
                </button>
                
            {/if}
        

        {/each}
    </div>
  
    <!-- Buttons -->
    <div class="flex justify-between absolute bottom-6 left-0 right-0 px-6">
      {#if !questionEvaluated}
        {#if selectedAnswerId !== null}
            <button on:click={async () => {await evaluateQuestion();}}  class="h-auto border-2 border-black bg-zinc-400 rounded-xl text-white text-2xl px-6 py-2 hover:bg-zinc-300 hover:text-black">
                Zkontrolovat
            </button>
        {/if}
        
        
    {:else}
        <button on:click={async () => { hard = !hard; }} class={`"h-auto border-2  rounded-xl  text-2xl px-6 py-2 
        ${hard ? 'text-white bg-blue-500 border-white' : 'text-white  hover:bg-zinc-300 hover:text-black  bg-zinc-400 border-black' }`}>
            Těžká
        </button>
        
        {#if remainingQuestions != 0}
            <button 
                on:click={async () => { 
                    await markAsHard(questionId);
                    selectedAnswerId = null;
                    hard = false;
                    questionEvaluated = false;
                    await getNextQuestion();
                }}
                class="h-auto border-2 border-black bg-zinc-400 rounded-xl text-white text-2xl px-6 py-2 hover:bg-zinc-300 hover:text-black">
                Další
            </button>
        {:else}
            <button 
                on:click={ async () => {
                    await markAsHard(questionId);
                    userView.goto_evaluation_view();
                }}
                class="h-auto border-2 border-black bg-zinc-400 rounded-xl text-white text-2xl px-6 py-2 hover:bg-zinc-300 hover:text-black">
                Vyhodnotit
            </button>
        {/if}

    {/if}
      
    </div>
  </div>