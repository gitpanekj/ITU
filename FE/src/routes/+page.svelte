<!-- Main page - listed modules - src/routes/+page.svelte -->
 <script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import type { Link } from "$lib/utils/dataTypes.ts";
    import { onMount } from "svelte"; 
    import Filters from "$lib/components/Filters.svelte";
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
        const response = await fetch('http://localhost:3000/exercise-group'); // TODO stahovat jen potrebne -- strankovani v API -- po scrollu vzdy natahnout dlasi
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
    <!-- TODO styly pro zobrazeni hezci mrizky (ne obrovske polozky) -->
    <div class="basis-2/3 grid gap-8 grid-cols-2 m-10">

        {#each modules as mod (mod.id)}
            <a href="/module/{mod.id}" class="border-2 rounded-xl border-slate-800 p-2">
                <h2 class="font-bold">{mod.name}</h2>
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
    <!-- TODO filtry přesunout do jejich komponenty -->
    <!-- TODO po zapsání znaku akce: spustit filtrování -->
    <div class="basis-1/3 m-10">

        <div class="border-2 rounded-xl border-slate-800 p-2 fixed">
            <h2 class="font-bold text-xl m-2 justify-center">Filtry</h2>
            <form class="flex flex-col text-xl">
                <div class="border-2 rounded-xl border-slate-800 m-2 p-2">  
                    <label for=code>Kód lekce</label>
                    <br>
                    <input type=text id=code name=code class="bg-gray-100 rounded-md m-1">
                </div>
                <br>
                <div class="border-2 rounded-xl border-slate-800 m-2 p-2">  
                    <label for=topic>Téma</label>
                    <br>
                    <input type=text id=topic name=topic class="bg-gray-100 rounded-md m-1">
                </div>
                <div class="border-2 rounded-xl border-slate-800 m-2 p-2">  
                    <label for=school>Škola</label>
                    <br>
                    <input type=text id=school name=school class="bg-gray-100 rounded-md m-1">
                </div>
            </form>
        </div>

    </div>

</div>

