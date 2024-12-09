<!-------------------------------------------------------------- 
Filename: FE/src/lib/components/teacher/ManageExercises.svelte
Author: Vojtěch Růžička
Login: xruzic56
Last Modified: [09-12-2024]
Description: Creating and deleting exercises, editing properties of exercises (not content).
---------------------------------------------------------------->

<script lang="ts">
    import { goto } from "$app/navigation";
    import { getFlashcards, getQuizes, getReadings } from '$lib/utils/getExercises';

    export let moduleId: number;

    export let flashcards: {id: number, name: string, description: string, groupId: number}[];
    export let quizes: {id: number, name: string, description: string, groupId: number}[];
    export let readings: {id: number, name: string, description: string, groupId: number}[];

    let newReadingName: string;
    let newFlashcardsName: string;
    let newQuizName: string;
   
    // mazani cviceni
    // TODO optimalnejsi obnoveni (je asi zbytecne obnovovat celou stranku)
    // TODO hezci varovne okno ?
    async function deleteExercise(exerciseType: string, exerciseId: number) {
        let reallyDelete = confirm("Opravdu smazat celé cvičení?\nTuto akci nelze vrátit zpět!");
        if(reallyDelete) {
            switch (exerciseType) {
                case "flashcards":
                    await fetch(`http://localhost:3000/flashcard-exercise/${exerciseId}`, {method: 'DELETE'});
                    break;

                case "reading":
                    await fetch(`http://localhost:3000/reading-exercise/${exerciseId}`, {method: 'DELETE'});
                    break;

                case "quiz":
                    await fetch(`http://localhost:3000/quiz-exercise/${exerciseId}`, {method: 'DELETE'});
                    break;
            
                default:
                    break;
            }
            console.log("Deleting " + exerciseType + " exercise with ID [" + exerciseId + "].");
            flashcards = await getFlashcards(moduleId);
            quizes = await getQuizes(moduleId);
            readings = await getReadings(moduleId);
        }
    }

    // prejmenovani cviceni
    // TODO optimalnejsi obnoveni (je asi zbytecne obnovovat celou stranku)
    async function renameExercise(exerciseType: string, exerciseId: number) {
        let newName = "";
        let names;
        let requestOptions;

        switch (exerciseType) {
            
            case "flashcards":
                names = document.getElementsByName("flashcards");
                for (let i = 0; i < names.length; i++) {
                    const name: any = names[i];
                    if(name.id == exerciseId.toString()) {
                        newName = name.value;
                        break;
                    }
                }  
                requestOptions = {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        name: newName
                    })
                };
                await fetch(`http://localhost:3000/flashcard-exercise/${exerciseId}`, requestOptions);
                break;

            case "reading":
                names = document.getElementsByName("reading");
                for (let i = 0; i < names.length; i++) {
                    const name: any = names[i];
                    if(name.id == exerciseId.toString()) {
                        newName = name.value;
                        break;
                    }
                }  
                requestOptions = {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        name: newName
                    })
                };
                await fetch(`http://localhost:3000/reading-exercise/${exerciseId}`, requestOptions);
                break;

            case "quiz":
                names = document.getElementsByName("quiz");
                for (let i = 0; i < names.length; i++) {
                    const name: any = names[i];
                    if(name.id == exerciseId.toString()) {
                        newName = name.value;
                        break;
                    }
                } 
                requestOptions = {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        name: newName
                    })
                };
                await fetch(`http://localhost:3000/quiz-exercise/${exerciseId}`, requestOptions);
                break;

            default:
                break;
        }
        console.log("Renaming exercise with ID [" + exerciseId +"] to [" + newName + "].");
        flashcards = await getFlashcards(moduleId);
        quizes = await getQuizes(moduleId);
        readings = await getReadings(moduleId);
    }

    // tvorba noveho cviceni
    // TODO optimalnejsi obnoveni (je asi zbytecne obnovovat celou stranku)
    async function createExercise(exerciseType: string, title: string) {

        if(!title) title = "Nové cvičení";

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                name: title, 
                description: "",
                groupId: moduleId
            })
        };

        switch (exerciseType) {
            case "flashcards":
                await fetch(`http://localhost:3000/flashcard-exercise`, requestOptions);
                break;

            case "reading":
                await fetch(`http://localhost:3000/reading-exercise`, requestOptions);
                break;

            case "quiz":
                await fetch(`http://localhost:3000/quiz-exercise`, requestOptions);
                break;

            default:
                break;
        }
        console.log("Creating new " + exerciseType +".");
        flashcards = await getFlashcards(moduleId);
        quizes = await getQuizes(moduleId);
        readings = await getReadings(moduleId);
    }

</script>

