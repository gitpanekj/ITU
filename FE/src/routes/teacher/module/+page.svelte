<!-------------------------------------------------------------- 
Filename: FE/src/routes/teacher/module/+page.svelte
Author: Vojtěch Růžička
Login: xruzic56
Last Modified: [09-12-2024]
Description: Teachers personal page with of all their lectures.
---------------------------------------------------------------->

<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import type { Link } from "$lib/utils/dataTypes";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { loadUserContext } from "$lib/userContenxt/userContext";

    let userId: number | null = null;

    let newModuleName: string;
    let newModuleDescription: string;

    let filteredId: number | null = null;
    let searchName: string = "";

    // Navbar
    let links: Array<Link> = [["Hlavní stránka", "/", () => {}]];
    let title: string = `Moje lekce`;


    export let modules: {id: number, name: string, description: string, teacherId: number}[] = [];
    let teacher_name: string = "";

    const getModules = async () => {
        const response = await fetch(`http://localhost:3000/exercise-group?teacherId=${userId}`); // TODO stránkování ?
        const data = await response.json();
        modules = data.data;
    }

    const getTeacherName = async () => {
        const response = await fetch(`http://localhost:3000/teacher/${userId}`);
        const data = await response.json();
        teacher_name = data.username;
    }

    function editModule(moduleId: number) {
        goto(`/teacher/module/${moduleId}`);
    } 

    //  mazani lekce
    async function deleteModule(moduleId: number) {  
        let reallyDelete = confirm("Opravdu smazat lekci i všechna její cvičení?\nTuto akci nelze vrátit zpět!");
        if(reallyDelete) {
            await fetch(`http://localhost:3000/exercise-group/${moduleId}`,{method: 'DELETE'});
            console.log("Deleting module with ID [" + moduleId + "].");
            await getModules();
        }   
    } 

    // tvorba nove lekce
    async function createModule(title: string, description: string) {

        if(!title) title = "Nová lekce";

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                name: title,
                description: description,
                teacherId: userId 
            })
        };

        await fetch(`http://localhost:3000/exercise-group`, requestOptions);
        
        console.log("Creating new module.");

        await getModules();
    }


    onMount( async () => {
        userId = loadUserContext();
        if (!userId){ // user not logged in
            goto('/login');
        }
        await getModules();
        await getTeacherName();
    })


    let resultModules: {id: number, name: string, description: string, teacherId: number}[] = [];

    $: if(filteredId) {
        // filtrace dle ID
        getModulesById();
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


<Navbar {title} {links}/>
<div class="w-11/12 mx-auto flex flex-col text-center justify-center italic text-xl">
    {teacher_name}
</div>

<!-- Obsah stranky -->
<div class="flex mt-10">
       
    <!-- Viditelne moduly --> 
    <div class="basis-2/3 grid gap-8 grid-cols-2 m-10">
        
        <!-- Tvorba noveho modulu -->
        <div class="grid grid-cols-subgrid gap-8 col-span-2 border-4 p-4 mx-48 rounded-xl border-slate-800">
            <div>
                <h2 class="font-bold">
                    <textarea class="w-full bg-gray-100 rounded-md m-1 border-2 border-blue-200" placeholder="Název nové lekce..." bind:value={newModuleName}></textarea>
                </h2> 
                <button class="w-full rounded-xl border-2 my-4 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200"
                        on:click={() => {createModule(newModuleName,newModuleDescription)}}>
                    Vytvořit novou lekci
                </button>   
            </div>
            <textarea class="w-full bg-gray-100 rounded-md m-1 border-2 border-blue-200" placeholder="Výstižný popis nové lekce..." bind:value={newModuleDescription}></textarea>
        </div>

        <!-- Jiz vytvorene moduly -->
        {#each modules as mod (mod.id)}
            <div class="border-2 rounded-xl border-slate-800 p-4">
                <h2 class="font-bold">{mod.name}</h2>     
                <br>
                <button class="rounded-xl border-2 ml-4 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200"
                        on:click={() => {editModule(mod.id)}}>
                    Upravit
                </button>
                <button class="rounded-xl border-2 ml-4 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200"
                        on:click={() => {deleteModule(mod.id)}}>
                    Smazat
                </button>
            </div>
        {/each}
    </div>


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
                        <label for=name>Název</label>
                        <br>
                        <input type=text id=name name=name class="w-full bg-gray-100 rounded-md m-1 border-2 border-blue-200" bind:value={searchName}>
                    </div>
                </form>
            </div>
        </div>
    </div>

</div>