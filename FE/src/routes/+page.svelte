<!-------------------------------------------------------------- 
Filename: FE/src/routes/+page.svelte
Author: Vojtěch Růžička
Login: xruzic56
Last Modified: [09-12-2024]
Description: Main page with all lectures listed.
---------------------------------------------------------------->

 <script lang="ts">
    import Modules from "$lib/components/mainPage/Modules.svelte";
import Navbar from "$lib/components/Navbar.svelte";
    import { onMount } from "svelte"; 

    // Navbar
    let title: string = `
        <div class="flex flex-col items-start">
            <h1>Procvič.to</h1>
            <h2>...vše v jednom.</h2>
        </div>
    `;

    let filteredId: number | null = null;
    let filteredAuthor: number | null = null;
    let searchName: string = "";
    
    export let modules: {id: number, name: string, description: string, teacherId: number}[] = [];

    let teachers: {id: number, username: string}[] = [];

    const getModules = async () => {
        const response = await fetch('http://localhost:3000/exercise-group');
        const data = await response.json();
        modules = data.data;
    }

    const getTeachers = async () => {
        const response = await fetch(`http://localhost:3000/teacher`);
        const data = await response.json();
        teachers = data.data;
        console.log(teachers);
    }

    onMount( async () => {
        await getModules();
        await getTeachers();
    });

    

    let resultModules: {id: number, name: string, description: string, teacherId: number}[] = [];



    $: if(filteredId) {
        // filtrace dle ID
        getModulesById();
    }
    else if(filteredAuthor) {
        // filtrace dle jmena autora
        getModulesByAuthor();
    }
    else if(searchName) {
        // hledani dle nazvu
        getModulesByName();
    }
    else {
        // zobrazeno vse
        resultModules = modules;
    }

    const getModulesById = () => {
        if (filteredId == 0) {
            return resultModules = [];
        } 
        return resultModules = modules.filter(lecture => lecture.id == filteredId);
    }

    const getModulesByAuthor = () => {
        if (filteredAuthor == 0) {
            return resultModules = modules;
        } 
        return resultModules = modules.filter(lecture => lecture.teacherId == filteredAuthor);
    }

    const getModulesByName = () => {
        let output: {id: number, name: string, description: string, teacherId: number}[] = [];
        modules.forEach(module => {
            if(module.name.search(searchName) >= 0) {
                output.push(module);
            }
        });
        
        return resultModules = output;
    }

 </script>


 
<!-- Hlavicka -->
<Navbar {title}/>

<!-- Obsah stranky -->
<div class="flex mt-10">
    
    <!-- Moduly -->
    <Modules {resultModules} />

    <!-- Filtry --> 
    <div class="basis-1/3 m-10">
        <div class="fixed">
            <div class="max-w-sm border-2 rounded-xl border-slate-800 p-2">
                <h2 class="flex mx-auto font-bold text-xl m-2 justify-center">Filtry</h2>
                <form class="flex flex-col text-xl">
                    <div class="border-2 rounded-xl border-slate-800 m-2 p-2">  
                        <label for=code>Kód lekce</label>
                        <br>
                        <input type=text id=code name=code class="w-full bg-gray-100 rounded-md m-1 border-2 border-blue-200" bind:value={filteredId}>
                    </div>
                    <br>
                    <div class="border-2 rounded-xl border-slate-800 m-2 p-2">  
                        <label for=author>Autor</label>
                        <br>
                        <select id=author name=author class="w-full bg-gray-100 rounded-md m-1 border-2 border-blue-200" bind:value={filteredAuthor}>
                            <option value=0></option>
                            {#each teachers as teacher}
                            <option value={teacher.id}>{teacher.username}</option>
                            {/each}
                        </select>
                    </div>
                    <div class="border-2 rounded-xl border-slate-800 m-2 p-2">  
                        <label for=name>Název</label>
                        <br>
                        <input type=text id=name name=name class="w-full bg-gray-100 rounded-md m-1 border-2 border-blue-200" bind:value={searchName}>
                    </div>
                </form>
            </div>
        </div>
    </div>

</div>

