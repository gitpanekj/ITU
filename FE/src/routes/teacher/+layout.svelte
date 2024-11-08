<!-- Modules administration - src/routes/teacher/+page.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { loadUserContext } from "$lib/userContenxt/userContext";

    let userId: number | null = null;

    onMount(() => {
        userId = loadUserContext();
        if (!userId){ // user not logged in
            goto('/login');
        }
    })
</script>

{#if userId}
    <slot></slot>
{:else}
    <p>Redirecting...</p>
{/if}