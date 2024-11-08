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

  const getFlashcards = async () => {
      const response = await fetch(`http://localhost:3000/flashcard-exercise?groupId=${moduleId}`);
      const data = await response.json();
      flashcards = data.data;
  }

  const getQuizes = async () => {
      const response = await fetch(`http://localhost:3000/quiz-exercise?groupId=${moduleId}`);
      const data = await response.json();
      quizes = data.data;
  }

  const getReadings = async () => {
      const response = await fetch(`http://localhost:3000/reading-exercise?groupId=${moduleId}`);
      const data = await response.json();
      readings = data.data;
  }

  const getTeacherName = async () => {
      const response = await fetch(`http://localhost:3000/teacher/${module_data.teacherId}`);
      const data = await response.json();
      teacher_name = data.username;
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
  <!-- TODO smazat -->
  <!-- TODO přidat nový-->
  <div class="basis-3/4 m-10">
      <div class="grid gap-16 grid-cols-3 m-10">
          <div class="grid gap-2 grid-cols-1">
              <p class="font-bold text-xl">Upravit čtení v lekci:</p>
              {#each readings as reading}
                  <a href="/teacher/module/{moduleId}/reading/{reading.id}">
                      <button class="rounded-xl border-2 ml-4 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200">
                          {reading.name}
                      </button>
                  </a>
              {/each}
          </div>
          <div class="grid gap-2 grid-cols-1">
              <p class="font-bold text-xl">Upravit kartičky v lekci:</p>
              {#each flashcards as flashcard}
                  <a href="/teacher/module/{moduleId}/flashcards/{flashcard.id}">
                      <button class="rounded-xl border-2 ml-4 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200">
                          {flashcard.name}
                      </button>
                  </a>
              {/each}
          </div>
          <div class="grid gap-2 grid-cols-1">
              <p class="font-bold text-xl">Upravit kvízy v lekci:</p>
              {#each quizes as quiz}
                  <a href="/teacher/module/{moduleId}/quiz/{quiz.id}">
                      <button class="rounded-xl border-2 ml-4 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200">
                          {quiz.name}
                      </button>
                  </a>
              {/each}
          </div>
      </div>
      <div class="m-20">
          <p class="text-xl">
              {module_data.description}
          </p>
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

