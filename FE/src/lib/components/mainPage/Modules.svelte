<!-------------------------------------------------------------- 
Filename: FE/src/lib/components/mainPage/Modules.svelte
Author: Vojtěch Růžička
Login: xruzic56
Last Modified: [10-12-2024]
Description: List of lectures.
---------------------------------------------------------------->

<script lang="ts">
    export let resultModules;

    async function getTeacherName(id: number) {
        const response = await fetch(`http://localhost:3000/teacher/${id}`);
        const data = await response.json();
        return data.username;
    }

</script>

{#if resultModules.length === 0}
    <div class="basis-2/3 grid gap-8 grid-cols-1 m-10">
        <br>
        Zadaným filtrům neodpovídá žádný výsledek...
        <br>
    </div>
{:else}
    <div class="basis-2/3 grid gap-8 grid-cols-2 m-10">

        {#each resultModules as mod (mod.id)}
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
{/if}
