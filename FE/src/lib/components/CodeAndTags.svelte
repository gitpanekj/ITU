<!-------------------------------------------------------------- 
Filename: FE/src/lib/components/CodeAndTags.svelte
Author: Vojtěch Růžička
Login: xruzic56
Last Modified: [09-12-2024]
Description: Unique code and informative statistics about lectures.
---------------------------------------------------------------->

<script lang="ts">
    export let exercises_counts: {flashcards: number, quizes: number, readings: number, all: number};
    export let moduleId: number;
</script>

<div class="basis-1/4 m-10">
    <p class="text-3xl font-bold py-8 px-2">
        Kód #{moduleId}<br>
    </p>
    <p class="text-xl py-8 px-2">
        Celkem cvičení: {exercises_counts.all}<br>
        Flashcards: {exercises_counts.flashcards}<br>
        Kvízů: {exercises_counts.quizes}<br>
        Čtení: {exercises_counts.readings}<br>
    </p>
</div>
