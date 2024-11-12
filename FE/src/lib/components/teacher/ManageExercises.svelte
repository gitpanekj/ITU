<script lang="ts">
    import { goto } from "$app/navigation";
    import { getFlashcards, getQuizes, getReadings } from '$lib/utils/getExercises';

    export let moduleId: number;

    export let flashcards: {id: number, name: string, description: string, groupId: number}[];
    export let quizes: {id: number, name: string, description: string, groupId: number}[];
    export let readings: {id: number, name: string, description: string, groupId: number}[];
   
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
    async function createExercise(exerciseType: string) {

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                name: "Nové cvičení", 
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
    <button class="rounded-xl border-2 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200"
            on:click={() => {createExercise("reading")}}>
        Vytvořit nové čtení
    </button>
    <button class="rounded-xl border-2 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200"
            on:click={() => {createExercise("flashcards")}}>
        Vytvořit nové flashcards
    </button>                
    <button class="rounded-xl border-2 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200"
            on:click={() => {createExercise("quiz")}}>
        Vytvořit nový kvíz
    </button>   
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
                    <br>
                    <input type="text" name="reading" id={reading.id.toString()} class="bg-gray-100 px-2 rounded-md m-1 border-2 border-blue-200" value={reading.name}>
                    <button class="rounded-xl border-2 px-2 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200"
                            on:click={() => {renameExercise("reading", reading.id)}}>
                        Přejmenovat
                    </button>
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
                <br>
                <input type="text" name="flashcards" id={flashcard.id.toString()} class="bg-gray-100 px-2 rounded-md m-1 border-2 border-blue-200" value={flashcard.name}>
                <button class="rounded-xl border-2 px-2 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200"
                        on:click={() => {renameExercise("flashcards", flashcard.id)}}>
                    Přejmenovat
                </button>
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
                <br>
                <input type="text" name="quiz" id={quiz.id.toString()} class="bg-gray-100 px-2 rounded-md m-1 border-2 border-blue-200" value={quiz.name}>
                <button class="rounded-xl border-2 px-2 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200"
                        on:click={() => {renameExercise("quiz", quiz.id)}}>
                    Přejmenovat
                </button>
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
