<!-------------------------------------------------------------- 
Filename: FE/src/lib/components/teacher/TeachersFilters.svelte
Author: Vojtěch Růžička
Login: xruzic56
Last Modified: [09-12-2024]
Description: Option to filter lections on teachers personal page.
---------------------------------------------------------------->

<script lang="ts">
    
</script>

<!-- TODO po zapsání znaku akce: spustit filtrování -->


<div class="border-2 rounded-xl border-slate-800 p-2">
    <h2 class="flex mx-auto font-bold text-xl justify-center mb-4">Filtry</h2>
    <form class="flex flex-col text-xl">
        <div class="border-2 rounded-xl border-slate-800 m-2 p-2">  
            <label for=code>Kód lekce</label>
            <br>
            <input type=text id=code name=code class="bg-gray-100 rounded-md m-1 border-2 border-blue-200">
        </div>
        <br>
        <div class="border-2 rounded-xl border-slate-800 m-2 p-2">  
            <label for=topic>Téma</label>
            <br>
            <input type=text id=topic name=topic class="bg-gray-100 rounded-md m-1 border-2 border-blue-200">
        </div>
        <div class="border-2 rounded-xl border-slate-800 m-2 p-2">  
            <p>Obsahuje</p>
            <input type="checkbox" id=reading name=reading checked>
            <label for=reading class="hover:underline">Čtení</label>
            <br>
            <input type="checkbox" id=flashcards name=flashcards checked>
            <label for=flashcards class="hover:underline">Karty</label>
            <br>
            <input type="checkbox" id=quiz name=quiz checked>
            <label for=quiz class="hover:underline">Kvízy</label>
        </div>
        <div class="border-2 rounded-xl border-slate-800 m-2 p-2">  
            <label for=etc>. . .</label>
            <br>
            <input type=text id=etc name=etc class="bg-gray-100 rounded-md m-1 border-2 border-blue-200">
        </div>
    </form>
</div>