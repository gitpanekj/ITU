<!-------------------------------------------------------------- 
Filename: FE/src/routes/+page.svelte
Author: Vojtěch Růžička
Login: xruzic56
Last Modified: [09-12-2024]
Description: Main page with all lectures listed.
---------------------------------------------------------------->

 <script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import type { Link } from "$lib/utils/dataTypes.ts";
    import { onMount } from "svelte"; 
    import Filters from "$lib/components/mainPage/Filters.svelte";
    import { goto } from '$app/navigation';

    // Navbar
    let title: string = `
        <div class="flex flex-col items-start">
            <h1>Procvič.to</h1>
            <h2>...vše v jednom.</h2>
        </div>
    `;


    
    export let modules: {id: number, name: string, description: string, teacherId: number}[] = [];

    const getModules = async () => {
        const response = await fetch('http://localhost:3000/exercise-group');
        const data = await response.json();
        modules = data.data;
    }

    async function getTeacherName(id: number) {
        const response = await fetch(`http://localhost:3000/teacher/${id}`);
        const data = await response.json();
        return data.username;
    }

    onMount( async () => {
        await getModules();
    });


 </script>


 
<!-- Hlavicka -->
<Navbar {title}/>

<!-- Obsah stranky -->
<div class="flex mt-10">

    <!-- Moduly -->
    <div class="basis-2/3 grid gap-8 grid-cols-2 m-10">

        {#each modules as mod (mod.id)}
            <a href="/module/{mod.id}" class="border-2 rounded-xl border-slate-800 p-4 hover:bg-gray-100">
                <h2 class="font-bold">{mod.name}</h2>
                <br>
                <span class="italic">
                    Vytvořil: 
                    {#await getTeacherName(mod.teacherId)}
                        ...
                    {:then value}
                        {value}
                    {:catch error}
                        ?
                    {/await}
                </span>
            </a> 
        {/each}

    </div>
    
    <!-- Filtry --> 
    <div class="basis-1/3 m-10">
        <div class="fixed">
            <Filters />
        </div>
    </div>

</div>

