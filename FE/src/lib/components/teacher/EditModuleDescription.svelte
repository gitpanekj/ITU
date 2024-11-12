<script lang="ts">
    export let module_data: {id: number, name: string, description: string, teacherId: number};
    export let moduleId: number;

    // uprava popisu lekce
    // TODO optimalnejsi obnoveni (je asi zbytecne obnovovat celou stranku)
    async function editDescription() {
        let element: any = document.getElementsByName("description")[0];
        if(element != null) {
            let requestOptions = {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    description: element.value
                })
            };
            await fetch(`http://localhost:3000/exercise-group/${moduleId}`, requestOptions);
            console.log("Changing description of module with ID [" + moduleId +"].");
            //location.reload(); // obnoveni stranky, tj. i popisu
            let response = await fetch(`http://localhost:3000/exercise-group/${moduleId}`); 
            module_data = await response.json();
        }
    }

</script>

<div class="ml-10 mb-10">
    <details>
        <summary title="Upravit popis" class="text-xl cursor-pointer list-none hover:underline">{module_data.description}&nbsp;&nbsp;<b>|</b> ✏</summary>
        <br>
        <textarea name="description" class="w-full bg-gray-100 px-2 rounded-md m-1 border-2 border-blue-200" value={module_data.description}></textarea>
        <button class="mx-auto flex flex-col text-center justify-center rounded-xl border-2 px-2 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200"
                on:click={() => {editDescription()}}>
            Změnit popis
        </button>
        <hr class="border-blue-950 m-4">
    </details>
</div>
