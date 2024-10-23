<!-- All the teacher's modules -->
<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import type { Link } from "$lib/utils/dataTypes";
    import { onMount } from "svelte";

    let userId: number | null = null;

    // Navbar
    let links: Array<Link> = [["Hlavní stránka", "/", () => {}]];
    let title: string = `Teacher modules`;

    onMount(() => {
        // TODO: Fetch data which are not required before the page render
    })
</script>


<Navbar {title} {links}/>
<div class="h-full w-11/12 mx-auto flex flex-col text-center justify-center font-bold text-4xl">
    All the teachers modules
</div>