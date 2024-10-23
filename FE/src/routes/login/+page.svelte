<!-- src/routes/login/+page.svelte -->
<script lang="ts">
  import { goto } from '$app/navigation';
  import { setUserContext } from '$lib/userContenxt/userContext';
  import type { Link } from '$lib/utils/dataTypes';
  import { onMount } from 'svelte';

    // fetch data
    export let users: {id: number, username: string}[] = [];
    onMount(async () => {
        let response = await fetch('http://localhost:3000/teacher');
        let data = await response.json();
        users = data.data;
    })

</script>

<a href="/" class="items-start p-4  m-4 border-4 w-fit rounded-2xl border-gray-500 bg-gray-300 font-bold text-xl">Hlavní stránka</a>
<div class="flex h-full justify-center items-center">
    <div class="h-4/6 w-3/12 border-black border-4 rounded-2xl pt-8 px-4 flex flex-col gap-2">
        {#each users as user (user.id)}
            <div class="flex flex-row w-full h-16 p-4 border-4 justify-between items-center rounded-xl border-slate-800">
                <h1 class="text-2xl font-bold text-center">{user.username}</h1>
                <button 
                    on:click={() => {setUserContext(user.id); goto("/teacher/module");}}
                    class="rounded-xl border-2 py-2 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200">
                    Login
                </button>
            </div>
        {/each}
    </div>
</div>