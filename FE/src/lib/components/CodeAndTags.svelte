<script lang="ts">
    export let exercises_counts: {flashcards: number, quizes: number, readings: number, all: number};
</script>

<!-- TODO kod -->
<!-- TODO dalsi tagy (?) --> 
<!-- TODO obnovovani pocitadla --> 
<div class="basis-1/4 m-10">
    <!-- zde pripadne bude obrazek, pokud budeme implementovat -->
    <p class="text-3xl font-bold py-8 px-2">
        #123456<br>
    </p>
    <p class="text-xl py-8 px-2">
        Celkem cvičení: {exercises_counts.all}<br>
        Flashcards: {exercises_counts.flashcards}<br>
        Kvízů: {exercises_counts.quizes}<br>
        Čtení: {exercises_counts.readings}<br>
    </p>
</div>
