<!-- Module edit page - src/routes/teacher/module/[moduleId]/+page.svelte -->
<!-- <script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import type { Link } from "$lib/utils/dataTypes.js";
  import { onMount } from "svelte";

  export let data; // data loaded by load from page.ts
  const moduleId: number = data.props.moduleId;
  let module_data = [];

  // Navbar
  let links: Array<Link> = [["Hlavní stránka", "/", () => {}]];
  let title: string = `Teachers module wit ${moduleId}`;

  onMount(() => {
    // TODO: fetching data after page render
  });
</script>

<Navbar {title} {links} />
<div
  class="w-11/12 mx-auto flex flex-col text-center justify-center font-bold text-4xl"
  style="height: calc(100vh - 4em)"
>
  Details of one module - moduleId: {moduleId}
</div> -->

<!-- Module edit page - src/routes/teacher/module/[moduleId]/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import type { Link } from '$lib/utils/dataTypes.js';
  import Navbar from '$lib/components/Navbar.svelte';
  import { get } from 'svelte/store';
  import { loadUserContext } from "$lib/userContenxt/userContext";
  import { goto } from "$app/navigation";


  let userId: number | null = null;


  // props
  export let data; // data loaded by load from page.ts
  const moduleId: number = data.props.moduleId;
  let module_data: {id: number, name: string, description: string, teacherId: number} = data.props.module_data;

  // Navbar links
  let links: Array<Link> = [["Hlavní stránka", "/", () => {}]];
  let title: string = `Detail lekce`;

  let flashcards: {id: number, name: string, description: string, groupId: number}[] = [];
  let quizes: {id: number, name: string, description: string, groupId: number}[] = [];
  let readings: {id: number, name: string, description: string, groupId: number}[] = [];
  let teacher_name: string = "...";
  let max_rows: number = 1;

  const getFlashcards = async () => {
      const response = await fetch(`http://localhost:3000/flashcard-exercise?groupId=${moduleId}`);
      const data = await response.json();
      flashcards = data.data;
      if(data.total > max_rows) max_rows = data.total; // pro jednotne formatovani tabulky
  }

  const getQuizes = async () => {
      const response = await fetch(`http://localhost:3000/quiz-exercise?groupId=${moduleId}`);
      const data = await response.json();
      quizes = data.data;
      if(data.total > max_rows) max_rows = data.total;
  }

  const getReadings = async () => {
      const response = await fetch(`http://localhost:3000/reading-exercise?groupId=${moduleId}`);
      const data = await response.json();
      readings = data.data;
      if(data.total > max_rows) max_rows = data.total;
  }

  const getTeacherName = async () => {
      const response = await fetch(`http://localhost:3000/teacher/${module_data.teacherId}`);
      const data = await response.json();
      teacher_name = data.username;
  }

    // TODO mazani cviceni
    // TODO optimalnejsi obnoveni (je asi zbytecne obnovovat celou stranku)
    // TODO hezci varovne okno ?
    function deleteExercise(exerciseType: string, exerciseId: number) {
        let reallyDelete = confirm("Opravdu smazat celé cvičení?\nTuto akci nelze vrátit zpět!");
        if(reallyDelete) {
            switch (exerciseType) {
                case "flashcards":
                    fetch(`http://localhost:3000/flashcard-exercise/${moduleId}`, {method: 'DELETE'});
                    break;

                case "reading":
                    fetch(`http://localhost:3000/reading-exercise/${moduleId}`, {method: 'DELETE'});
                    break;

                case "quiz":
                    fetch(`http://localhost:3000/quiz-exercise/${moduleId}`, {method: 'DELETE'});
                    break;
            
                default:
                    break;
            }
            console.log("Deleting " + exerciseType + " exercise with ID [" + exerciseId + "].");
            location.reload(); // obnoveni stranky, tj. i seznamu
        }
    }

    // TODO tvorba noveho cviceni
    // TODO optimalnejsi obnoveni (je asi zbytecne obnovovat celou stranku)
    function createExercise(exerciseType: string) {

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
                fetch(`http://localhost:3000/flashcard-exercise`, requestOptions);
                break;

            case "reading":
                fetch(`http://localhost:3000/reading-exercise`, requestOptions);
                break;

            case "quiz":
                fetch(`http://localhost:3000/quiz-exercise`, requestOptions);
                break;
        
            default:
                break;
        }
        console.log("Creating new " + exerciseType +".");
        location.reload(); // obnoveni stranky, tj. i seznamu
    }

    // TODO prejmenovani cviceni
    // TODO optimalnejsi obnoveni (je asi zbytecne obnovovat celou stranku)
    // TODO pri ziskavani newName myslet na to ze dom muze byt null
    function renameExercise(exerciseType: string, exerciseId: number) {
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
                fetch(`http://localhost:3000/flashcard-exercise/${exerciseId}`, requestOptions);
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
                fetch(`http://localhost:3000/reading-exercise/${exerciseId}`, requestOptions);
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
                fetch(`http://localhost:3000/quiz-exercise/${exerciseId}`, requestOptions);
                break;

            default:
                break;
        }
        console.log("Renaming exercise with ID [" + exerciseId +"] to [" + newName + "].");
        location.reload(); // obnoveni stranky, tj. i seznamu
    }



  onMount( async () => {
      userId = loadUserContext();
          if (!userId){ // user not logged in
              goto('/login');
          }
      await getFlashcards();
      await getQuizes();
      await getReadings();
      getTeacherName();
  });

  
