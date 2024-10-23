<!-- Module detail page - src/routes/module/[moduleId]/+page.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';


    export let data; // data loaded by load from page.ts
    const moduleId: number = data.props.moduleId;
    let module_data = [];



    onMount(() => {
        // TODO: fetching data after page render
    })


</script>
<h1>Module detail - route: "/modules/{moduleId}"</h1>