<!-- All the teacher's modules -->
<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import type { Link } from "$lib/utils/dataTypes";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { loadUserContext } from "$lib/userContenxt/userContext";
    import TeachersFilters from "$lib/components/teacher/TeachersFilters.svelte";


    let userId: number | null = null;

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

    // TODO
    function hideModule(moduleId: number) {
        console.log("Hiding module with ID [" + moduleId + "].");
    } 

    // TODO
    function revealModule(moduleId: number) {
        console.log("Revealing module with ID [" + moduleId + "].");
    } 

    function editModule(moduleId: number) {
        goto(`/teacher/module/${moduleId}`);
    } 

    // TODO mazani lekce
    // TODO optimalnejsi obnoveni (je asi zbytecne obnovovat celou stranku)
    // TODO hezci varovne okno ?
    async function deleteModule(moduleId: number) {  
        let reallyDelete = confirm("Opravdu smazat lekci i všechna její cvičení?\nTuto akci nelze vrátit zpět!");
        if(reallyDelete) {
            await fetch(`http://localhost:3000/exercise-group/${moduleId}`,{method: 'DELETE'});
            console.log("Deleting module with ID [" + moduleId + "].");
            await getModules();
            //location.reload(); // obnoveni stranky, tj. i seznamu
        }   
    } 

    // TODO tvorba nove lekce
    // TODO optimalnejsi obnoveni (je asi zbytecne obnovovat celou stranku)
    async function createModule() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                name: "Nová lekce",
                description: "Výchozí popis lekce.",
                teacherId: userId 
            })
        };

        await fetch(`http://localhost:3000/exercise-group`, requestOptions);
        
        console.log("Creating new module.");

        await getModules();
        //location.reload(); // obnoveni stranky, tj. i seznamu
    }


    onMount( async () => {
        userId = loadUserContext();
        if (!userId){ // user not logged in
            goto('/login');
        }
        await getModules();
        await getTeacherName();
    })

</script>


<Navbar {title} {links}/>
<div class="w-11/12 mx-auto flex flex-col text-center justify-center italic text-xl">
    {teacher_name}
</div>

<!-- Obsah stranky -->
<!-- TODO dva sloupce, dragNdrop? mozna v prvni verzi jen tlacitka < a >, uprava viditelnosti (nutna BE podpora) -->
<!-- TODO styly pro zobrazeni rozumne a jednotne sirky -->
<!-- TODO filtry -->
<!-- TODO funkční tlačítka -->
<div class="flex mt-10">
       
    <!-- Skryte moduly --> 
    <!-- <div class="basis-1/3 grid gap-8 grid-cols-1 m-10">
        <h2>Skryté lekce</h2>
        <div class="border-2 rounded-xl border-slate-800 p-4">
            <h2 class="font-bold">SKRYTÝ MODUL #1 (UKÁZKA)</h2>   
            <br>  
            <button class="rounded-xl border-2 ml-4 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200">
                Upravit
            </button>
            <button class="rounded-xl border-2 ml-4 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200">
                Smazat
            </button>
            <button class="rounded-xl border-2 ml-4 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200">
                Zveřejnit →
            </button>
        </div>
        <div class="border-2 rounded-xl border-slate-800 p-4">
            <h2 class="font-bold">SKRYTÝ MODUL #2 (UKÁZKA)</h2>   
            <br>  
            <button class="rounded-xl border-2 ml-4 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200">
                Upravit
            </button>
            <button class="rounded-xl border-2 ml-4 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200">
                Smazat
            </button>
            <button class="rounded-xl border-2 ml-4 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200">
                Zveřejnit →
            </button>
        </div>
        <div class="border-2 rounded-xl border-slate-800 p-4">
            <h2 class="font-bold">SKRYTÝ MODUL #3 (UKÁZKA)</h2>   
            <br>  
            <button class="rounded-xl border-2 ml-4 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200">
                Upravit
            </button>
            <button class="rounded-xl border-2 ml-4 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200">
                Smazat
            </button>
            <button class="rounded-xl border-2 ml-4 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200">
                Zveřejnit →
            </button>
        </div>
    </div> -->

    <!-- TEMPORARY START -->
    <div class="basis-1/4"></div>
    <!-- TEMPORARY END -->

    <!-- Viditelne moduly --> 
    <div class="basis-1/3 grid gap-8 grid-cols-1 m-10">
        <!-- <h2>Veřejné lekce</h2> -->
        {#each modules as mod (mod.id)}
            <div class="border-2 rounded-xl border-slate-800 p-4">
                <h2 class="font-bold">{mod.name}</h2>     
                <br>
                <!-- TEMPORARY COMMENTED <button class="rounded-xl border-2 ml-4 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200"
                        on:click={() => {hideModule(mod.id)}}>
                    ← Skrýt
                </button> -->
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



    <div class="basis-1/3 m-10">
    <div class="fixed">

        <!-- Vytvorit lekci -->
        <div class="flex mx-auto justify-center mb-16">
            <button class="rounded-xl text-xl font-bold border-2 py-3 px-6 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200"
                    on:click={() => {createModule()}}>
                Vytvořit novou lekci
            </button>
        </div>

        <!-- Filtry --> 
        <TeachersFilters  />

    </div>
    </div>

</div>