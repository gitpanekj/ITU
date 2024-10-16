<!-- src/routes/login/+page.svelte -->
<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

    export let users: {id: number, username: string}[] = [];

    onMount(async () => {
        let response = await fetch('http://localhost:3000/teacher');
        let data = await response.json();
        users = data.data;
    })

</script>


<div style="display: flex; flex-direction: column; gap: 10px">
    {#each users as user (user.id)}
        <div style="height: 20px; border: solid 2px; padding: 5px; display: flex; gap: 10px">
            {user.username}
            <button on:click={() => {
                        localStorage.setItem('userId', String(user.id));
                        goto('/teacher/module');
                    }
                    }>
                Login
            </button>
        </div>
    {/each}
</div>