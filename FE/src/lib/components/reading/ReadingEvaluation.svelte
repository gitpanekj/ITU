<script lang="ts">
  import { onMount } from "svelte";
  import { userView } from "../../../stores/Reading/userView";
    let correct_questions: any = [];
    let wrong_questions: any = [];

    onMount(async () => {
        const response = await fetch(`http://localhost:3000/reading-exercise/evaluate_session/${localStorage.getItem('readingSessionId')}`);
        const data = await response.json();
        console.log(data);
        correct_questions = data.correct;
        wrong_questions = data.wrong;
    })
</script>

<div class='flex flex-col items-center border-2 border-black h-full pt-8 gap-8'>

    <div class="flex flex-col h-[45%] w-full p-8 gap-4">
        <h1 class="text-4xl font-bold">Špatné odpovědi</h1>
        <div class="flex flex-col overflow-y-auto h-full w-full gap-2 items-center">
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            {#each wrong_questions as q (q.id)}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div 
                    on:click={() => {userView.goto_evaluation_detail_view(q)}}
                    class="w-full min-h-12 border-2 border-black rounded-ld flex gap-4 items-center p-2 cursor-pointer hover:bg-slate-200">
                    <h1>{q.name}</h1>
                    {#if q.hard}
                    <h1 class="w-16 border-2 bg-red-500 font-bold rounded-lg  text-center flex justify-center items-center">Hard</h1>
                    {/if}
                </div>
            {/each}
        </div>
    </div>

    <div class="flex flex-col h-[45%] w-full p-8 gap-4">
        <h1 class="text-4xl font-bold">Správné odpovědi</h1>
        <div class="flex flex-col overflow-y-auto h-full w-full gap-2">
            {#each correct_questions as q (q.id)}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div 
                    on:click={() => {userView.goto_evaluation_detail_view(q)}}
                    class="w-full min-h-12 border-2 border-black rounded-ld flex gap-2 items-center p-2 cursor-pointer hover:bg-slate-200">
                    <h1>{q.name}</h1>
                    {#if q.hard}
                    <h1 class="w-16 border-2 bg-red-500 font-bold rounded-lg  text-center flex justify-center items-center">Hard</h1>
                    {/if}
                </div>
            {/each}
        </div>
    </div>

</div>