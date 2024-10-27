<!-- Module detail page - src/routes/module/[moduleId]/+page.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import type { Link } from '$lib/utils/dataTypes.js';
    import Navbar from '$lib/components/Navbar.svelte';

    // props
    export let data; // data loaded by load from page.ts
    const moduleId: number = data.props.moduleId;
    let module_data = [];

    // Navbar links
    let links: Array<Link> = [["Hlavní stránka", "/", () => {}]];
    let title: string = `Module wit id`;



    onMount(() => {
        // TODO: fetching data after page render
    })


</script>

<Navbar {title} {links}/>
<div class="w-11/12 mx-auto flex flex-col text-center justify-center font-bold text-4xl">
    Details of one module - moduleId: {moduleId}
</div>