</script>


<!-- Hlavicka -->
<!-- TODO uprava nazvu -->
<Navbar {title} {links}/>
<br>
<div class="w-11/12 mx-auto flex flex-col text-center justify-center font-bold text-4xl">
  {module_data.name}
</div>
<br>
<div class="w-11/12 mx-auto flex flex-col text-center justify-center italic text-xl">
  {teacher_name}
</div>

<!-- Obsah stranky -->
<!-- TODO uprava popisu -->
<div class="flex mt-10">

    <!-- Odkazy a popis -->
    <!-- TODO přidat nový-->
    <div class="basis-3/4 m-10">

        <!-- Popis -->
        <div class="ml-10 mb-10">
            <p class="text-xl">
                {module_data.description}
            </p>
        </div>

        <!-- Tvorba novych cviceni -->
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

        <div class="grid gap-16 grid-cols-3 m-10">
            <!-- Cteni -->
            <div class="grid gap-2 grid-cols-1 grid-rows-{max_rows}">
                <p class="font-bold text-xl">Všechna čtení v lekci:</p>
                {#each readings as reading}
                    <div class="border-2 rounded-xl border-slate-800 p-4">
                        <details>
                            <summary class="font-bold cursor-pointer hover:underline">{reading.name} ✏</summary>
                            <input type="text" name="reading" id={reading.id.toString()} class="bg-gray-100 rounded-md m-1 border-2 border-blue-200">
                            <button class="rounded-xl border-2 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200"
                                    on:click={() => {renameExercise("reading", reading.id)}}>
                                Přejmenovat
                            </button>
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
            <div class="grid gap-2 grid-cols-1 grid-rows-{max_rows}">
                <p class="font-bold text-xl">Všechny kartičky v lekci:</p>
                {#each flashcards as flashcard}
                <div class="border-2 rounded-xl border-slate-800 p-4">
                    <details>
                        <summary class="font-bold cursor-pointer hover:underline">{flashcard.name} ✏</summary>
                        <input type="text" name="flashcards" id={flashcard.id.toString()} class="bg-gray-100 rounded-md m-1 border-2 border-blue-200">
                        <button class="rounded-xl border-2 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200"
                                on:click={() => {renameExercise("flashcards", flashcard.id)}}>
                            Přejmenovat
                        </button>
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
            <div class="grid gap-2 grid-cols-1 grid-rows-{max_rows}">
                <p class="font-bold text-xl">Všechny kvízy v lekci:</p>
                {#each quizes as quiz}
                <div class="border-2 rounded-xl border-slate-800 p-4">
                    <details>
                        <summary class="font-bold cursor-pointer hover:underline">{quiz.name} ✏</summary>
                        <input type="text" name="quiz" id={quiz.id.toString()} class="bg-gray-100 rounded-md m-1 border-2 border-blue-200">
                        <button class="rounded-xl border-2 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200"
                                on:click={() => {renameExercise("quiz", quiz.id)}}>
                            Přejmenovat
                        </button>
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
  </div>

  <!-- Kod a znacky -->
  <!-- TODO kod a tagy -->
  <div class="basis-1/4 m-10">
      <!-- zde pripadne bude obrazek, pokud budeme implementovat -->
      <p class="text-2xl font-bold py-8 px-2">
          #123456<br>
      </p>
      <br>
      <p class="text-xl py-8 px-2">
          Téma<br>
          Škola<br>
          . . .<br>
      </p>
  </div>

</div>

