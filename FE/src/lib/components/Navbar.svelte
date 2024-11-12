<script lang="ts">
  import { loadUserContext } from "$lib/userContenxt/userContext";
  import type { Link } from "$lib/utils/dataTypes";
  import { redirect } from "@sveltejs/kit";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  


    export let links: Array<Link> = [];
    export let title: String = "MyTitleHtml";
    export let saveCallback: Function = () => {};

    let loggedIn: boolean = false;
    let loading: boolean = true;
    onMount(() => {
        loggedIn = loadUserContext() !== null;
        loading = false;
    });
</script>


<nav class="bg-header h-16 flex flex-row items-centerp-4 items-center justify-between p-4">

    <div>
    {#each links as [name, href, callback]}
        <button on:click={() => {saveCallback(); callback(); goto(href)}} class="text-white font-bold text-2xl flex flex-row gap-2 justify-center items-center group">
            <div class="rounded-full border-white border-4 h-10 w-10 flex justify-center items-center text-2xl group-hover:bg-white group-hover:text-black duration-300">&lt;</div>
            <div class="text-white group-hover:underline">{name}</div>
        </button>
    {/each}
    </div>

    <div class="text-white font-bold text-center text-2xl">
        {@html title}
    </div>

    <div class="flex flex-row gap-4">
    {#if !loading}
        {#if loggedIn}
            <button class="text-white hover:text-gray-300" on:click={() => {saveCallback(); goto("/teacher/module")}}>
                Moje lekce
            </button>
            <button class="text-white hover:text-gray-300" on:click={() => {saveCallback(); localStorage.removeItem('userId'); loggedIn = false; goto("/")}}>
                Odhlásit se
            </button>
            <div class="border-l-2 border-white ml-2 h-6"></div>
        {:else}
         <button class="text-white hover:text-gray-300" on:click={() => {saveCallback(); goto("/login")}}>
            Přihlásit se
        </button>
        {/if}
    {/if}
    </div>

</nav>
