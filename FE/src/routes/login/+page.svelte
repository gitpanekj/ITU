<!-- src/routes/login/+page.svelte -->
<script lang="ts">
  import { goto } from '$app/navigation';
  import { setUserContext } from '$lib/userContenxt/userContext';
  import type { Link } from '$lib/utils/dataTypes';
  import { onMount } from 'svelte';
  import LoginNavbar from "$lib/components/mainPage/LoginNavbar.svelte";

    // fetch data
    export let users: {id: number, username: string}[] = [];
    onMount(async () => {
        let response = await fetch('http://localhost:3000/teacher');
        let data = await response.json();
        users = data.data;
    })

    // Navbar
    let links: Array<Link> = [["Na hlavní stránku", `/`, () => {}]];
    let register: Boolean = false;

</script>

<!-- Hlavicka -->
<LoginNavbar {links} {register}/>
<br>
<div class="w-11/12 mx-auto flex flex-col text-center justify-center font-bold text-4xl">
    Přihlášení &ndash; vstup pro učitele.
</div>
<br>
<div class="w-11/12 mx-auto flex flex-col text-center justify-center italic text-xl">
    Přihlaste se a začněte tvořit...
</div>

<div class="flex h-full justify-center">
    <!-- puvodne jeste h-5/6 w-3/12 border-black border-2 rounded-2xl  -->
    <div class="pt-10 px-4 flex flex-col gap-2">
        <p class="text-xl font-bold">Ukázkové přihlášení:</p>
        {#each users as user (user.id)}
            <div class="flex flex-row w-full h-16 p-4 border-2 justify-between items-center rounded-xl border-slate-800">
                <h1 class="text-xl text-center">{user.username}</h1>
                <button 
                    on:click={() => {setUserContext(user.id); goto("/teacher/module");}}
                    class="rounded-xl border-2 ml-4 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200">
                    Přihlásit
                </button>
            </div>
        {/each}
    </div>
</div>

<!-- TODO realne prihlaseni (pokud potreba) -->

