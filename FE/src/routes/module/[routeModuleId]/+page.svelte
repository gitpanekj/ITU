<!-------------------------------------------------------------- 
Filename: FE/src/routes/module/[moduleId]/+page.svelte
Author: Vojtěch Růžička
Login: xruzic56
Last Modified: [09-12-2024]
Description: Lecture detail with links to exercises.
---------------------------------------------------------------->

<script lang="ts">
    import { onMount } from 'svelte';
    import type { Link } from '$lib/utils/dataTypes.js';
    import Navbar from '$lib/components/Navbar.svelte';
    import ModulesHeader from '$lib/components/mainPage/ModulesHeader.svelte';
    import ModuleDescription from '$lib/components/mainPage/ModuleDescription.svelte';
    import CodeAndTags from '$lib/components/CodeAndTags.svelte';
    import Exercises from '$lib/components/mainPage/Exercises.svelte';
    import { getFlashcards, getQuizes, getReadings } from '$lib/utils/getExercises';
    import { getExerciseConunts } from '$lib/utils/exerciseCounts.js';


    // props
    export let data; // data loaded by load from page.ts
    const moduleId: number = data.props.moduleId;
    let module_data: {id: number, name: string, description: string, teacherId: number} = data.props.module_data;

    // Navbar links
    let links: Array<Link> = [["Hlavní stránka", "/", () => {}]];
    let title: string = `Detail lekce`;

    let teacher_name: string = "...";
    let flashcards: {id: number, name: string, description: string, groupId: number}[] = [];
    let quizes: {id: number, name: string, description: string, groupId: number}[] = [];
    let readings: {id: number, name: string, description: string, groupId: number}[] = [];
    let exercises_counts: {flashcards: number, quizes: number, readings: number, all: number} = {flashcards: 0, quizes: 0, readings: 0, all: 0};

          
    // ziskani jmena autora lekce (ucitele)
    export const getTeacherName = async () => {
        const response = await fetch(`http://localhost:3000/teacher/${module_data.teacherId}`);
        const data = await response.json();
        teacher_name = data.username;
    }

    onMount( async () => {
        getTeacherName();
        flashcards = await getFlashcards(moduleId);
        quizes = await getQuizes(moduleId);
        readings = await getReadings(moduleId);
        exercises_counts = await getExerciseConunts(moduleId);
    });

    
</script>


<!-- Hlavicka -->
<Navbar {title} {links}/>
<br>
<ModulesHeader {module_data} {teacher_name} />

<!-- Obsah stranky -->
<div class="flex mt-10">

    <!-- Popis a odkazy na cviceni -->
    <div class="basis-3/4 m-10">

        <!-- Popis -->
         <ModuleDescription {module_data} />

        <!-- Tvorba novych cviceni -->
         <Exercises {moduleId} {flashcards} {quizes} {readings} />

    </div>

    <!-- Kod a znacky -->
    <CodeAndTags {exercises_counts} {moduleId}/>  

</div>
