<script lang="ts">
    export let module_data: {id: number, name: string, description: string, teacherId: number};
    export let teacher_name: string;
    export let moduleId: number;

    
    // uprava nazvu lekce
    // TODO optimalnejsi obnoveni (je asi zbytecne obnovovat celou stranku)
    async function editName() {
        let element: any = document.getElementsByName("name")[0];
        if(element != null) {
            let requestOptions = {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    name: element.value
                })
            };
            await fetch(`http://localhost:3000/exercise-group/${moduleId}`, requestOptions);
            console.log("Changing title of module with ID [" + moduleId +"].");
            let response = await fetch(`http://localhost:3000/exercise-group/${moduleId}`); 
            module_data = await response.json();
            //location.reload(); // obnoveni stranky, tj. i popisu
        }
    }

</script>

<div class="w-11/12 mx-auto flex flex-col text-center justify-center">
    <details>
        <summary title="Upravit název" class="font-bold text-4xl cursor-pointer list-none hover:underline">{module_data.name}&nbsp;&nbsp;<b>|</b> ✏</summary>
        <br>
        <input type="text" name="name" class="bg-gray-100 px-2 rounded-md m-1 border-2 border-blue-200" value={module_data.name}>
        <button class="rounded-xl border-2 px-2 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200"
                on:click={() => {editName()}}>
            Změnit název
        </button>
        <hr class="border-blue-950 m-4">
    </details>
</div>
<br>
<div class="w-11/12 mx-auto flex flex-col text-center justify-center italic text-xl">
  {teacher_name}
</div>