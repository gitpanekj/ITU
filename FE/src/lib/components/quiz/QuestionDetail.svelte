<!-------------------------------------------------------------- 
Filename: FE/src/lib/components/quiz/QuestionDetail.svelte
Author: Jiří Kantor
Login: xkanto16
Last Modified: [08-12-2024]
Description: Component for detail of the question and editing
---------------------------------------------------------------->

<script lang="ts">
    // library import
    import { createEventDispatcher, onMount } from "svelte";

    // property
    export let selectedQuestionId: number | null = null; 

    // helper UI vars
    let name = "";
    let question = "";
    let correctAnswerId: number | null = null;
    let answers: any = [];
    let flashMessage = "";  
    let flashType = "";

    const dispatch = createEventDispatcher();

    // between component messaging when update 
    const saveClicked = () => {
        dispatch('saveClicked');
    };


    // flash message logic
    function showFlashMessage(message: string, type: string) {
        flashMessage = message;
        flashType = type;
        setTimeout(() => {
            flashMessage = "";
            flashType = "";
        }, 2000);  
    };

    // question data fetch
    const fetchQuestion = async () => {
        try {
            const response = await fetch(`http://localhost:3000/quiz-exercise/question/${selectedQuestionId}`);
            const data = await response.json();
            name = data.name;
            question = data.question;
            correctAnswerId = data.rightAnswerId;

        } catch (error) {
            alert("Chyba při načítání otázek");
        }
    };

    // question answers fetch
    const fetchAnswers = async () => {
        try {
            const response = await fetch(`http://localhost:3000/quiz-exercise/answer?questionId=${selectedQuestionId}`);
            const {data, total} = await response.json();
            answers = data;

        } catch (error) {
            alert("Chyba při načítání odpovědí");
        }
        
    };

    // question data saving
    const saveQuestion = async () => {
        try {
            const response = await fetch(`http://localhost:3000/quiz-exercise/question/${selectedQuestionId}`,
            {
            method: "PATCH",
            headers: {
                    'Content-Type': 'application/json', 
                },
            body: JSON.stringify({name: name, question: question, rightAnswerId: correctAnswerId})
            });
            const data = await response.json();

        } catch (error) {
            alert("Chyba při ukládání otázky");
        }
        
    };

    // question answers saving
    const saveAnswers = async () => {
        try {
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
        } catch (error) {
            alert("Chyba při ukládání odpovědí");
        }
        
    };

    // new question answer creating
    const createNewAnswer = async () => {
        try {
            const response = await fetch(`http://localhost:3000/quiz-exercise/answer/`, {
                method: "POST",
                headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ answer: "odpověď", questionId: selectedQuestionId })
                });
            const data = await response.json();
        } catch (error) {
            alert("Chyba při vytváření odpovědi");
        }
        
    };

    // delete question answer
    const deleteAnswer  = async (id: number) =>{
        try {
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
        } catch (error) {
            alert("Chyba při mazání odpovědi");
        }
        
      
    };


    onMount(async () => {
        if (selectedQuestionId) {
            fetchQuestion();
            fetchAnswers();
        }
        
    });

</script>
<!-- if selected question, show detail -->
{#if selectedQuestionId}

<!-- header -->
<h1 class="text-3xl mb-4">Náhled</h1>
<!-- detail container -->
<hr class="h-1 mt-4 bg-blue-950 border-0 dark:bg-blue-950 w-11/12 overflow-y-auto">
<div class="flex flex-col mx-auto bg-blue-950 rounded-xl shadow-lg border-2 border-black p-6 text-white size-3/4 my-auto">
  <input placeholder="Název otázky" class=" text-4xl bg-inherit w-full" bind:value={name}
        on:blur={async () => {
            await saveQuestion();
            showFlashMessage("Uložení proběhlo úspěšně", "green");
            saveClicked();
        }}/>

  <hr class="h-0.5 mt-4 bg-blue-950 border-0 dark:bg-white w-full">
  <div class="text-2xl text-color-white flex h-1/3 mt-6 w-full">
    <textarea placeholder="Text otázky" class="bg-inherit size-full" bind:value={question}
        on:blur={async () => {
            await saveQuestion();
            showFlashMessage("Uložení proběhlo úspěšně", "green");
        }}/>
  </div>

  <!-- question answers - on input edit auto-save when clicked of the input -->
  <div class="text-2xl mt-6 space-y-6 text-black w-full overflow-y-auto max-h-full"> 
    {#if answers.length > 0}
        {#each answers as answer}
            <div class="border-1 border-color-zinc-400 flex bg-neutral-300 hover:bg-neutral-400 rounded-xl w-auto h-auto">
                <input placeholder="odpověď" class="m-2 ml-6 text-justify bg-inherit w-full h-full" bind:value={answer.answer}
                    on:blur={async () => {
                        await saveAnswers();
                    }}/>

                <label class="m-3 cursor-pointer">
                    <input
                    type="radio"
                    class="sr-only" 
                    name="correct-answer"
                    bind:group={correctAnswerId}
                    value={answer.id}
                    on:change={async () => {
                        await saveQuestion();
                    }}
                    />

                    <div class="w-6 h-6 border-2 border-gray-600 rounded-sm flex items-center justify-center bg-white transition-colors">
                    {#if correctAnswerId === answer.id}
                        <span class="text-green-600 text-xl">✓</span>
                    {/if}
                    </div>
                </label>

                <!-- delete button -->
                <button on:click={() => { deleteAnswer(answer.id); }} class="m-1 p-1 rounded-full bg-transparent hover:bg-red-400 border-0">
                    <img
                        alt="Smazat odpověď"
                        src="https://cdn2.iconfinder.com/data/icons/multimedia-collection-13/128/200211-22-512.png"
                        class="w-8 h-8 object-cover rounded-full"
                    />
                </button>
            </div>
            
        {/each}
        <!-- hide add answer button if 4 answers -->
        {#if answers.length < 4}
            <button class="text-black bg-neutral-300 px-4 py-2 rounded-xl hover:bg-neutral-500" on:click={async () => { await saveAnswers(); await createNewAnswer(); await fetchAnswers();}}>Přidat odpověď</button>
        {/if}
    <!-- no existing answers -->
    {:else}
        <button class="text-black bg-neutral-300 px-4 py-2 rounded-xl hover:bg-neutral-500" on:click={async () => {await createNewAnswer(); await fetchAnswers();}}>Přidat odpověď</button>
    {/if}
  </div>
</div>

<!-- flash message container -->
{#if flashMessage}
    <div class={`fixed top-4 left-1/2 transform -translate-x-1/2 ${flashType === 'green' ? 'bg-green-500' : 'bg-red-500'} text-white px-4 py-2 rounded shadow-md`}>
        {flashMessage}
    </div>
{/if}

<!-- no question selected -->
{:else}
    <div class="h-full w-11/12 mx-auto flex flex-col text-center justify-center font-bold text-4xl">
    Vyberte otázku
    </div>
{/if}
