<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    // import QuestionList from "./QuestionList.svelte";

    export let selectedQuestionId: number | null = null; // TODO

    let name = "";
    let question = "";
    let correctAnswerId: number | null = null;
    let answers: any = [];
    let totalRecords: number; // TODO remove
    let flashMessage = "";  
    let flashType = "";


    const dispatch = createEventDispatcher();

    const saveClicked = () => {
        dispatch('saveClicked');
    };


    function showFlashMessage(message: string, type: string) {
        flashMessage = message;
        flashType = type;
        setTimeout(() => {
            flashMessage = "";
            flashType = "";
        }, 2000);  
    };

    const fetchQuestion = async () => {
        const response = await fetch(`http://localhost:3000/quiz-exercise/question/${selectedQuestionId}`);
        const data = await response.json();
        name = data.name;
        question = data.question;
        correctAnswerId = data.rightAnswerId;

        
    };

    const fetchAnswers = async () => {
        const response = await fetch(`http://localhost:3000/quiz-exercise/answer?questionId=${selectedQuestionId}`);
        const {data, total} = await response.json();
        totalRecords = total;
        answers = data;
    };

    const saveQuestion = async () => {
        const response = await fetch(`http://localhost:3000/quiz-exercise/question/${selectedQuestionId}`,
        {
          method: "PATCH",
          headers: {
                'Content-Type': 'application/json', 
            },
          body: JSON.stringify({name: name, question: question, rightAnswerId: correctAnswerId})
        });
        const data = await response.json();
    };

    const saveAnswers = async () => {
        for (const answer of answers) {
            const response = await fetch(`http://localhost:3000/quiz-exercise/answer/${answer.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ answer: answer.answer, questionId: selectedQuestionId })
            });
            const data = await response.json();
        }   
    };

    const createNewAnswer = async () => {
        const response = await fetch(`http://localhost:3000/quiz-exercise/answer/`, {
            method: "POST",
            headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ answer: "odpověď", questionId: selectedQuestionId })
            });
            const data = await response.json();
    };

    const deleteAnswer  = async (id: number) =>{
        if(id != correctAnswerId){
            const response = await fetch(`http://localhost:3000/quiz-exercise/answer/${id}`,
            {
                method: "DELETE"
            }
            );

            await fetchAnswers();

        }else{
            showFlashMessage("Nelze smazat správnou odpověď!", "red");
        }
      
    };


    onMount(async () => {
        if (selectedQuestionId) {
            fetchQuestion();
            fetchAnswers();
        }
        
    });

</script>
{@debug answers}
{#if selectedQuestionId}
    
<h1 class="text-3xl mb-4">Náhled</h1>
<hr class="h-1 mt-4 bg-blue-950 border-0 dark:bg-blue-950 w-11/12 overflow-y-auto">
<div class="flex flex-col mx-auto bg-blue-950 rounded-xl shadow-lg border-2 border-black p-6 text-white size-3/4 my-auto">
  <input placeholder="Název otázky" class=" text-4xl bg-inherit w-full" bind:value={name}/>

  <hr class="h-0.5 mt-4 bg-blue-950 border-0 dark:bg-white w-full">
  <div class="text-2xl text-color-white flex h-1/3 mt-6 w-full">
    <textarea placeholder="Text otázky" class="bg-inherit size-full" bind:value={question}/>
  </div>

  <div class="text-2xl mt-6 space-y-6 text-black w-full overflow-y-auto max-h-full"> <!-- scrollable enabled-->
    {#if answers.length > 0}
        {#each answers as answer}
            <div class="border-1 border-color-zinc-400 flex bg-neutral-300 hover:bg-neutral-400 rounded-xl w-auto h-auto">
                <input placeholder="odpověď" class="m-2 ml-6 text-justify bg-inherit w-full h-full" bind:value={answer.answer}/>

                <label class="m-3 cursor-pointer">
                    <input
                    type="radio"
                    class="sr-only" 
                    name="correct-answer"
                    bind:group={correctAnswerId}
                    value={answer.id}
                    />

                    <div class="w-6 h-6 border-2 border-gray-600 rounded-sm flex items-center justify-center bg-white transition-colors">
                    {#if correctAnswerId === answer.id}
                        <span class="text-green-600 text-xl">✓</span>
                    {/if}
                    </div>
                </label>

                <button on:click={() => { deleteAnswer(answer.id); }} class="m-1 p-1 rounded-full bg-transparent hover:bg-red-400 border-0">
                    <img
                        alt="Smazat odpověď"
                        src="https://cdn2.iconfinder.com/data/icons/multimedia-collection-13/128/200211-22-512.png"
                        class="w-8 h-8 object-cover rounded-full"
                    />
                </button>
            </div>
            
        {/each}
        {#if answers.length < 4}
            <button class="text-black bg-neutral-300 px-4 py-2 rounded-xl hover:bg-neutral-500" on:click={async () => { await saveAnswers(); await createNewAnswer(); await fetchAnswers();}}>Přidat odpověď</button>
        {/if}
    {:else}
        <button class="text-black bg-neutral-300 px-4 py-2 rounded-xl hover:bg-neutral-500" on:click={async () => {await createNewAnswer(); await fetchAnswers();}}>Přidat odpověď</button>
    {/if}
  </div>
</div>


{#if flashMessage}
    <div class={`fixed top-4 left-1/2 transform -translate-x-1/2 ${flashType === 'green' ? 'bg-green-500' : 'bg-red-500'} text-white px-4 py-2 rounded shadow-md`}>
        {flashMessage}
    </div>
{/if}

<div class="flex justify-between w-3/4 mx-auto">
  <button 
    on:click={async () => {
        await saveQuestion();
        await saveAnswers();
        showFlashMessage("Uložení proběhlo úspěšně", "green");
        saveClicked();
    }}
    class="h-auto border-2 border-black bg-zinc-400 rounded-xl text-white text-2xl px-6 py-2 hover:bg-zinc-300">
    Uložit
  </button>
</div>
{:else}
    <div class="h-full w-11/12 mx-auto flex flex-col text-center justify-center font-bold text-4xl">
    Vyberte otázku
    </div>
{/if}
