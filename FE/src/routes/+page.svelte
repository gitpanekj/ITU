<!-- Main page - listed modules - src/routes/+page.svelte -->
 <script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import type { Link } from "$lib/utils/dataTypes";
    import { onMount } from "svelte"; 

    // Navbar
    let title: string = `
        <div class="flex flex-col items-start">
            <h1>Learning Tools</h1>
            <h3>All in one</h3>
        </div>
    `;


    onMount(() => {
        // TODO: fetching data which can be fetched after the page render
    });

    
 </script>


 
<!-- Header -->
<Navbar {title}/>
<div class="w-11/12 mx-auto flex flex-col text-center justify-center font-bold text-4xl">
    Main page with all the modules
</div>


