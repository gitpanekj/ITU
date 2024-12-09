<!-------------------------------------------------------------- 
Filename: FE/src/lib/components/mainPage/ModuleDescription.svelte
Author: Vojtěch Růžička
Login: xruzic56
Last Modified: [09-12-2024]
Description: Description of one lecture.
---------------------------------------------------------------->

<script lang="ts">
    export let module_data: {id: number, name: string, description: string, teacherId: number};

</script>

<div class="ml-10 mb-10">
    <p class="text-xl">{module_data.description}</p>
</div>
