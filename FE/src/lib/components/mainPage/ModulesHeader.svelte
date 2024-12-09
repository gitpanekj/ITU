<!-------------------------------------------------------------- 
Filename: FE/src/lib/components/mainPage/ModulesHeader.svelte
Author: Vojtěch Růžička
Login: xruzic56
Last Modified: [09-12-2024]
Description: Header with title and author for lection page.
---------------------------------------------------------------->

<script lang="ts">
    export let module_data: {id: number, name: string, description: string, teacherId: number};
    export let teacher_name: string;

</script>

<div class="w-11/12 mx-auto flex flex-col text-center justify-center font-bold text-4xl">
    {module_data.name}
</div>
<br>
<div class="w-11/12 mx-auto flex flex-col text-center justify-center italic text-xl">
    Autor: {teacher_name}
</div>