<!-------------------------------------------------------------- 
Filename: FE/src/lib/components/mainPage/Exercises.svelte
Author: Vojtěch Růžička
Login: xruzic56
Last Modified: [09-12-2024]
Description: Three columns of available exercises with links to them.
---------------------------------------------------------------->

<script lang="ts">
    export let moduleId: number;
    export let flashcards: {id: number, name: string, description: string, groupId: number}[] = [];
    export let quizes: {id: number, name: string, description: string, groupId: number}[] = [];
    export let readings: {id: number, name: string, description: string, groupId: number}[] = [];

</script>


<div class="grid gap-16 grid-cols-3 m-10">
    
    <!-- Cteni -->
    <div class="space-y-4">
        <p class="font-bold text-xl">Všechna čtení v lekci:</p>
        {#each readings as reading}
            <div class="border-2 rounded-xl border-slate-800 p-4">
                <p class="font-bold">{reading.name}</p>
                <br>
                <a href="/module/{moduleId}/reading/{reading.id}">
                    <button class="rounded-xl border-2 ml-4 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200">
                        Spustit cvičení
                    </button>
                </a>
            </div>
        {/each}
    </div>

    <!-- Flashcards -->
    <div class="space-y-4">
        <p class="font-bold text-xl">Všechny kartičky v lekci:</p>
        {#each flashcards as flashcard}
            <div class="border-2 rounded-xl border-slate-800 p-4">
                <p class="font-bold">{flashcard.name}</p>
                <br>
                <a href="/module/{moduleId}/flashcards/{flashcard.id}">
                    <button class="rounded-xl border-2 ml-4 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200">
                        Spustit cvičení
                    </button>
                </a>
            </div>
        {/each}
    </div>

    <!-- Kviz -->
    <div class="space-y-4">
        <p class="font-bold text-xl">Všechny kvízy v lekci:</p>
        {#each quizes as quiz}
            <div class="border-2 rounded-xl border-slate-800 p-4">
                <p class="font-bold">{quiz.name}</p>
                <br>
                <a href="/module/{moduleId}/quiz/{quiz.id}">
                    <button class="rounded-xl border-2 ml-4 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200">
                        Spustit cvičení
                    </button>
                </a>
            </div>
        {/each}
    </div>
</div>