<!-- Tvorba cviceni -->
<div class="grid gap-16 grid-cols-3 m-10">
    <div class="grid justify-items-center border-4 rounded-xl border-slate-800 p-4">
        <h2 class="font-bold w-full">
            <textarea class="w-full bg-gray-100 rounded-md m-1 border-2 border-blue-200" placeholder="Název nového čtení s porozuměním..." bind:value={newReadingName}></textarea>
        </h2>
        <button class="w-full rounded-xl border-2 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200"
                on:click={() => {createExercise("reading",newReadingName)}}>
            Vytvořit nové čtení
        </button>
    </div>
    <div class="grid justify-items-center border-4 rounded-xl border-slate-800 p-4">
        <h2 class="font-bold w-full">
            <textarea class="w-full bg-gray-100 rounded-md m-1 border-2 border-blue-200" placeholder="Název nového cvičení flashcards..." bind:value={newFlashcardsName}></textarea>
        </h2>
        <button class="w-full rounded-xl border-2 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200"
                on:click={() => {createExercise("flashcards",newFlashcardsName)}}>
        Vytvořit nové flashcards
        </button>
    </div>
    <div class="grid justify-items-center border-4 rounded-xl border-slate-800 p-4">
        <h2 class="font-bold w-full">
            <textarea class="w-full bg-gray-100 rounded-md m-1 border-2 border-blue-200" placeholder="Název nového kvízu..." bind:value={newQuizName}></textarea>
        </h2>
        <button class="w-full rounded-xl border-2 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200"
                on:click={() => {createExercise("quiz",newQuizName)}}>
        Vytvořit nový kvíz
        </button>
    </div> 
</div>

<!-- Jednotliva cviceni -->
<div class="grid gap-16 grid-cols-3 m-10">
    <!-- Cteni -->
    <div class="space-y-4">
        <p class="font-bold text-xl">Všechna čtení v lekci:</p>
        {#each readings as reading}
            <div class="border-2 rounded-xl border-slate-800 p-4">
                <details>
                    <summary title="Upravit jméno" class="font-bold cursor-pointer list-none hover:underline">{reading.name}&nbsp;&nbsp;<b>|</b> ✏</summary>
                    <textarea id={reading.id.toString()} name="reading" class="w-full bg-gray-100 rounded-md m-1 border-2 border-blue-200" placeholder="Název cvičení" on:blur={() => {renameExercise("reading", reading.id)}}>{reading.name}</textarea>
                    <i class="text-sm m-4">(Název změníte zapsáním nového.)</i>
                    <hr class="border-blue-950 m-4">
                </details>
                <br>
                <button class="rounded-xl border-2 ml-4 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200"
                        on:click={() => {goto(`/teacher/module/${moduleId}/reading/${reading.id}`)}}>
                    Upravit
                </button>
                <button class="rounded-xl border-2 ml-4 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200"
                        on:click={() => {deleteExercise("reading", reading.id)}}>
                    Smazat
                </button>
            </div>
        {/each}
    </div>
    <!-- Flashcards -->
    <div class="space-y-4">
        <p class="font-bold text-xl">Všechny kartičky v lekci:</p>
        {#each flashcards as flashcard}
        <div class="border-2 rounded-xl border-slate-800 p-4">
            <details>
                <summary title="Upravit jméno" class="font-bold cursor-pointer list-none hover:underline">{flashcard.name}&nbsp;&nbsp;<b>|</b> ✏</summary>
                <textarea id={flashcard.id.toString()} name="flashcards" class="w-full bg-gray-100 rounded-md m-1 border-2 border-blue-200" placeholder="Název cvičení" on:blur={() => {renameExercise("flashcards", flashcard.id)}}>{flashcard.name}</textarea>
                <i class="text-sm m-4">(Název změníte zapsáním nového.)</i>
                <hr class="border-blue-950 m-4">
            </details>
            <br>
            <button class="rounded-xl border-2 ml-4 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200"
                    on:click={() => {goto(`/teacher/module/${moduleId}/flashcards/${flashcard.id}`)}}>
                Upravit
            </button>
            <button class="rounded-xl border-2 ml-4 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200"
                    on:click={() => {deleteExercise("flashcards", flashcard.id)}}>
                Smazat
            </button>
        </div>
        {/each}
    </div>
    <!-- Kviz -->
    <div class="space-y-4">
        <p class="font-bold text-xl">Všechny kvízy v lekci:</p>
        {#each quizes as quiz}
        <div class="border-2 rounded-xl border-slate-800 p-4">
            <details>
                <summary title="Upravit jméno" class="font-bold cursor-pointer list-none hover:underline">{quiz.name}&nbsp;&nbsp;<b>|</b> ✏</summary>
                <textarea id={quiz.id.toString()} name="quiz" class="w-full bg-gray-100 rounded-md m-1 border-2 border-blue-200" placeholder="Název cvičení" on:blur={() => {renameExercise("quiz", quiz.id)}}>{quiz.name}</textarea>
                <i class="text-sm m-4">(Název změníte zapsáním nového.)</i>
                <hr class="border-blue-950 m-4">
            </details>
            <br>
            <button class="rounded-xl border-2 ml-4 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200"
                    on:click={() => {goto(`/teacher/module/${moduleId}/quiz/${quiz.id}`)}}>
                Upravit
            </button>
            <button class="rounded-xl border-2 ml-4 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200"
                    on:click={() => {deleteExercise("quiz", quiz.id)}}>
                Smazat
            </button>
        </div>
        {/each}
    </div>
</div>
