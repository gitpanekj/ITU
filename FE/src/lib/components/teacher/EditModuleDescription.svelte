<!-------------------------------------------------------------- 
Filename: FE/src/lib/components/teacher/EditModuleDescription.svelte
Author: Vojtěch Růžička
Login: xruzic56
Last Modified: [09-12-2024]
Description: Lection descritpion editation.
---------------------------------------------------------------->

<script lang="ts">
    export let module_data: {id: number, name: string, description: string, teacherId: number};
    export let moduleId: number;

    let newDescription: string;

    // uprava popisu lekce
    async function editDescription(newDescription: string) {

        if(!newDescription) {
            await fetch(`http://localhost:3000/exercise-group/${moduleId}`);
            return;
        } 

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
            let response = await fetch(`http://localhost:3000/exercise-group/${moduleId}`); 
            module_data = await response.json();
        }
    }

</script>

<div class="ml-10 mb-10">
    <details>
        <summary title="Upravit popis" class="text-xl cursor-pointer list-none hover:underline">{module_data.description}&nbsp;&nbsp;<b>|</b> ✏</summary>
        <br>
        <textarea name="description" class="w-full bg-gray-100 px-2 rounded-md m-1 border-2 border-blue-200" placeholder="Popis cvičení" value={module_data.description} on:blur={() => {editDescription(newDescription)}}></textarea>
        <i class="text-sm m-4">(Popis změníte zapsáním nového. Není třeba nic potvrzovat.)</i>
        <hr class="border-blue-950 m-4">
    </details>
</div>
