<!-------------------------------------------------------------- 
Filename: FE/src/routes/teacher/module/[moduleId]/+page.svelte
Author: Vojtěch Růžička
Login: xruzic56
Last Modified: [09-12-2024]
Description: Lecture edit page. 
---------------------------------------------------------------->

<script lang="ts">
    import { onMount } from 'svelte';
    import type { Link } from '$lib/utils/dataTypes.js';
    import Navbar from '$lib/components/Navbar.svelte';
    import { get } from 'svelte/store';
    import { loadUserContext } from "$lib/userContenxt/userContext";
    import { goto } from "$app/navigation";
    import MyModulesHeader from '$lib/components/teacher/MyModulesHeader.svelte';
    import EditModuleDescription from '$lib/components/teacher/EditModuleDescription.svelte';
    import CodeAndTags from '$lib/components/CodeAndTags.svelte';
    import ManageExercises from '$lib/components/teacher/ManageExercises.svelte';
    import { getFlashcards, getQuizes, getReadings } from '$lib/utils/getExercises';
    import { getExerciseConunts } from '$lib/utils/exerciseCounts.js';

    let userId: number | null = null;

    // props
    export let data; // data loaded by load from page.ts
    let moduleId: number = data.props.moduleId;
    let module_data: {id: number, name: string, description: string, teacherId: number} = data.props.module_data;

    // Navbar
    let links: Array<Link> = [["Hlavní stránka", "/", () => {}]];
    let title: string = `Detail lekce`;

    let teacher_name: string = "...";
    let flashcards: {id: number, name: string, description: string, groupId: number}[] = [];
    let quizes: {id: number, name: string, description: string, groupId: number}[] = [];
    let readings: {id: number, name: string, description: string, groupId: number}[] = [];
    let exercises_counts: {flashcards: number, quizes: number, readings: number, all: number} = {flashcards: 0, quizes: 0, readings: 0, all: 0};

    // ziskani jmena autora lekce (ucitele)
    const getTeacherName = async () => {
        const response = await fetch(`http://localhost:3000/teacher/${module_data.teacherId}`);
        const data = await response.json();
        teacher_name = data.username;
    }


    onMount( async () => {
        userId = loadUserContext();
            if (!userId){ // neprihlasen
                goto('/login');
            }
        await getTeacherName();
        flashcards = await getFlashcards(moduleId);
        quizes = await getQuizes(moduleId);
        readings = await getReadings(moduleId);
        exercises_counts = await getExerciseConunts(moduleId);
    });

</script>


<!-- Hlavicka -->
<Navbar {title} {links} />
<br>
<MyModulesHeader {module_data} {teacher_name} {moduleId} />

<!-- Obsah stranky -->
<div class="flex mt-10">

    <!-- Popis a odkazy na cviceni -->
    <div class="basis-3/4 m-10">

        <!-- Popis -->
        <EditModuleDescription {module_data} {moduleId} />

        <!-- Tvorba a upravy cviceni -->
        <ManageExercises {moduleId} {flashcards} {quizes} {readings} />

    </div>

    <!-- Kod a znacky -->
    <CodeAndTags {exercises_counts} />    

</div>
