<!-------------------------------------------------------------- 
Filename: FE/src/lib/components/teacher/MyModulesHeader.svelte
Author: Vojtěch Růžička
Login: xruzic56
Last Modified: [09-12-2024]
Description: Header for lection page from teachers view.
---------------------------------------------------------------->

<script lang="ts">
    export let module_data: {id: number, name: string, description: string, teacherId: number};
    export let teacher_name: string;
    export let moduleId: number;

    let newName: string;

    // uprava nazvu lekce
    // TODO optimalnejsi obnoveni (je asi zbytecne obnovovat celou stranku)
    async function editName(newName: string) {

        if(!newName) {
            await fetch(`http://localhost:3000/exercise-group/${moduleId}`);
            return;
        }

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
        <textarea name="name" class="w-1/3 bg-gray-100 px-2 rounded-md m-1 border-2 border-blue-200" placeholder="Název cvičení" value={module_data.name} on:blur={() => {editName(newName)}}></textarea>
        <br>
        <i class="text-sm m-4">(Název změníte zapsáním nového. Není třeba nic potvrzovat.)</i>
        <hr class="border-blue-950 m-4">
    </details>
</div>
<br>
<div class="w-11/12 mx-auto flex flex-col text-center justify-center italic text-xl">
  {teacher_name}
</div>