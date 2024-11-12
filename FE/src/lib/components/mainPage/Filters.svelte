<script lang="ts">
    
</script>

<!-- TODO po zapsání znaku akce: spustit filtrování -->

<div class="border-2 rounded-xl border-slate-800 p-2">
    <h2 class="flex mx-auto font-bold text-xl m-2 justify-center">Filtry</h2>
    <form class="flex flex-col text-xl">
        <div class="border-2 rounded-xl border-slate-800 m-2 p-2">  
            <label for=code>Kód lekce</label>
            <br>
            <input type=text id=code name=code class="bg-gray-100 rounded-md m-1 border-2 border-blue-200">
        </div>
        <br>
        <div class="border-2 rounded-xl border-slate-800 m-2 p-2">  
            <label for=author>Autor</label>
            <br>
            <input type=text id=author name=author class="bg-gray-100 rounded-md m-1 border-2 border-blue-200">
        </div>
        <div class="border-2 rounded-xl border-slate-800 m-2 p-2">  
            <label for=topic>Téma</label>
            <br>
            <input type=text id=topic name=topic class="bg-gray-100 rounded-md m-1 border-2 border-blue-200">
        </div>
        <div class="border-2 rounded-xl border-slate-800 m-2 p-2">  
            <label for=school>Škola</label>
            <br>
            <select id=school name=school class="bg-gray-100 rounded-md m-1 border-2 border-blue-200">
                <option value="DEMO0"></option>
                <option value="DEMO1">DEMO1</option>
                <option value="DEMO2">DEMO2</option>
                <option value="DEMO3">DEMO3</option>
            </select>
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
    </form>
</div>